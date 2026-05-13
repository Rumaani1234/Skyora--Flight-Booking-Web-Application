import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
const [passwordError, setPasswordError] = useState("");
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
  };const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
if (name === "password") {
      if (!validatePassword(value)) {
        setPasswordError(
          "Password must contain at least 7 characters including uppercase, lowercase, digit, and special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };const handleSubmit = async (e) => {
    e.preventDefault();
if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must contain at least 7 characters including uppercase, lowercase, digit, and special character."
      );
      return;
    }
try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
const data = await response.json();
if (response.ok) {
        alert("Signup successful!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
return (
    <div className="signup-container">
      <div className="signup-left">
        <h2>Looks like you're new here!</h2>
        <p>Sign up with your email address to get started</p>
      </div>
      <div className="signup-right">
        <h3>Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <small style={{ color: "red", fontSize: "12px" }}>{passwordError}</small>
          )}<p className="disclaimer">
            By continuing, you agree to FlightToFly’s{" "}
            <a href="/terms">Terms of Use</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
<button type="submit">Sign Up</button>
        </form>
<div className="signin-text">
          Existing User? <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

