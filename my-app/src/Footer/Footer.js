// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Brand Section */}
        <div className="footer__section brand">
          <h2>Skyora</h2>
          <p>
            From bookings to real-time flight details and secure payments,
            Flivan makes your journey smoother and smarter. Your comfort is our priority.
          </p>
        </div>

        {/* About Section */}
        <div className="footer__section">
          <h3>ABOUT</h3>
          <p>
            Flivan is a modern flight booking platform that offers verified flights,
            quick booking, secure payment, and helpful support — all in one place.
          </p>
        </div>

        {/* Explore Section */}
        <div className="footer__section">
          <h3>EXPLORE</h3>
          <ul>
            <li>Home</li>
            <li>Flight Cards</li>
            <li>Destinations</li>
            <li>Flight Details</li>
          </ul>
        </div>

        {/* Booking Section */}
        <div className="footer__section">
          <h3>BOOKING</h3>
          <ul>
            <li>Flight Booking</li>
            <li>Booking Confirmation</li>
            <li>Payment</li>
            <li>Offers</li>
            <li>Seats</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer__section">
          <h3>CONTACT</h3>
          <ul>
            <li>Email: support@flivan.com</li>
            <li>Location: Bhopal, Madhya Pradesh, India</li>
            <li>
              <a
                href="https://www.facebook.com/flivan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/flivan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Flivan Airlines. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
