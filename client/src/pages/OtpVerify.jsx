import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "@/routes/Auth";

const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const phoneNumber = location.state?.phoneNumber || "";

    const handleVerifyOTP = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }

        try {
            const response = await verifyOTP(phoneNumber, otp);
            console.log("OTP Verified:", response);
            alert("OTP Verified Successfully!");

            // Navigate to dashboard or next step
            navigate("/dashboard");
        } catch (error) {
            console.error("OTP verification failed:", error);
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[400px] shadow-md bg-white rounded-lg">
                <div className="px-6 py-4 mt-4">
                    <h2 className="text-lg font-bold text-center text-gray-700">Enter OTP</h2>
                    <p className="text-center text-gray-500 text-sm mb-4">OTP sent to {phoneNumber}</p>

                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="otp">
                            OTP
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:ring-1 focus:ring-green-500"
                            id="otp"
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6 text-center">
                        <button
                            type="button"
                            className="w-full px-4 py-2 font-bold text-white rounded-full bg-green-600"
                            onClick={handleVerifyOTP}
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
