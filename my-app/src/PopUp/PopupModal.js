import React from "react";
import "./PopupModal.css";

const PopupModal = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{message}</h3>
        <div className="popup-buttons">
          <button onClick={() => window.location.href = "/signup"}>Sign Up</button>
          <button onClick={() => window.location.href = "/signin"}>Log In</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
