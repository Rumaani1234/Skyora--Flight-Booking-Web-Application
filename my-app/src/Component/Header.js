
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import PopupModal from "../PopUp/PopupModal"; 

const Header = () => {
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

  const handleSearchFlightsClick = () => {
    if (!isLoggedIn) {
      setShowPopup(true); 
    } else {
      navigate("/flight-lists"); 
    }
  };

  return (
    <>
      
      <header className="section__container header__container">
        <div className="header__left">
          <h1 className="section__header">
            Your Ticket to<br />Explore the World
          </h1>
          <p className="section__description">
            Discover the world at your fingertips. Explore <br />beautiful destinations with comfort and care.<br />
            Explore beautiful places near and far. <br /> Fly with comfort, safety, and ease. 
               Because your <br />  travel should be as amazing as your destination.
          </p>
          <button className="explore-btn" onClick={handleSearchFlightsClick}>
            Search Flights
          </button>
        </div>

        <div className="header__right">
          <img src="/assets/header.jpg" alt="header" />
        </div>
      </header>
      <section className="section-container">
        <p className="section-subheader">TRAVEL SUPPORT</p>
        <h2 className="section-header">Plan your travel with confidence</h2>
        <p className="section-description">
          Need help planning your next adventure? From bookings to travel tips — we’ve got you covered at every step.
        </p>

        <div className="plan-flex-wrapper">
          <div className="plan-grid">
            <div className="plan-item">
              <span className="plan-number">01</span>
              <h4>Flexible Travel Insurance</h4>
              <p>Enjoy peace of mind with travel insurance that covers unexpected changes, delays, and emergencies — so you can explore worry-free.</p>
            </div>

            <div className="plan-item">
              <span className="plan-number">02</span>
              <h4>Requirements by Destination</h4>
              <p>Whether it’s the mountains or the beach — find updated travel requirements and prepare smoothly for your dream destination.</p>
            </div>
          </div>

          <div className="plan-image">
            <img src="/assets/download.jpg" alt="Flight" />
          </div>
        </div>
      </section>

      
      {showPopup && (
        <PopupModal
          message="🔐 Please sign up first. If you're already registered, please log in."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Header;


