import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api/auth';

// Signup function
export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/signup`, userData, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('Signup successful:', response.data);
        return response.data;  // axios automatically parses JSON

    } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Signup failed ho gya');
    }
};
