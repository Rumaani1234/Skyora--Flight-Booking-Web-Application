import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import PopupModal from "../PopUp/PopupModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("loginStatusChanged"));
    alert("Logged out successfully!");
    navigate("/signin");
  };

  
  const handleProtectedClick = (path, e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav__logo">Skyora</div>

      <ul className="nav__links">
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/about">About</Link></li>
        <li className="link" onClick={(e) => handleProtectedClick("/booking", e)}>Booking</li>
        <li className="link" onClick={(e) => handleProtectedClick("/booking-confirmation", e)}>Confirmation</li>
        <li className="link" onClick={(e) => handleProtectedClick("/destinations", e)}>Destinations</li>
      </ul>

      <div className="signup-btn-container">
        <Link to="/signup">
          <button className="btn">Sign up</button>
        </Link>

        {isLoggedIn && (
          <button className="btn" onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        )}
      </div>

      {showPopup && (
        <PopupModal
          message=" 🔐 Please sign up first. If you're already registered, please log in."
          onClose={() => setShowPopup(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
