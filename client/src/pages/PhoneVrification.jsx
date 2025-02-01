import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [resendTimeout, setResendTimeout] = useState(0);

  useEffect(() => {
    // Cleanup reCAPTCHA when component unmounts
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // Handle resend timeout countdown
  useEffect(() => {
    if (resendTimeout > 0) {
      const timer = setInterval(() => {
        setResendTimeout(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimeout]);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("Captcha verified");
        },
        "expired-callback": () => {
          toast.error("reCAPTCHA expired. Please try again.");
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        },
      }
    );
  };

  const onSignup = async () => {
    try {
      if (!ph) {
        toast.error("Please enter a phone number");
        return;
      }

      if (resendTimeout > 0) {
        toast.error(`Please wait ${resendTimeout} seconds before requesting another OTP`);
        return;
      }

      setLoading(true);
      setupRecaptcha();

      const formatPh = `+${ph}`;
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowOTP(true);
      setResendTimeout(60); // Set 60 seconds timeout for resend
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      
      if (error.code === 'auth/too-many-requests') {
        toast.error("Too many requests. Please try again after some time.");
        setResendTimeout(300); // Set 5 minutes timeout
      } else if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number. Please check the number and try again.");
      } else {
        toast.error(error.message || "Failed to send OTP");
      }

      // Cleanup reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const onOTPVerify = async () => {
    try {
      if (!otp) {
        toast.error("Please enter OTP");
        return;
      }

      setLoading(true);
      const result = await window.confirmationResult.confirm(otp);
      setUser(result.user);
      toast.success("Phone number verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍 Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-2 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to Atlas
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  inputType="number"
                  containerStyle="opt-container"
                  inputStyle="otp-input"
                  shouldAutoFocus
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  disabled={loading || !otp}
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="phone"
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput
                  country="in"
                  value={ph}
                  onChange={setPh}
                  inputProps={{
                    id: "phone",
                    required: true,
                  }}
                />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  disabled={loading || resendTimeout > 0}
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>
                    {resendTimeout > 0 
                      ? `Resend OTP in ${resendTimeout}s` 
                      : "Send Verification code"}
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;