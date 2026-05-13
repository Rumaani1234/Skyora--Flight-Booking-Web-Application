import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [submitError, setSubmitError] = useState("");

  const validatePassword = (password) => {
    const lengthRegex = /.{7,}/;
    const upperRegex = /[A-Z]/;
    const lowerRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[^A-Za-z0-9]/;

    return (
      lengthRegex.test(password) &&
      upperRegex.test(password) &&
      lowerRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setSignInData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "password") {
      setSubmitError(""); // clear error while typing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(signInData.password)) {
      setSubmitError("Password mismatch");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInData.email,
          password: signInData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
window.dispatchEvent(new Event("loginStatusChanged")); // 👈 Required

        alert("Login successful!");
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h2>Welcome Back!</h2>
        <p>Sign in to manage your flight bookings easily</p>
      </div>

      <div className="signup-right">
        <h3>Sign in</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signInData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleChange}
            required
          />

          <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
            Password must contain at least 7 characters including uppercase, lowercase, digit, and special character.
          </p>

          {submitError && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{submitError}</p>
          )}

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={signInData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>

            <p style={{ textAlign: "right", marginTop: "5px" }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="signin-text">
          New to FlightToFly? <Link to="/signup">Sign up</Link>
        </div>

        <p className="recaptcha-notice">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
