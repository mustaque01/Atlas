const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

// Import all models
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const LoanApplication = require('./models/LoanApplication');
const Document = require('./models/Document');
const Payment = require('./models/Payment');
const Notification = require('./models/Notification');
const AuditLog = require('./models/AuditLog');
const Settings = require('./models/Settings');

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

// Test data for 10 users
const testUsers = [
    {
        fullName: 'Rahul Sharma',
        email: 'rahul.sharma@gmail.com',
        phone: '9876543210',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1990-05-15'),
            gender: 'Male',
            maritalStatus: 'Single',
            employment: {
                type: 'Salaried',
                companyName: 'TCS',
                designation: 'Software Engineer',
                workExperience: 5,
                monthlyIncome: 75000,
                employmentStatus: 'Active'
            },
            address: {
                street: '123 MG Road',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560001'
            }
        }
    },
    {
        fullName: 'Priya Patel',
        email: 'priya.patel@gmail.com',
        phone: '9876543211',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1988-08-22'),
            gender: 'Female',
            maritalStatus: 'Married',
            employment: {
                type: 'Salaried',
                companyName: 'Infosys',
                designation: 'Senior Analyst',
                workExperience: 7,
                monthlyIncome: 85000,
                employmentStatus: 'Active'
            },
            address: {
                street: '456 Park Street',
                city: 'Pune',
                state: 'Maharashtra',
                pincode: '411001'
            }
        }
    },
    {
        fullName: 'Amit Kumar',
        email: 'amit.kumar@gmail.com',
        phone: '9876543212',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1992-03-10'),
            gender: 'Male',
            maritalStatus: 'Single',
            employment: {
                type: 'Self_Employed',
                businessName: 'Kumar Electronics',
                businessType: 'Retail',
                monthlyIncome: 60000,
                businessVintage: 3
            },
            address: {
                street: '789 Gandhi Nagar',
                city: 'Delhi',
                state: 'Delhi',
                pincode: '110001'
            }
        }
    },
    {
        fullName: 'Sneha Reddy',
        email: 'sneha.reddy@gmail.com',
        phone: '9876543213',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1985-12-05'),
            gender: 'Female',
            maritalStatus: 'Married',
            employment: {
                type: 'Salaried',
                companyName: 'Wipro',
                designation: 'Project Manager',
                workExperience: 10,
                monthlyIncome: 120000,
                employmentStatus: 'Active'
            },
            address: {
                street: '321 Jubilee Hills',
                city: 'Hyderabad',
                state: 'Telangana',
                pincode: '500033'
            }
        }
    },
    {
        fullName: 'Vikash Singh',
        email: 'vikash.singh@gmail.com',
        phone: '9876543214',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1991-07-18'),
            gender: 'Male',
            maritalStatus: 'Single',
            employment: {
                type: 'Salaried',
                companyName: 'HCL Technologies',
                designation: 'Software Developer',
                workExperience: 4,
                monthlyIncome: 65000,
                employmentStatus: 'Active'
            },
            address: {
                street: '654 Salt Lake',
                city: 'Kolkata',
                state: 'West Bengal',
                pincode: '700064'
            }
        }
    },
    {
        fullName: 'Anita Gupta',
        email: 'anita.gupta@gmail.com',
        phone: '9876543215',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1987-11-25'),
            gender: 'Female',
            maritalStatus: 'Married',
            employment: {
                type: 'Self_Employed',
                businessName: 'Gupta Textiles',
                businessType: 'Manufacturing',
                monthlyIncome: 95000,
                businessVintage: 8
            },
            address: {
                street: '987 Commercial Street',
                city: 'Chennai',
                state: 'Tamil Nadu',
                pincode: '600001'
            }
        }
    },
    {
        fullName: 'Rajesh Mehta',
        email: 'rajesh.mehta@gmail.com',
        phone: '9876543216',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1989-04-12'),
            gender: 'Male',
            maritalStatus: 'Married',
            employment: {
                type: 'Salaried',
                companyName: 'Accenture',
                designation: 'Senior Consultant',
                workExperience: 8,
                monthlyIncome: 110000,
                employmentStatus: 'Active'
            },
            address: {
                street: '147 Bandra West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050'
            }
        }
    },
    {
        fullName: 'Kavita Joshi',
        email: 'kavita.joshi@gmail.com',
        phone: '9876543217',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1993-09-08'),
            gender: 'Female',
            maritalStatus: 'Single',
            employment: {
                type: 'Salaried',
                companyName: 'IBM',
                designation: 'Data Analyst',
                workExperience: 3,
                monthlyIncome: 55000,
                employmentStatus: 'Active'
            },
            address: {
                street: '258 Sector 18',
                city: 'Noida',
                state: 'Uttar Pradesh',
                pincode: '201301'
            }
        }
    },
    {
        fullName: 'Deepak Agarwal',
        email: 'deepak.agarwal@gmail.com',
        phone: '9876543218',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1986-01-30'),
            gender: 'Male',
            maritalStatus: 'Married',
            employment: {
                type: 'Self_Employed',
                businessName: 'Agarwal Enterprises',
                businessType: 'Trading',
                monthlyIncome: 80000,
                businessVintage: 6
            },
            address: {
                street: '369 Malviya Nagar',
                city: 'Jaipur',
                state: 'Rajasthan',
                pincode: '302017'
            }
        }
    },
    {
        fullName: 'Sunita Yadav',
        email: 'sunita.yadav@gmail.com',
        phone: '9876543219',
        password: 'password123',
        profile: {
            dateOfBirth: new Date('1990-06-14'),
            gender: 'Female',
            maritalStatus: 'Single',
            employment: {
                type: 'Salaried',
                companyName: 'Cognizant',
                designation: 'Business Analyst',
                workExperience: 6,
                monthlyIncome: 70000,
                employmentStatus: 'Active'
            },
            address: {
                street: '741 Gomti Nagar',
                city: 'Lucknow',
                state: 'Uttar Pradesh',
                pincode: '226010'
            }
        }
    }
];

