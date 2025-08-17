const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    
    // Personal Information
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    nationality: {
        type: String,
        default: 'Indian'
    },
    
    // Address Information
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: {
            type: String,
            default: 'India'
        }
    },
    
    // Employment Information
    employment: {
        type: {
            type: String,
            enum: ['Salaried', 'Self-Employed', 'Business', 'Retired', 'Student', 'Unemployed']
        },
        companyName: String,
        designation: String,
        workExperience: Number, // in years
        monthlyIncome: Number,
        annualIncome: Number,
        employmentProof: String // document URL
    },
    
    // Financial Information
    bankDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String,
        accountType: {
            type: String,
            enum: ['Savings', 'Current', 'Salary']
        }
    },
    
    // Documents
    documents: {
        aadharNumber: String,
        panNumber: String,
        aadharDocument: String, // URL
        panDocument: String, // URL
        incomeProof: String, // URL
        salarySlips: [String], // Array of URLs
        bankStatements: [String] // Array of URLs
    },
    
    // Credit Information
    creditScore: {
        score: Number,
        lastUpdated: Date,
        bureau: String // CIBIL, Experian, etc.
    },
    
    // Profile Status
    profileCompleted: {
        type: Number,
        default: 0, // percentage completed
        min: 0,
        max: 100
    },
    
    isKYCCompleted: {
        type: Boolean,
        default: false
    },
    
    // Preferences
    preferences: {
        language: {
            type: String,
            default: 'English'
        },
        currency: {
            type: String,
            default: 'INR'
        },
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            }
        }
    }
}, {
    timestamps: true
});

// Index for better performance
userProfileSchema.index({ userId: 1 });
userProfileSchema.index({ 'documents.panNumber': 1 });
userProfileSchema.index({ 'documents.aadharNumber': 1 });

module.exports = mongoose.model('UserProfile', userProfileSchema);
