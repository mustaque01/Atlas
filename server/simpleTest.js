const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

// Import basic models that exist
const User = require('./models/User');
const Otp = require('./models/Otp');

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

// Simple test data for 10 users
const testUsers = [
    { firstName: 'Rahul', lastName: 'Sharma', email: 'rahul.sharma@gmail.com', phoneNumber: '9876543210' },
    { firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@gmail.com', phoneNumber: '9876543211' },
    { firstName: 'Amit', lastName: 'Kumar', email: 'amit.kumar@gmail.com', phoneNumber: '9876543212' },
    { firstName: 'Sneha', lastName: 'Reddy', email: 'sneha.reddy@gmail.com', phoneNumber: '9876543213' },
    { firstName: 'Vikash', lastName: 'Singh', email: 'vikash.singh@gmail.com', phoneNumber: '9876543214' },
    { firstName: 'Anita', lastName: 'Gupta', email: 'anita.gupta@gmail.com', phoneNumber: '9876543215' },
    { firstName: 'Rajesh', lastName: 'Mehta', email: 'rajesh.mehta@gmail.com', phoneNumber: '9876543216' },
    { firstName: 'Kavita', lastName: 'Joshi', email: 'kavita.joshi@gmail.com', phoneNumber: '9876543217' },
    { firstName: 'Deepak', lastName: 'Agarwal', email: 'deepak.agarwal@gmail.com', phoneNumber: '9876543218' },
    { firstName: 'Sunita', lastName: 'Yadav', email: 'sunita.yadav@gmail.com', phoneNumber: '9876543219' }
];

// Function to create test users
const createTestUsers = async () => {
    try {
        console.log('🔄 Creating 10 test users...');
        
        // Clear existing test users
        await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
        await Otp.deleteMany({});
        
        const createdUsers = [];
        
        for (let i = 0; i < testUsers.length; i++) {
            const userData = testUsers[i];
            
            console.log(`Creating user ${i + 1}: ${userData.firstName} ${userData.lastName}`);
            
            // Hash password
            const hashedPassword = await bcryptjs.hash('password123', 10);
            
            // Create user
            const user = new User({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                password: hashedPassword,
                isPhoneVerified: i < 5, // First 5 users verified
                role: 'user'
            });
            
            const savedUser = await user.save();
            createdUsers.push(savedUser);
            
            // Create OTP record for unverified users
            if (!savedUser.isPhoneVerified) {
                const otp = new Otp({
                    phoneNumber: userData.phoneNumber,
                    otp: Math.floor(100000 + Math.random() * 900000).toString(),
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
                });
                
                await otp.save();
                console.log(`  📱 Created OTP for ${userData.phoneNumber}`);
            }
        }
        
        console.log('✅ Successfully created 10 test users!');
        
        // Test database queries
        console.log('\n📊 Database Summary:');
        const totalUsers = await User.countDocuments();
        const verifiedUsers = await User.countDocuments({ isPhoneVerified: true });
        const unverifiedUsers = await User.countDocuments({ isPhoneVerified: false });
        const totalOtps = await Otp.countDocuments();
        
        console.log(`👥 Total Users: ${totalUsers}`);
        console.log(`✅ Verified Users: ${verifiedUsers}`);
        console.log(`❌ Unverified Users: ${unverifiedUsers}`);
        console.log(`📱 Active OTPs: ${totalOtps}`);
        
        // Test some queries
        console.log('\n🔍 Testing Database Queries:');
        
        // Get all users
        const allUsers = await User.find({}, 'firstName lastName email phoneNumber isPhoneVerified').sort({ firstName: 1 });
        console.log('\n📋 All Users:');
        allUsers.forEach((user, index) => {
            const status = user.isPhoneVerified ? '✅' : '❌';
            console.log(`${index + 1}. ${user.firstName} ${user.lastName} - ${user.email} - ${user.phoneNumber} ${status}`);
        });
        
        // Get verified users only
        const verifiedUsersList = await User.find({ isPhoneVerified: true }, 'firstName lastName email');
        console.log(`\n✅ Verified Users (${verifiedUsersList.length}):`);
        verifiedUsersList.forEach((user, index) => {
            console.log(`${index + 1}. ${user.firstName} ${user.lastName} - ${user.email}`);
        });
        
        // Get OTP records
        const otpRecords = await Otp.find({}).sort({ createdAt: -1 });
        console.log(`\n📱 OTP Records (${otpRecords.length}):`);
        otpRecords.forEach((otp, index) => {
            console.log(`${index + 1}. ${otp.phoneNumber} - OTP: ${otp.otp} - Expires: ${otp.expiresAt.toLocaleString()}`);
        });
        
        // Test user authentication (simulate login)
        console.log('\n🔐 Testing Authentication:');
        const testUser = allUsers[0];
        const isPasswordValid = await bcryptjs.compare('password123', testUser.password);
        console.log(`Password verification for ${testUser.firstName}: ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);
        
        // Test phone number search
        console.log('\n🔍 Testing Phone Number Search:');
        const phoneSearchResult = await User.findOne({ phoneNumber: '9876543210' });
        if (phoneSearchResult) {
            console.log(`Found user: ${phoneSearchResult.firstName} ${phoneSearchResult.lastName}`);
        }
        
        // Test email search
        console.log('\n📧 Testing Email Search:');
        const emailSearchResult = await User.findOne({ email: 'priya.patel@gmail.com' });
        if (emailSearchResult) {
            console.log(`Found user: ${emailSearchResult.firstName} ${emailSearchResult.lastName}`);
        }
        
        console.log('\n🎉 Database testing completed successfully!');
        console.log('\n📈 Performance Metrics:');
        console.log(`⏱️ User creation time: ${Date.now() - startTime}ms`);
        console.log(`💾 Total documents created: ${totalUsers + totalOtps}`);
        
    } catch (error) {
        console.error('❌ Error during testing:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Database connection closed');
    }
};

// Record start time
const startTime = Date.now();

// Run the test
connectDB().then(() => {
    createTestUsers();
});
