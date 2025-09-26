const bcrypt = require('bcryptjs');
const Otp = require("../models/Otp"); 
const User = require("../models/User"); 
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const smsService = require('../utils/smsService');

const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber} = req.body;

    // Validation checks
    if (!firstName || !lastName || !email || !password || !confirmPassword ||!phoneNumber) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    try {
        // Check if user already exists 
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phoneNumber }] 
        });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already registered.' });
            }
            if (existingUser.phoneNumber === phoneNumber) {
                return res.status(400).json({ message: 'Phone number already registered.' });
            }
        }

        // Check if phone number is verified
        const otpEntry = await Otp.findOne({ phoneNumber, isPhoneVerified: true });
        if (!otpEntry) {
            return res.status(400).json({ message: 'Please verify your phone number first.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user instance and save to the database
        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            isPhoneVerified: true, // Mark as verified since OTP was verified
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });
        await newUser.save();

        // Generate JWT token
		generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: {
                ...newUser._doc,
                password: undefined,
            },
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Generate OTP
const generateOTP = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required." });
        }

        // Validate phone number format (basic validation)
        if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number." });
        }

        // Check if phone number is already registered
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already registered." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        // Send OTP via SMS
        console.log(`📱 Sending OTP to ${phoneNumber}...`);
        const smsResult = await smsService.sendOTPSMS(phoneNumber, otp);
        
        if (!smsResult.success && !smsResult.simulation) {
            console.error('❌ SMS sending failed:', smsResult.error);
            return res.status(500).json({ 
                message: "Failed to send OTP. Please try again later.",
                error: smsResult.error 
            });
        }

        // Find and update existing OTP entry or create a new one
        const otpEntry = await Otp.findOneAndUpdate(
            { phoneNumber },
            { 
                otp, 
                otpExpiresAt, 
                isPhoneVerified: false,
                smsProvider: smsResult.provider,
                messageId: smsResult.messageId
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        console.log(`✅ OTP ${smsResult.simulation ? 'simulated' : 'sent'} to ${phoneNumber} via ${smsResult.provider}`);

        res.status(200).json({ 
            message: smsResult.simulation 
                ? `OTP generated successfully. (Simulation mode: ${otp})` 
                : "OTP sent to your phone number successfully.",
            provider: smsResult.provider,
            simulation: smsResult.simulation || false,
            // Remove in production:
            debug: process.env.NODE_ENV === 'development' ? { otp: otp } : undefined
        });

    } catch (error) {
        console.error("Error generating OTP:", error);
        res.status(500).json({ message: "Error generating OTP. Try again later." });
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        if (!phoneNumber || !otp) {
            return res.status(400).json({ message: "Phone number and OTP are required." });
        }

        // Find OTP record in Otp model
        const otpEntry = await Otp.findOne({ phoneNumber });

        if (!otpEntry || !otpEntry.otp) {
            return res.status(400).json({ message: "OTP not found. Please generate a new OTP." });
        }

        // Check if OTP is expired
        if (Date.now() > otpEntry.otpExpiresAt) {
            // Clear expired OTP
            otpEntry.otp = undefined;
            otpEntry.otpExpiresAt = undefined;
            await otpEntry.save();
            return res.status(400).json({ message: "OTP expired. Please request a new one." });
        }

        // Compare OTP as a string
        if (otpEntry.otp !== otp.toString()) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Mark phone number as verified in Otp collection
        otpEntry.isPhoneVerified = true;
        otpEntry.otp = undefined; // Clear OTP after successful verification
        otpEntry.otpExpiresAt = undefined;
        await otpEntry.save();

        res.status(200).json({ 
            message: "Phone number verified successfully.",
            verified: true 
        });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP. Try again later." });
    }
};

module.exports = { signup, generateOTP, verifyOTP };
