const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    // Recipient details
    recipient: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: String,
        phone: String
    },
    
    // Notification content
    title: {
        type: String,
        required: true
    },
    
    message: {
        type: String,
        required: true
    },
    
    // Notification type
    type: {
        type: String,
        required: true,
        enum: [
            'LOAN_STATUS_UPDATE', 'DOCUMENT_REQUEST', 'PAYMENT_DUE', 'PAYMENT_RECEIVED',
            'VERIFICATION_REQUIRED', 'VERIFICATION_COMPLETE', 'LOAN_APPROVED', 'LOAN_REJECTED',
            'SECURITY_ALERT', 'SYSTEM_MAINTENANCE', 'PROMOTIONAL', 'REMINDER',
            'WELCOME', 'PASSWORD_RESET', 'LOGIN_ALERT', 'KYC_UPDATE'
        ]
    },
    
    // Priority level
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    
    // Delivery channels
    channels: {
        inApp: {
            enabled: { type: Boolean, default: true },
            delivered: { type: Boolean, default: false },
            deliveredAt: Date,
            read: { type: Boolean, default: false },
            readAt: Date
        },
        email: {
            enabled: { type: Boolean, default: false },
            delivered: { type: Boolean, default: false },
            deliveredAt: Date,
            opened: { type: Boolean, default: false },
            openedAt: Date,
            bounced: { type: Boolean, default: false },
            bounceReason: String
        },
        sms: {
            enabled: { type: Boolean, default: false },
            delivered: { type: Boolean, default: false },
            deliveredAt: Date,
            failed: { type: Boolean, default: false },
            failureReason: String
        },
        push: {
            enabled: { type: Boolean, default: false },
            delivered: { type: Boolean, default: false },
            deliveredAt: Date,
            clicked: { type: Boolean, default: false },
            clickedAt: Date
        }
    },
    
    // Related data
    relatedData: {
        loanApplicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoanApplication'
        },
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId
        },
        otherData: mongoose.Schema.Types.Mixed
    },
    
    // Action buttons for interactive notifications
    actions: [{
        label: String,
        action: String, // 'redirect', 'api_call', 'download', etc.
        url: String,
        method: String,
        payload: mongoose.Schema.Types.Mixed
    }],
    
    // Scheduling
    scheduledFor: Date,
    expiresAt: Date,
    
    // Status
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Failed', 'Cancelled', 'Expired'],
        default: 'Pending'
    },
    
    // Delivery attempts
    deliveryAttempts: {
        count: { type: Number, default: 0 },
        maxAttempts: { type: Number, default: 3 },
        lastAttempt: Date,
        nextAttempt: Date
    },
    
    // Template information
    template: {
        name: String,
        version: String,
        variables: mongoose.Schema.Types.Mixed
    },
    
    // Metadata
    metadata: {
        source: String, // 'system', 'admin', 'automated'
        campaign: String,
        tags: [String],
        customData: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

// Indexes
notificationSchema.index({ 'recipient.userId': 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ priority: 1, status: 1 });
notificationSchema.index({ scheduledFor: 1, status: 1 });
notificationSchema.index({ expiresAt: 1 });
notificationSchema.index({ 'channels.inApp.read': 1, 'recipient.userId': 1 });

// TTL index for expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for checking if notification is overdue
notificationSchema.virtual('isOverdue').get(function() {
    return this.scheduledFor && this.scheduledFor < new Date() && this.status === 'Pending';
});

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
    this.channels.inApp.read = true;
    this.channels.inApp.readAt = new Date();
    return this.save();
};

// Static method to get unread count for user
notificationSchema.statics.getUnreadCount = function(userId) {
    return this.countDocuments({
        'recipient.userId': userId,
        'channels.inApp.read': false,
        status: 'Delivered'
    });
};

module.exports = mongoose.model('Notification', notificationSchema);
