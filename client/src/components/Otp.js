import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function App() {
  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [step, setStep] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  const handleSendOtp = async () => {
    const requestData = {
      channel: "beans",
      phone: mobileNumber,
      cus_id: 1234,
    };
    try {
      const response = await fetch(
        "https://k19w0lom7j.execute-api.ap-south-1.amazonaws.com/dev/otp/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const verifycode = await response.json();
        console.log("Received OTP:", verifycode);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setStep(2);
  };

  const handleSignIn = async () => {
    const requestData = {
      channel: "beans",
      phone: mobileNumber,
      cus_id: 1234,
      otp: otp, // Use the entered OTP from the state
    };

    try {
      const response = await fetch(
        "https://k19w0lom7j.execute-api.ap-south-1.amazonaws.com/dev/otp/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const confirmcode = await response.json();
        // The OTP verification was successful
        console.log("OTP Verification Successful", confirmcode);
        setCookie("beansphone", mobileNumber);
        navigate("/");
      } else {
        // The OTP verification failed
        console.log("OTP Verification Failed");
      }
    } catch (error) {
      console.error("An error occurred during OTP verification:", error);
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className=" form-container bg-white  rounded-3 p-5">
        <form>
          {step === 1 && (
            <div>
              <h3 className="text-dark text-center fw-bold">
                OTP Verification
              </h3>
              <div className="mb-2">
                <label htmlFor="number">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter Number"
                  className="form-control p-3 rounded-5"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <div className="d-flex justify-content-center mt-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={handleSendOtp}
                  >
                    Send Otp
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-dark text-center fw-bold mb-5">
                OTP Verification
              </h3>
              <div className="d-flex justify-content-center align-items-center mb-1">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "40px",
                    height: "40px",
                    fontSize: "16px",
                    margin: "4px",
                  }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={handleSignIn}
              >
                Verify Otp
              </button>
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={handleSendOtp}
              >
                Resend Otp
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
