import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AadharVerification.css";

const AadharVerification = () => {
  const [digits, setDigits] = useState(Array(12).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputsRef = useRef([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!location.state || !location.state.aadharNo) {
      navigate("/");
    }
    // ❌ Aadhar pre-fill nahi karna
  }, [location.state, navigate]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updated = [...digits];
      updated[index] = value;
      setDigits(updated);

      if (value && index < 11) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const aadhar = digits.join("");

    if (!/^\d{12}$/.test(aadhar)) {
      setError("❌ Please enter a valid 12-digit Aadhar number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/verify-aadhar", {
        aadharNo: aadhar,
      });

      if (res.data.verified === true) {
        console.log("✅ Verified Aadhar in frontend");

        setTimeout(() => {
          setLoading(false);
          setVerified(true);

          setTimeout(() => {
            navigate("/payment", {
              state: location.state,
            });
          }, 2000);
        }, 3000);
      }
      else {
  setLoading(false);
  setError("❌ Aadhar number not found. Please check again.");
}

    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("❌ Aadhar verification failed. Try again.");
    }
  };

  return (
    <div className="aadhar-wrapper">
      <div className="left-box">
        <h3>Aadhar Card Validation</h3>
        <p>Please read and agree to the terms and conditions to proceed.</p>

        <div className="terms-content">
          <p>
            <strong>Note:</strong> Your Aadhar number is being used for identity verification only.
            By proceeding, you agree to the following:
          </p>
          <ul>
            <li>You consent to the use of your Aadhar number for verifying your identity related to flight booking.</li>
            <li>No data will be stored or misused in any form.</li>
            <li>This verification does not connect to the official UIDAI database.</li>
          </ul>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          I agree to the terms
        </label>
      </div>

      <div className="right-box">
        <h3>Enter your Aadhar Number</h3>
        <p>Enter 12-digit Aadhar number:</p>

        <div className="aadhar-inputs">
          {digits.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              ref={(el) => (inputsRef.current[i] = el)}
              className="aadhar-digit"
            />
          ))}
        </div>

        {error && <p className="error-msg">{error}</p>}

        {!loading && !verified && (
          <button
            className="verify-btn"
            onClick={handleVerify}
            disabled={!agreed}
            style={{ opacity: agreed ? 1 : 0.5 }}
          >
            Verify
          </button>
        )}

        {loading && <p className="loading-msg">🔄 Checking Aadhar validity...</p>}

        {verified && (
          <div className="success-box">
            <div className="tick">✔</div>
            <p className="success-msg">Successfully matched!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AadharVerification;

