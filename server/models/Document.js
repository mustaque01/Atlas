const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanApplication'
    },
    
    // Document Details
    documentType: {
        type: String,
        enum: [
            'Aadhar Card', 'PAN Card', 'Passport', 'Driving License', 'Voter ID',
            'Salary Slip', 'Bank Statement', 'ITR', 'Form 16', 'Employment Letter',
            'Business Registration', 'GST Certificate', 'Property Papers',
            'Other'
        ],
        required: true
    },
    
    category: {
        type: String,
        enum: ['Identity', 'Address', 'Income', 'Asset', 'Other'],
        required: true
    },
    
    fileName: {
        type: String,
        required: true
    },
    
    originalName: String,
    
    fileUrl: {
        type: String,
        required: true
    },
    
    fileSize: Number, // in bytes
    
    mimeType: String,
    
    // AI Verification Results
    aiVerification: {
        isProcessed: {
            type: Boolean,
            default: false
        },
        
        authenticity: {
            score: Number, // 0-100
            confidence: Number,
            flags: [String] // suspicious elements found
        },
        
        extractedData: {
            // For Identity Documents
            name: String,
            documentNumber: String,
            dateOfBirth: Date,
            address: String,
            fatherName: String,
            
            // For Income Documents
            employerName: String,
            salary: Number,
            period: String,
            
            // For Bank Statements
            accountNumber: String,
            bankName: String,
            averageBalance: Number,
            
            // Generic extracted text
            rawText: String
        },
        
        qualityCheck: {
            resolution: String, // High, Medium, Low
            clarity: Number, // 0-100
            completeness: Number, // 0-100
            isBlurred: Boolean,
            isCorrupted: Boolean
        },
        
        processedAt: Date,
        processingTime: Number, // in milliseconds
        
        errors: [String]
    },
    
    // Manual Verification
    manualVerification: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'Requires Clarification'],
            default: 'Pending'
        },
        
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        
        verifiedAt: Date,
        
        notes: String,
        
        discrepancies: [String]
    },
    
    // Version Control
    version: {
        type: Number,
        default: 1
    },
    
    parentDocument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    
    // Security
    encryptionKey: String,
    accessLog: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        action: {
            type: String,
            enum: ['Upload', 'View', 'Download', 'Verify', 'Delete']
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        ipAddress: String,
        userAgent: String
    }],
    
    // Expiry and Retention
    expiryDate: Date,
    retentionPeriod: Number, // in days
    isArchived: {
        type: Boolean,
        default: false
    },
    
    // Tags for better organization
    tags: [String],
    
    // Compliance
    complianceChecks: [{
        checkType: String,
        status: {
            type: String,
            enum: ['Pass', 'Fail', 'Warning']
        },
        details: String,
        checkedAt: Date
    }]
}, {
    timestamps: true
});

// Indexes
documentSchema.index({ userId: 1, documentType: 1 });
documentSchema.index({ applicationId: 1 });
documentSchema.index({ 'aiVerification.isProcessed': 1 });
documentSchema.index({ 'manualVerification.status': 1 });
documentSchema.index({ createdAt: -1 });

// Virtual for document age
documentSchema.virtual('age').get(function() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // in days
});

module.exports = mongoose.model('Document', documentSchema);
