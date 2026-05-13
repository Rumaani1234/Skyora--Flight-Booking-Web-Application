import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Register/Signup.css"; // 🔁 Reusing signup styling

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successful!");
      } else {
        setMessage(data.message || "❌ Reset failed.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h2>Secure Your Account</h2>
        <p>Update your password and continue booking your flights smoothly!</p>
      </div>

      <div className="signup-right">
        <h3>Reset Password</h3>
        <p style={{ fontSize: "13px", marginBottom: "10px" }}>Email: <strong>{email}</strong></p>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p style={{ fontSize: "12px", color: "#555", marginTop: "-8px" }}>
            Password must be strong (Uppercase, lowercase, number & symbol)
          </p>

          <button type="submit">Reset Password</button>
        </form>

        {message && (
          <p style={{ marginTop: "10px", fontSize: "14px", color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
