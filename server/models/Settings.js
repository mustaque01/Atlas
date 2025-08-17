const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    // Setting identifier
    key: {
        type: String,
        required: true,
        unique: true
    },
    
    // Setting value (flexible type)
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    
    // Setting metadata
    category: {
        type: String,
        required: true,
        enum: [
            'LOAN_CONFIG', 'INTEREST_RATES', 'FEES', 'LIMITS', 'VERIFICATION',
            'NOTIFICATION', 'SECURITY', 'SYSTEM', 'UI_CONFIG', 'BUSINESS_RULES',
            'PAYMENT_GATEWAY', 'KYC', 'RISK_ASSESSMENT', 'COMPLIANCE'
        ]
    },
    
    name: {
        type: String,
        required: true
    },
    
    description: String,
    
    // Data type for validation
    dataType: {
        type: String,
        required: true,
        enum: ['string', 'number', 'boolean', 'object', 'array', 'date']
    },
    
    // Validation rules
    validation: {
        required: { type: Boolean, default: false },
        min: Number,
        max: Number,
        pattern: String, // regex pattern for strings
        allowedValues: [mongoose.Schema.Types.Mixed], // for enum-like behavior
        customValidator: String // function name for custom validation
    },
    
    // Default value
    defaultValue: mongoose.Schema.Types.Mixed,
    
    // Environment specific
    environment: {
        type: String,
        enum: ['development', 'staging', 'production', 'all'],
        default: 'all'
    },
    
    // Access control
    accessLevel: {
        type: String,
        enum: ['public', 'internal', 'admin', 'super_admin'],
        default: 'admin'
    },
    
    // Change tracking
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    changeHistory: [{
        previousValue: mongoose.Schema.Types.Mixed,
        newValue: mongoose.Schema.Types.Mixed,
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        modifiedAt: { type: Date, default: Date.now },
        reason: String
    }],
    
    // Status
    isActive: {
        type: Boolean,
        default: true
    },
    
    // Dependencies
    dependsOn: [String], // other setting keys that this setting depends on
    affects: [String], // other setting keys that are affected by this setting
    
    // Additional metadata
    tags: [String],
    notes: String,
    
    // Sensitive data flag
    isSensitive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Indexes
settingsSchema.index({ key: 1 }, { unique: true });
settingsSchema.index({ category: 1, isActive: 1 });
settingsSchema.index({ environment: 1, isActive: 1 });
settingsSchema.index({ accessLevel: 1 });

// Method to get setting value with validation
settingsSchema.methods.getValue = function() {
    if (!this.isActive) {
        return this.defaultValue;
    }
    return this.value;
};

// Static method to get setting by key
settingsSchema.statics.getSetting = function(key, defaultValue = null) {
    return this.findOne({ key, isActive: true }).then(setting => {
        return setting ? setting.getValue() : defaultValue;
    });
};

// Static method to update setting with history
settingsSchema.statics.updateSetting = function(key, newValue, userId, reason = '') {
    return this.findOne({ key }).then(setting => {
        if (!setting) {
            throw new Error(`Setting with key '${key}' not found`);
        }
        
        // Add to change history
        setting.changeHistory.push({
            previousValue: setting.value,
            newValue: newValue,
            modifiedBy: userId,
            reason: reason
        });
        
        setting.value = newValue;
        setting.lastModifiedBy = userId;
        
        return setting.save();
    });
};

// Pre-defined system settings
const defaultSettings = [
    // Loan Configuration
    {
        key: 'LOAN_MIN_AMOUNT',
        value: 50000,
        category: 'LOAN_CONFIG',
        name: 'Minimum Loan Amount',
        description: 'Minimum amount that can be borrowed',
        dataType: 'number',
        validation: { required: true, min: 1000 }
    },
    {
        key: 'LOAN_MAX_AMOUNT',
        value: 5000000,
        category: 'LOAN_CONFIG',
        name: 'Maximum Loan Amount',
        description: 'Maximum amount that can be borrowed',
        dataType: 'number',
        validation: { required: true, min: 50000 }
    },
    {
        key: 'LOAN_MIN_TENURE',
        value: 6,
        category: 'LOAN_CONFIG',
        name: 'Minimum Loan Tenure (months)',
        description: 'Minimum loan tenure in months',
        dataType: 'number',
        validation: { required: true, min: 1 }
    },
    {
        key: 'LOAN_MAX_TENURE',
        value: 84,
        category: 'LOAN_CONFIG',
        name: 'Maximum Loan Tenure (months)',
        description: 'Maximum loan tenure in months',
        dataType: 'number',
        validation: { required: true, max: 360 }
    },
    
    // Interest Rates
    {
        key: 'BASE_INTEREST_RATE',
        value: 12.5,
        category: 'INTEREST_RATES',
        name: 'Base Interest Rate (%)',
        description: 'Base annual interest rate',
        dataType: 'number',
        validation: { required: true, min: 1, max: 50 }
    },
    {
        key: 'RISK_PREMIUM_RATES',
        value: {
            low: 0,
            medium: 2,
            high: 5,
            very_high: 10
        },
        category: 'INTEREST_RATES',
        name: 'Risk Premium Rates',
        description: 'Additional interest based on risk assessment',
        dataType: 'object'
    },
    
    // Fees
    {
        key: 'PROCESSING_FEE_PERCENTAGE',
        value: 2.5,
        category: 'FEES',
        name: 'Processing Fee (%)',
        description: 'Processing fee as percentage of loan amount',
        dataType: 'number',
        validation: { min: 0, max: 10 }
    },
    {
        key: 'LATE_PAYMENT_FEE',
        value: 500,
        category: 'FEES',
        name: 'Late Payment Fee',
        description: 'Fixed fee for late EMI payments',
        dataType: 'number',
        validation: { min: 0 }
    },
    
    // Verification Settings
    {
        key: 'KYC_REQUIRED_DOCUMENTS',
        value: ['Aadhaar', 'PAN', 'Bank Statement', 'Salary Slip'],
        category: 'VERIFICATION',
        name: 'Required KYC Documents',
        description: 'List of documents required for KYC verification',
        dataType: 'array'
    },
    {
        key: 'AUTO_APPROVAL_LIMIT',
        value: 100000,
        category: 'VERIFICATION',
        name: 'Auto Approval Limit',
        description: 'Loan amount below which auto approval is possible',
        dataType: 'number'
    },
    
    // System Settings
    {
        key: 'OTP_VALIDITY_MINUTES',
        value: 10,
        category: 'SYSTEM',
        name: 'OTP Validity (minutes)',
        description: 'How long an OTP remains valid',
        dataType: 'number',
        validation: { min: 1, max: 60 }
    },
    {
        key: 'SESSION_TIMEOUT_MINUTES',
        value: 30,
        category: 'SYSTEM',
        name: 'Session Timeout (minutes)',
        description: 'User session timeout duration',
        dataType: 'number',
        validation: { min: 5, max: 480 }
    }
];

// Method to seed default settings
settingsSchema.statics.seedDefaultSettings = function() {
    return Promise.all(defaultSettings.map(setting => {
        return this.findOneAndUpdate(
            { key: setting.key },
            setting,
            { upsert: true, new: true }
        );
    }));
};

module.exports = mongoose.model('Settings', settingsSchema);