// Function to create test users
const createTestUsers = async () => {
    try {
        console.log('🔄 Creating 10 test users...');
        
        // Clear existing test users (optional)
        await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
        await UserProfile.deleteMany({});
        
        for (let i = 0; i < testUsers.length; i++) {
            const userData = testUsers[i];
            
            console.log(`Creating user ${i + 1}: ${userData.fullName}`);
            
            // Hash password
            const hashedPassword = await bcryptjs.hash(userData.password, 10);
            
            // Create user
            const nameParts = userData.fullName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || 'Kumar';
            
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: userData.email,
                phoneNumber: userData.phone,
                password: hashedPassword,
                isPhoneVerified: true,
                role: 'user'
            });
            
            const savedUser = await user.save();
            
            // Create user profile
            const userProfile = new UserProfile({
                userId: savedUser._id,
                ...userData.profile,
                kyc: {
                    status: i < 5 ? 'Verified' : 'Pending', // First 5 users verified
                    verificationLevel: i < 5 ? 'Full' : 'Basic'
                },
                preferences: {
                    notifications: {
                        email: true,
                        sms: true,
                        push: true
                    },
                    language: 'Hindi',
                    theme: 'light'
                }
            });
            
            await userProfile.save();
            
            // Create a loan application for some users
            if (i < 7) { // First 7 users have loan applications
                const loanAmount = 100000 + (i * 50000); // Varying loan amounts
                const tenure = 12 + (i * 6); // Varying tenure
                
                const loanApplication = new LoanApplication({
                    userId: savedUser._id,
                    loanAmount: loanAmount,
                    tenure: tenure,
                    purpose: ['Home_Renovation', 'Education', 'Medical', 'Business', 'Personal', 'Wedding', 'Travel'][i],
                    status: ['Draft', 'Submitted', 'Under_Review', 'Approved', 'Rejected', 'Disbursed', 'Active'][i],
                    personalDetails: {
                        fullName: userData.fullName,
                        email: userData.email,
                        phone: userData.phone,
                        dateOfBirth: userData.profile.dateOfBirth,
                        gender: userData.profile.gender,
                        maritalStatus: userData.profile.maritalStatus
                    },
                    addressDetails: userData.profile.address,
                    employmentDetails: userData.profile.employment,
                    riskAssessment: {
                        creditScore: 650 + (i * 20), // Varying credit scores
                        riskCategory: i < 3 ? 'Low' : i < 5 ? 'Medium' : 'High',
                        factors: ['Good Credit History', 'Stable Income', 'Low Debt-to-Income Ratio']
                    }
                });
                
                await loanApplication.save();
                
                // Create sample notification
                const notification = new Notification({
                    recipient: {
                        userId: savedUser._id,
                        email: userData.email,
                        phone: userData.phone
                    },
                    title: 'Loan Application Update',
                    message: `Your loan application of ₹${loanAmount} has been ${loanApplication.status.toLowerCase()}.`,
                    type: 'LOAN_STATUS_UPDATE',
                    priority: 'Medium',
                    relatedData: {
                        loanApplicationId: loanApplication._id
                    },
                    status: 'Delivered'
                });
                
                await notification.save();
                
                // Create audit log
                const auditLog = new AuditLog({
                    userId: savedUser._id,
                    userEmail: userData.email,
                    action: 'LOAN_APPLY',
                    resourceType: 'LoanApplication',
                    resourceId: loanApplication._id,
                    status: 'Success',
                    description: `User applied for loan of ₹${loanAmount}`,
                    metadata: {
                        ipAddress: '192.168.1.' + (100 + i),
                        userAgent: 'Mozilla/5.0 Test Browser'
                    },
                    riskLevel: 'Medium'
                });
                
                await auditLog.save();
            }
        }
        
        // Seed default settings
        await Settings.seedDefaultSettings();
        
        console.log('✅ Successfully created 10 test users with profiles, loans, notifications, and audit logs!');
        
        // Display summary
        const userCount = await User.countDocuments();
        const profileCount = await UserProfile.countDocuments();
        const loanCount = await LoanApplication.countDocuments();
        const notificationCount = await Notification.countDocuments();
        const auditCount = await AuditLog.countDocuments();
        const settingsCount = await Settings.countDocuments();
        
        console.log('\n📊 Database Summary:');
        console.log(`👥 Users: ${userCount}`);
        console.log(`📋 User Profiles: ${profileCount}`);
        console.log(`💰 Loan Applications: ${loanCount}`);
        console.log(`🔔 Notifications: ${notificationCount}`);
        console.log(`📝 Audit Logs: ${auditCount}`);
        console.log(`⚙️ Settings: ${settingsCount}`);
        
        // Test some queries
        console.log('\n🔍 Testing Database Queries:');
        
        // Get users with active loans
        const activeLoans = await LoanApplication.find({ status: 'Active' }).populate('userId');
        console.log(`📈 Active Loans: ${activeLoans.length}`);
        
        // Get verified users
        const verifiedUsers = await UserProfile.find({ 'kyc.status': 'Verified' }).populate('userId');
        console.log(`✅ Verified Users: ${verifiedUsers.length}`);
        
        // Get unread notifications
        const unreadNotifications = await Notification.find({ 'channels.inApp.read': false });
        console.log(`📬 Unread Notifications: ${unreadNotifications.length}`);
        
        // Get high-risk loans
        const highRiskLoans = await LoanApplication.find({ 'riskAssessment.riskCategory': 'High' });
        console.log(`⚠️ High Risk Loans: ${highRiskLoans.length}`);
        
        console.log('\n🎉 Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Error creating test users:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Database connection closed');
    }
};

// Run the test
connectDB().then(() => {
    createTestUsers();
});
