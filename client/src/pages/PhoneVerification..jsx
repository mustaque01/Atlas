import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

const PhoneVerification = () => {
  const navigate = useNavigate(); 
  useEffect(() => {
    const configuration = {
      widgetId: "356263666154323437313839",
      tokenAuth: "440416Tf26F8pNlm67a05d65P1",
      identifier: "", 
      exposeMethods: false, 
      success: (data) => {
        console.log('Success response:', data);
        navigate("/signup");
      },
      failure: (error) => {
        console.log('Failure reason:', error);
      },
    };

    const script = document.createElement('script');
    script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
    script.async = true; 
    script.onload = () => {
      if (typeof initSendOTP === 'function') { 
        initSendOTP(configuration);
      } else {
        console.error("initSendOTP function is not defined. Script likely failed to load.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load the OTP provider script.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]); 

  return (
    <div>
     
    </div>
  );
};

export default PhoneVerification;
