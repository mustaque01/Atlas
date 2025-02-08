const bcrypt = require('bcryptjs');
const Otp = require("../models/Otp"); 
const User = require("../models/User"); 
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie')


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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
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
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });
        await newUser.save();

        // jwt
		generateTokenAndSetCookie(res, newUser._id);


        res.status(201).json({
            success:true,
             message: 'User registered successfully.',
             user:{
                ...newUser._doc,
                password:undefined,
             },
             });
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = { signup}



// Generate OTP
const generateOTP = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        const otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        // Find and update existing OTP entry or create a new one
        const otpEntry = await Otp.findOneAndUpdate(
            { phoneNumber },
            { 
                otp, 
                otpExpiresAt, 
                isPhoneVerified: false 
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        console.log(`OTP sent to ${phoneNumber}: ${otp}`); // Debugging purpose

        res.status(200).json({ message: "OTP sent successfully." });

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

        if (!otpEntry) {
            return res.status(400).json({ message: "Invalid OTP or phone number." });
        }

        // Check if OTP is expired
        if (Date.now() > otpEntry.otpExpiresAt) {
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

        // Update User model to mark phone as verified
        await User.findOneAndUpdate({ phoneNumber }, { isPhoneVerified: true });

        res.status(200).json({ message: "Phone number verified successfully." });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP. Try again later." });
    }
};



module.exports = { signup, generateOTP, verifyOTP };
