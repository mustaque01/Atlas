const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phoneNumber: { type: String, unique: true, required: true },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isPhoneVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Otp", otpSchema);
