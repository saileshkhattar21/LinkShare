import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OTPverification = ({ setotpverified }) => {
  const [otp, setOTP] = useState("");

  const handleOTPSUBMIT = async (e) => {
    e.preventDefault();
    try {
      const email =
        location.state?.email || sessionStorage.getItem("resetEmail");

      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        otp: otp,
        email: email,
      });
      console.log(res.data.message);
      setotpverified(true);
      alert("OTP verified succesfully....Please enter new password");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
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
    </>
  );
};

const PasswordVerification = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordhelpertext, setPasswordHelperText] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordHelperText("Password and Confirm password should be same");
      return;
    }

    try {
      const email =
        location.state?.email || sessionStorage.getItem("resetEmail");
      const res = await axios.post("http://localhost:5000/api/auth/reset", {
        email: email,
        password: password,
      });

      console.log(res.data.message);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <h5 class="text-danger mb-2"> Please enter new password : </h5>
      <form onSubmit={handlePasswordSubmit}>
        <label class="form-label m-2">Password :</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label class="form-label m-2">Confirm Password :</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" class="btn btn-success mt-2 w-100">
          Verify
        </button>
        {passwordhelpertext ? (
          <small class="text-danger mt-2 mx-2">{passwordhelpertext}</small>
        ) : null}
      </form>
    </>
  );
};

export default function Forget() {
  const location = useLocation();
  console.log(location.state?.email);
  const [otpverified, setotpverified] = useState(false);

  return (
    <>
      <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div class="d-flex flex-column bg-light p-5 shadow-lg p-3 mb-5 bg-white rounded">
          {otpverified ? (
            <PasswordVerification />
          ) : (
            <OTPverification setotpverified={setotpverified} />
          )}
        </div>
      </div>
    </>
  );
}
