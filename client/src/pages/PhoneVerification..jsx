import { useState } from "react";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage(`OTP sent successfully! Check the console.`);
        console.log(`OTP for ${phoneNumber}:`, data.otp); // OTP printed in console
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error sending OTP.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Phone Verification</h2>

      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <button
        onClick={sendOtp}
        disabled={otpSent}
        className="w-full px-3 py-2 bg-blue-600 text-white rounded mb-2"
      >
        {otpSent ? "OTP Sent" : "Verify Phone Number"}
      </button>

      {message && <p className="mt-2 text-sm text-center text-red-500">{message}</p>}
    </div>
  );
};

export default PhoneVerification;
