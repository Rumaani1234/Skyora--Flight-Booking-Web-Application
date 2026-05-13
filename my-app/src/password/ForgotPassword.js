// ForgotPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Signup.css"; // same CSS as SignIn/SignUp

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/reset-password", { state: { email } });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h2>Forgot Your Password?</h2>
        <p>Don't worry! Enter your registered email to reset it.</p>
      </div>

      <div className="signup-right">
        <h3>Recover Account</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Next</button>
        </form>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
          You will be redirected to reset your password.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
