import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Forget() {
  const location = useLocation();
  const [otp, setOTP] = useState("");
  console.log(location.state?.email);
  const [otpverified, setotpverified] = useState(false);

  const handleOTPSUBMIT = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        otp: otp,
        email: location.state?.email,
      });
      HTMLFormControlsCollection.log(res.data.message);
      setotpverified(true);
      alert("OTP verified succesfully....Please enter new password");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div class="d-flex flex-column bg-light p-5 shadow-lg p-3 mb-5 bg-white rounded">
          <h5 class="text-danger mb-2"> Please enter OTP : </h5>
          <form onSubmit={handleOTPSUBMIT}>
            <label class="form-label m-2">
              OTP has been sent to your registered email
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="OTP"
              className="form-control mb-2"
              placeholder="Enter OTP"
              onChange={(e) => setOTP(e.target.value)}
            />
            <button type="submit" class="btn btn-success mt-2 w-100">
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
