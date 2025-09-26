import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, sendOTP, verifyOTP } from '@/routes/Auth';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setError(""); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!isVerified) {
            setError('Please verify your phone number first!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await signupUser(formData);
            console.log("User signed up:", response);
            setSuccessMessage("Account created successfully! Redirecting...");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Signup failed:", error);
            setError("Sign up failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOTP = async () => {
        if (!formData.phoneNumber) {
            setError("Please enter your phone number first.");
            return;
        }

        if (formData.phoneNumber.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await sendOTP(formData.phoneNumber);
            console.log("OTP Sent:", response);
            setOtpSent(true);
            setError("");
            setSuccessMessage("OTP sent successfully! Check your messages.");
        } catch (err) {
            console.error("Error sending OTP:", err);
            setError("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await verifyOTP(formData.phoneNumber, otp);
            console.log("OTP Verified:", response);
            setIsVerified(true); 
            setSuccessMessage("Phone number verified successfully!");
            setOtpSent(false);
            setError("");
        } catch (err) {
            console.error("OTP Verification Failed:", err);
            setError("Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[500px] shadow-md bg-white rounded-lg">
                <div className="px-6 py-4 mt-4">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Account</h2>
                    <form className="px-4 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {successMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                {successMessage}
                            </div>
                        )}

                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Phone Number Section with OTP */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <div className="flex">
                                <input
                                    className={`flex-1 px-3 py-2 text-sm leading-tight text-gray-700 border rounded-l shadow focus:outline-none focus:ring-1 focus:ring-green-500 ${
                                        isVerified ? 'bg-green-50' : ''
                                    }`}
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={isVerified}
                                    maxLength={10}
                                />
                                {!isVerified && (
                                    <button
                                        type="button"
                                        className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-r hover:bg-blue-700 ${
                                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onClick={handleSendOTP}
                                        disabled={isLoading || otpSent}
                                    >
                                        {isLoading ? '...' : otpSent ? 'OTP Sent' : 'Send OTP'}
                                    </button>
                                )}
                                {isVerified && (
                                    <div className="px-4 py-2 text-sm bg-green-600 text-white rounded-r flex items-center">
                                        ✅ Verified
                                    </div>
                                )}
                            </div>

                            {/* OTP Input */}
                            {otpSent && !isVerified && (
                                <div className="mt-3">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Enter OTP
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="flex-1 px-3 py-2 text-sm border rounded-l shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                            maxLength={6}
                                        />
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm bg-green-600 text-white rounded-r hover:bg-green-700 ${
                                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                            onClick={handleVerifyOTP}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Verifying...' : 'Verify'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        OTP will expire in 5 minutes
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                    id="password"
                                    type="password"
                                    placeholder="**************"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="******************"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6 text-center">
                            <button
                                type="submit"
                                className={`w-full px-4 py-2 font-bold text-white rounded-full bg-green-600 hover:bg-green-700 ${
                                    isLoading || !isVerified ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isLoading || !isVerified}
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                            {!isVerified && (
                                <p className="text-xs text-red-500 mt-2">
                                    Please verify your phone number to continue
                                </p>
                            )}
                        </div>

                        <hr className="mb-6 border-t" />
                        <div className="text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="inline-block text-md text-blue-600 align-baseline hover:text-blue-800">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
