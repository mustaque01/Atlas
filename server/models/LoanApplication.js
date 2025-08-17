const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    applicationId: {
        type: String,
        unique: true,
        required: true
    },
    
    // Loan Details
    loanType: {
        type: String,
        enum: ['Personal', 'Home', 'Car', 'Business', 'Education', 'Gold', 'Agriculture'],
        required: true
    },
    
    loanAmount: {
        type: Number,
        required: true,
        min: 1000,
        max: 10000000 // 1 crore max
    },
    
    loanPurpose: {
        type: String,
        required: true
    },
    
    tenure: {
        type: Number, // in months
        required: true,
        min: 3,
        max: 360 // 30 years max
    },
    
    interestRate: {
        type: Number,
        min: 8,
        max: 25
    },
    
    // Application Status
    status: {
        type: String,
        enum: ['Draft', 'Submitted', 'Under Review', 'Document Verification', 
               'Credit Check', 'Approved', 'Rejected', 'Disbursed', 'Closed'],
        default: 'Draft'
    },
    
    // Workflow Tracking
    workflow: [{
        stage: {
            type: String,
            enum: ['application', 'documentation', 'verification', 'assessment', 'approval']
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', 'rejected']
        },
        startDate: Date,
        endDate: Date,
        notes: String,
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    
    // Risk Assessment
    riskAssessment: {
        score: {
            type: Number,
            min: 0,
            max: 100
        },
        factors: [{
            factor: String,
            score: Number,
            weight: Number
        }],
        aiModel: String,
        assessmentDate: Date,
        recommendation: {
            type: String,
            enum: ['Approve', 'Reject', 'Manual Review']
        }
    },
    
    // Documents Submitted
    documents: [{
        type: {
            type: String,
            enum: ['Identity', 'Income', 'Address', 'Bank Statement', 'Other']
        },
        name: String,
        url: String,
        uploadDate: Date,
        verificationStatus: {
            type: String,
            enum: ['Pending', 'Verified', 'Rejected'],
            default: 'Pending'
        },
        aiVerification: {
            authenticity: Number, // 0-100
            completeness: Number, // 0-100
            quality: Number // 0-100
        }
    }],
    
    // EMI Calculation
    emiDetails: {
        emiAmount: Number,
        totalInterest: Number,
        totalAmount: Number,
        emiSchedule: [{
            emiNumber: Number,
            dueDate: Date,
            principal: Number,
            interest: Number,
            totalEmi: Number,
            balance: Number
        }]
    },
    
    // Approval/Rejection Details
    decision: {
        approvedAmount: Number,
        approvedTenure: Number,
        approvedRate: Number,
        conditions: [String],
        rejectionReason: String,
        decidedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        decisionDate: Date
    },
    
    // Disbursement
    disbursement: {
        amount: Number,
        date: Date,
        bankAccount: {
            accountNumber: String,
            ifscCode: String,
            bankName: String
        },
        transactionId: String,
        method: {
            type: String,
            enum: ['NEFT', 'RTGS', 'UPI', 'Cheque']
        }
    },
    
    // Notes and Comments
    notes: [{
        note: String,
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        addedAt: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
            enum: ['Internal', 'Customer', 'System']
        }
    }],
    
    // Timeline
    timeline: [{
        event: String,
        date: {
            type: Date,
            default: Date.now
        },
        description: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
}, {
    timestamps: true
});

// Indexes for better performance
loanApplicationSchema.index({ userId: 1, status: 1 });
loanApplicationSchema.index({ applicationId: 1 });
loanApplicationSchema.index({ loanType: 1, status: 1 });
loanApplicationSchema.index({ createdAt: -1 });

// Pre-save middleware to generate application ID
loanApplicationSchema.pre('save', async function(next) {
    if (!this.applicationId) {
        const count = await mongoose.model('LoanApplication').countDocuments();
        this.applicationId = `ATLAS${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
