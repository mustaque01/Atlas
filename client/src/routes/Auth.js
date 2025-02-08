import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api/auth';


export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/signup`, userData, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('Signup successful:', response.data);
        return response.data;  

    } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Signup failed ho gya');
    }
};


const API_URL = import.meta.env.VITE_BACKEND_URL; 

// Function to request OTP
export const sendOTP = async (phoneNumber) => {
    try {
        const response = await axios.post(`${API_URL}/generate-otp`, { phoneNumber });
        return response.data; 
    } catch (error) {
        console.error("Error generating OTP:", error);
        throw error.response?.data?.message || "Failed to generate OTP";
    }
};

// Function to verify OTP
export const verifyOTP = async (phoneNumber, otp) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { phoneNumber, otp });
        return response.data; // Expecting { message: "Phone number verified successfully." }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error.response?.data?.message || "Invalid OTP";
    }
};

