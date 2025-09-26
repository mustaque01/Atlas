const axios = require('axios');
require('dotenv').config();

class SMSService {
    constructor() {
        // You can use multiple SMS providers
        this.providers = {
            MSG91: 'msg91',
            TWILIO: 'twilio',
            TEXTLOCAL: 'textlocal'
        };
        
        // Default provider
        this.activeProvider = this.providers.MSG91;
    }

    // MSG91 SMS Service (Most popular in India)
    async sendSMSViaMSG91(phoneNumber, message) {
        try {
            const msg91Config = {
                authkey: process.env.MSG91_AUTH_KEY || 'YOUR_MSG91_AUTH_KEY',
                sender: process.env.MSG91_SENDER_ID || 'ATLAS',
                route: '4', // Transactional route
                country: '91'
            };

            const url = 'https://api.msg91.com/api/sendhttp.php';
            
            const params = {
                authkey: msg91Config.authkey,
                mobiles: phoneNumber,
                message: message,
                sender: msg91Config.sender,
                route: msg91Config.route,
                country: msg91Config.country
            };

            const response = await axios.get(url, { params });
            
            console.log('📱 MSG91 SMS Response:', response.data);
            
            return {
                success: true,
                provider: 'MSG91',
                response: response.data,
                messageId: response.data.split('||')[1] || 'unknown'
            };
            
        } catch (error) {
            console.error('❌ MSG91 SMS Error:', error.response?.data || error.message);
            return {
                success: false,
                provider: 'MSG91',
                error: error.message
            };
        }
    }

    // Twilio SMS Service (International)
    async sendSMSViaTwilio(phoneNumber, message) {
        try {
            const twilio = require('twilio');
            
            const client = twilio(
                process.env.TWILIO_ACCOUNT_SID || 'YOUR_TWILIO_SID',
                process.env.TWILIO_AUTH_TOKEN || 'YOUR_TWILIO_TOKEN'
            );

            const result = await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
                to: `+91${phoneNumber}`
            });

            console.log('📱 Twilio SMS Response:', result.sid);
            
            return {
                success: true,
                provider: 'Twilio',
                response: result,
                messageId: result.sid
            };
            
        } catch (error) {
            console.error('❌ Twilio SMS Error:', error.message);
            return {
                success: false,
                provider: 'Twilio',
                error: error.message
            };
        }
    }

    // TextLocal SMS Service (India focused)
    async sendSMSViaTextLocal(phoneNumber, message) {
        try {
            const url = 'https://api.textlocal.in/send/';
            
            const data = {
                apikey: process.env.TEXTLOCAL_API_KEY || 'YOUR_TEXTLOCAL_KEY',
                numbers: phoneNumber,
                message: message,
                sender: process.env.TEXTLOCAL_SENDER || 'ATLAS'
            };

            const response = await axios.post(url, new URLSearchParams(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log('📱 TextLocal SMS Response:', response.data);
            
            return {
                success: response.data.status === 'success',
                provider: 'TextLocal',
                response: response.data,
                messageId: response.data.messages?.[0]?.id || 'unknown'
            };
            
        } catch (error) {
            console.error('❌ TextLocal SMS Error:', error.response?.data || error.message);
            return {
                success: false,
                provider: 'TextLocal',
                error: error.message
            };
        }
    }

    // Main method to send OTP SMS
    async sendOTPSMS(phoneNumber, otp) {
        try {
            // Clean phone number (remove +91 if present)
            const cleanPhone = phoneNumber.replace(/^\+?91/, '');
            
            // Validate phone number (should be 10 digits)
            if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
                throw new Error('Invalid Indian phone number format');
            }

            // Create OTP message
            const message = `आपका Atlas Loan OTP है: ${otp}। इसे किसी के साथ शेयर न करें। यह 10 मिनट में expire हो जाएगा। - ATLAS`;

            console.log(`📱 Sending OTP ${otp} to ${cleanPhone}`);

            let result;

            // Try different providers in order of preference
            switch (this.activeProvider) {
                case this.providers.MSG91:
                    result = await this.sendSMSViaMSG91(cleanPhone, message);
                    if (!result.success && process.env.TWILIO_ACCOUNT_SID) {
                        console.log('⚠️ MSG91 failed, trying Twilio...');
                        result = await this.sendSMSViaTwilio(cleanPhone, message);
                    }
                    break;

                case this.providers.TWILIO:
                    result = await this.sendSMSViaTwilio(cleanPhone, message);
                    if (!result.success && process.env.MSG91_AUTH_KEY) {
                        console.log('⚠️ Twilio failed, trying MSG91...');
                        result = await this.sendSMSViaMSG91(cleanPhone, message);
                    }
                    break;

                case this.providers.TEXTLOCAL:
                    result = await this.sendSMSViaTextLocal(cleanPhone, message);
                    break;

                default:
                    // Fallback: try MSG91 first
                    result = await this.sendSMSViaMSG91(cleanPhone, message);
            }

            // If all providers fail, return simulation mode
            if (!result.success) {
                console.log('⚠️ All SMS providers failed, running in simulation mode');
                result = {
                    success: true,
                    provider: 'Simulation',
                    messageId: 'SIM_' + Date.now(),
                    simulation: true,
                    message: `OTP ${otp} would be sent to ${cleanPhone}`
                };
            }

            return result;

        } catch (error) {
            console.error('❌ SMS Service Error:', error.message);
            
            // Return simulation mode on error
            return {
                success: true,
                provider: 'Simulation',
                messageId: 'SIM_ERROR_' + Date.now(),
                simulation: true,
                error: error.message,
                message: `OTP ${otp} would be sent to ${phoneNumber} (Error: ${error.message})`
            };
        }
    }

    // Method to send custom SMS
    async sendCustomSMS(phoneNumber, message) {
        try {
            const cleanPhone = phoneNumber.replace(/^\+?91/, '');

            let result;
            switch (this.activeProvider) {
                case this.providers.MSG91:
                    result = await this.sendSMSViaMSG91(cleanPhone, message);
                    break;
                case this.providers.TWILIO:
                    result = await this.sendSMSViaTwilio(cleanPhone, message);
                    break;
                case this.providers.TEXTLOCAL:
                    result = await this.sendSMSViaTextLocal(cleanPhone, message);
                    break;
                default:
                    result = await this.sendSMSViaMSG91(cleanPhone, message);
            }

            return result;

        } catch (error) {
            console.error('❌ Custom SMS Error:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Set active SMS provider
    setProvider(provider) {
        if (Object.values(this.providers).includes(provider)) {
            this.activeProvider = provider;
            console.log(`📱 SMS Provider changed to: ${provider}`);
        } else {
            console.error(`❌ Invalid SMS provider: ${provider}`);
        }
    }

    // Get SMS delivery status
    async getDeliveryStatus(messageId, provider) {
        try {
            if (provider === 'MSG91') {
                const url = `https://api.msg91.com/api/deliveryReport.php`;
                const params = {
                    authkey: process.env.MSG91_AUTH_KEY,
                    messageId: messageId
                };
                
                const response = await axios.get(url, { params });
                return response.data;
            }
            
            // Add other provider status checks here
            return { status: 'unknown', provider };
            
        } catch (error) {
            console.error('❌ Status Check Error:', error.message);
            return { error: error.message };
        }
    }
}

module.exports = new SMSService();
