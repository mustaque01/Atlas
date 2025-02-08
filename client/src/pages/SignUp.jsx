import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, sendOTP ,verifyOTP } from '@/routes/Auth'; // Ensure the correct import path

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
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await signupUser(formData);
            console.log("User signed up:", response);
            alert("Sign up successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
            setError("Sign up failed. Please try again.");
        }
    };

    const handleSendOTP = async () => {
        if (!formData.phoneNumber) {
            setError("Please enter your phone number first.");
            return;
        }
        try {
            const response = await sendOTP(formData.phoneNumber);
            console.log("OTP Sent:", response);
            setOtpSent(true);
            setError("");
        } catch (err) {
            console.error("Error sending OTP:", err);
            setError("Failed to send OTP. Try again.");
        }
    };
    const handleVerifyOTP = async () => {
        try {
            const response = await verifyOTP(formData.phoneNumber, otp);
            console.log("OTP Verified:", response);
            setIsVerified(true); 
            setSuccessMessage("OTP Verified Successfully!");
            setOtpSent(false);
        } catch (err) {
            console.error("OTP Verification Failed:", err);
            setError("Invalid OTP. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[500px] shadow-md bg-white rounded-lg">
                <div className="px-6 py-4 mt-4">
                    <form className="px-4 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
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
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                                id="phoneNumber"
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                disabled={isVerified} 
                            />
                             <div className="text-right mt-1">
                                {!isVerified ? (
                                    otpSent ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="mt-2 px-3 py-2 text-sm border rounded shadow w-full"
                                            />
                                              <button
                                                type="button"
                                                className="mt-2 w-full px-4 py-2 text-white bg-green-600 rounded"
                                                onClick={handleVerifyOTP}
                                            >
                                                Verify OTP
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                        onClick={handleSendOTP}
                                    >
                                        Generate OTP
                                    </button>
                                )
                            ) : (
                                <p className="text-green-600 font-bold text-sm">✅ Verified</p>
                            )}
                        </div>
                   
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
                                className="w-full px-4 py-2 font-bold text-white rounded-full bg-green-600"
                            >
                                Sign Up
                            </button>
                        </div>
                        <hr className="mb-6 border-t" />
                        <div className="text-center">
                            Already have an account?
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
