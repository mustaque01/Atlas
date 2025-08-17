const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // Basic payment info
    paymentId: {
        type: String,
        unique: true,
        required: true
    },
    
    // Related entities
    loanApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanApplication',
        required: true
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Payment details
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    
    currency: {
        type: String,
        default: 'INR'
    },
    
    // Payment type
    type: {
        type: String,
        required: true,
        enum: ['EMI', 'Prepayment', 'Processing_Fee', 'Late_Fee', 'Penalty', 'Other']
    },
    
    // EMI specific details
    emiDetails: {
        emiNumber: Number, // Which EMI (1st, 2nd, etc.)
        totalEmis: Number,
        principalAmount: Number,
        interestAmount: Number,
        outstandingPrincipal: Number,
        dueDate: Date,
        gracePeriod: { type: Number, default: 7 }, // days
        lateFee: { type: Number, default: 0 }
    },
    
    // Payment method
    paymentMethod: {
        type: String,
        required: true,
        enum: ['UPI', 'Net_Banking', 'Debit_Card', 'Credit_Card', 'NEFT', 'RTGS', 'Cash', 'Cheque', 'Auto_Debit']
    },
    
    // Payment gateway details
    gateway: {
        provider: String, // 'Razorpay', 'Paytm', 'PayU', etc.
        transactionId: String,
        gatewayOrderId: String,
        gatewayPaymentId: String,
        signature: String,
        providerResponse: mongoose.Schema.Types.Mixed
    },
    
    // Bank details (for NEFT/RTGS/Cheque)
    bankDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String,
        chequeNumber: String,
        utrNumber: String // for NEFT/RTGS
    },
    
    // Status tracking
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Success', 'Failed', 'Cancelled', 'Refunded', 'Partial_Refund'],
        default: 'Pending'
    },
    
    // Timestamps for different stages
    timeline: {
        initiated: { type: Date, default: Date.now },
        processing: Date,
        completed: Date,
        failed: Date,
        cancelled: Date
    },
    
    // Failure/Error details
    failureReason: String,
    errorCode: String,
    
    // Refund details
    refund: {
        amount: Number,
        reason: String,
        processedAt: Date,
        refundId: String,
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Completed', 'Failed']
        }
    },
    
    // Late payment tracking
    latePayment: {
        isLate: { type: Boolean, default: false },
        daysLate: { type: Number, default: 0 },
        lateFeeApplied: { type: Number, default: 0 },
        waiver: {
            amount: Number,
            reason: String,
            approvedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            approvedAt: Date
        }
    },
    
    // Auto-debit details
    autoDebit: {
        enabled: { type: Boolean, default: false },
        mandateId: String,
        bankAccountId: String,
        nextAttempt: Date,
        attempts: { type: Number, default: 0 },
        maxAttempts: { type: Number, default: 3 }
    },
    
    // Receipt and documentation
    receipt: {
        number: String,
        url: String,
        generated: { type: Boolean, default: false },
        generatedAt: Date
    },
    
    // Verification
    verification: {
        isVerified: { type: Boolean, default: false },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        verifiedAt: Date,
        notes: String
    },
    
    // Additional metadata
    metadata: {
        ipAddress: String,
        userAgent: String,
        deviceInfo: String,
        source: String, // 'web', 'mobile', 'admin'
        notes: String
    }
}, {
    timestamps: true
});

// Indexes for better performance
paymentSchema.index({ paymentId: 1 }, { unique: true });
paymentSchema.index({ loanApplication: 1, 'emiDetails.emiNumber': 1 });
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ 'emiDetails.dueDate': 1, status: 1 });
paymentSchema.index({ 'gateway.transactionId': 1 });
paymentSchema.index({ type: 1, status: 1 });

// Pre-save middleware to generate payment ID
paymentSchema.pre('save', function(next) {
    if (!this.paymentId) {
        this.paymentId = 'PAY' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    next();
});

// Method to calculate late fee
paymentSchema.methods.calculateLateFee = function() {
    if (this.emiDetails && this.emiDetails.dueDate) {
        const dueDate = new Date(this.emiDetails.dueDate);
        const gracePeriodEnd = new Date(dueDate);
        gracePeriodEnd.setDate(gracePeriodEnd.getDate() + this.emiDetails.gracePeriod);
        
        const now = new Date();
        
        if (now > gracePeriodEnd) {
            const daysLate = Math.ceil((now - gracePeriodEnd) / (1000 * 60 * 60 * 24));
            this.latePayment.isLate = true;
            this.latePayment.daysLate = daysLate;
            
            // Calculate late fee (example: 2% of EMI amount or minimum Rs. 500)
            const lateFeePercentage = 0.02;
            const minimumLateFee = 500;
            const calculatedFee = Math.max(this.amount * lateFeePercentage, minimumLateFee);
            
            this.latePayment.lateFeeApplied = calculatedFee;
            return calculatedFee;
        }
    }
    return 0;
};

// Static method to get overdue payments
paymentSchema.statics.getOverduePayments = function() {
    const now = new Date();
    return this.find({
        'emiDetails.dueDate': { $lt: now },
        status: { $in: ['Pending', 'Failed'] },
        type: 'EMI'
    }).populate('user loanApplication');
};

module.exports = mongoose.model('Payment', paymentSchema);
