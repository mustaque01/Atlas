const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    // User who performed the action
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    userEmail: String, // Store email for reference even if user is deleted
    
    // Action Details
    action: {
        type: String,
        required: true,
        enum: [
            'USER_REGISTER', 'USER_LOGIN', 'USER_LOGOUT', 'USER_UPDATE', 'USER_DELETE',
            'LOAN_APPLY', 'LOAN_APPROVE', 'LOAN_REJECT', 'LOAN_DISBURSE', 'LOAN_CLOSE',
            'DOCUMENT_UPLOAD', 'DOCUMENT_VERIFY', 'DOCUMENT_DELETE',
            'OTP_GENERATE', 'OTP_VERIFY', 'PASSWORD_CHANGE', 'PASSWORD_RESET',
            'ROLE_CHANGE', 'PERMISSION_GRANT', 'PERMISSION_REVOKE',
            'DATA_EXPORT', 'DATA_IMPORT', 'SYSTEM_BACKUP', 'SYSTEM_RESTORE',
            'PAYMENT_PROCESS', 'REFUND_PROCESS',
            'NOTIFICATION_SEND', 'EMAIL_SEND', 'SMS_SEND'
        ]
    },
    
    // Resource affected
    resourceType: {
        type: String,
        enum: ['User', 'LoanApplication', 'Document', 'Payment', 'System', 'Other']
    },
    
    resourceId: {
        type: mongoose.Schema.Types.ObjectId
    },
    
    // Request details
    method: String, // GET, POST, PUT, DELETE
    endpoint: String, // API endpoint
    
    // Changes made
    changes: {
        before: mongoose.Schema.Types.Mixed, // Data before change
        after: mongoose.Schema.Types.Mixed   // Data after change
    },
    
    // Request metadata
    metadata: {
        ipAddress: String,
        userAgent: String,
        sessionId: String,
        requestId: String
    },
    
    // Result
    status: {
        type: String,
        enum: ['Success', 'Failed', 'Partial'],
        required: true
    },
    
    statusCode: Number, // HTTP status code
    
    errorMessage: String,
    
    // Additional context
    description: String,
    
    // Performance metrics
    executionTime: Number, // in milliseconds
    
    // Risk level
    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Low'
    },
    
    // Compliance flags
    complianceFlags: [{
        type: String,
        description: String
    }]
}, {
    timestamps: true
});

// Indexes for better performance
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });
auditLogSchema.index({ 'metadata.ipAddress': 1 });
auditLogSchema.index({ riskLevel: 1 });
auditLogSchema.index({ createdAt: -1 }); // For time-based queries

// TTL index to automatically delete old logs after 2 years
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 63072000 }); // 2 years

module.exports = mongoose.model('AuditLog', auditLogSchema);
