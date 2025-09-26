import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, sendOTP, verifyOTP } from '@/routes/Auth';
import { 
    Eye, 
    EyeOff, 
    Phone, 
    Mail, 
    User, 
    Lock, 
    Shield, 
    CheckCircle,
    ArrowRight,
    AlertCircle,
    Loader2
} from 'lucide-react';

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
    const [isOtpLoading, setIsOtpLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [otpTimer, setOtpTimer] = useState(0);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setError(""); // Clear error on input change
        
        // Clear field-specific error
        if (fieldErrors[id]) {
            setFieldErrors({ ...fieldErrors, [id]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid 10-digit Indian phone number';
        }
        
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSendOTP = async () => {
        if (!formData.phoneNumber.trim()) {
            setFieldErrors({ phoneNumber: 'Phone number is required' });
            return;
        }
        
        if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
            setFieldErrors({ phoneNumber: 'Please enter a valid 10-digit Indian phone number' });
            return;
        }

        setIsOtpLoading(true);
        setError("");
        
        try {
            const response = await sendOTP({ phoneNumber: formData.phoneNumber });
            console.log("OTP sent:", response);
            setOtpSent(true);
            setSuccessMessage("OTP sent successfully to your phone!");
            
            // Start countdown timer
            setOtpTimer(60);
            const timer = setInterval(() => {
                setOtpTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
        } catch (error) {
            console.error("OTP send failed:", error);
            setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setIsOtpLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp.trim()) {
            setError('Please enter the OTP');
            return;
        }

        setIsOtpLoading(true);
        setError("");
        
        try {
            const response = await verifyOTP({ phoneNumber: formData.phoneNumber, otp });
            console.log("OTP verified:", response);
            setIsVerified(true);
            setSuccessMessage("Phone number verified successfully!");
            
        } catch (error) {
            console.error("OTP verification failed:", error);
            setError(error.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setIsOtpLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
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
            setError(error.response?.data?.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join Atlas Loan for smart financial solutions</p>
                </div>

                {/* Form */}
                <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl border border-zinc-700 p-8 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-zinc-800/50 border ${fieldErrors.firstName ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all`}
                                        placeholder="John"
                                    />
                                </div>
                                {fieldErrors.firstName && (
                                    <p className="text-red-400 text-sm mt-1">{fieldErrors.firstName}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-zinc-800/50 border ${fieldErrors.lastName ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all`}
                                        placeholder="Doe"
                                    />
                                </div>
                                {fieldErrors.lastName && (
                                    <p className="text-red-400 text-sm mt-1">{fieldErrors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-zinc-800/50 border ${fieldErrors.email ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all`}
                                    placeholder="john@example.com"
                                />
                            </div>
                            {fieldErrors.email && (
                                <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
                            )}
                        </div>

                        {/* Phone Number with OTP */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-zinc-800/50 border ${fieldErrors.phoneNumber ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all`}
                                        placeholder="9876543210"
                                        maxLength="10"
                                    />
                                    {isVerified && (
                                        <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    disabled={isOtpLoading || otpTimer > 0 || isVerified}
                                    className="px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
                                >
                                    {isOtpLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : otpTimer > 0 ? (
                                        `${otpTimer}s`
                                    ) : isVerified ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        'Send OTP'
                                    )}
                                </button>
                            </div>
                            {fieldErrors.phoneNumber && (
                                <p className="text-red-400 text-sm mt-1">{fieldErrors.phoneNumber}</p>
                            )}
                        </div>

                        {/* OTP Verification */}
                        {otpSent && !isVerified && (
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                                    Enter OTP
                                </label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all"
                                            placeholder="123456"
                                            maxLength="6"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleVerifyOTP}
                                        disabled={isOtpLoading || !otp.trim()}
                                        className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {isOtpLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            'Verify'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-12 py-3 bg-zinc-800/50 border ${fieldErrors.password ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-12 py-3 bg-zinc-800/50 border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-zinc-600'} rounded-lg text-white placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {fieldErrors.confirmPassword && (
                                    <p className="text-red-400 text-sm mt-1">{fieldErrors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {successMessage && (
                            <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <p className="text-green-400 text-sm">{successMessage}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !isVerified}
                            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-rose-500/20"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-rose-500 hover:text-rose-400 font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;