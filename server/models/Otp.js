const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phoneNumber: { type: String, unique: true, required: true },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isPhoneVerified: { type: Boolean, default: false },
    
    // SMS tracking fields
    smsProvider: { 
        type: String, 
        enum: ['MSG91', 'Twilio', 'TextLocal', 'Simulation'],
        default: 'Simulation'
    },
    messageId: { type: String }, // SMS provider message ID
    smsStatus: { 
        type: String, 
        enum: ['Sent', 'Delivered', 'Failed', 'Pending'],
        default: 'Pending'
    },
    sentAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date },
    attempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model("Otp", otpSchema);
