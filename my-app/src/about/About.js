import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Flight Booking Portal</h1>

      <section className="about-section">
        <h2>🛫 Project Overview</h2>
        <p>
          This is a modern flight booking website designed to simplify your travel experience.
          Users can explore flight options, compare fares, check detailed flight information,
          and securely book their seats—all in one place.
        </p>
      </section>

      <section className="about-section">
        <h2>💡 Key Features</h2>
        <ul>
          <li><strong>Flight Search:</strong> Users can search flights using departure and arrival cities with real-time filtering from JSON data.</li>
          <li><strong>Flight Listing:</strong> A neat list of available flights with timings, prices, classes, and airline details.</li>
          <li><strong>Detailed Flight Info:</strong> Includes baggage rules, fare categories (Cheapest, Flexible, etc.), airline info, and more.</li>
          <li><strong>Seat Booking System:</strong> Interactive layout to choose your seat before booking.</li>
          <li><strong>Fare Selection:</strong> Users can select from different fare options like economy, premium, and business.</li>
          <li><strong>Authentication:</strong> Login & Signup pages with form validation.</li>
          <li><strong>Booking Confirmation:</strong> Shows full details of booked flight after successful reservation.</li>
          <li><strong>Forget Password & Reset Password:</strong> Secure system for recovering and resetting login credentials.</li>
          <li><strong>Dynamic Seat Booking:</strong> Seats update based on user selections and previous bookings.</li>
          <li><strong>Map Integration:</strong> Integrated maps to show airport locations or directions.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🔧 Tech Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> ReactJS, CSS3</li>
          <li><strong>Routing:</strong> React Router</li>
          <li><strong>Data Handling:</strong> JSON-based flight data</li>
          <li><strong>UI:</strong> Clean, responsive layout with custom styling</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB (Atlas)</li>
          <li><strong>Full Stack:</strong> MERN Stack (MongoDB, Express, React, Node)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🚀 Future Enhancements</h2>
        <ul>
          <li>Payment Gateway Integration</li>
          <li>Filter by Airlines, Duration, Stops</li>
          <li>Admin Panel for adding/removing flights</li>
          <li>Flight status updates (real-time)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>📞 Contact</h2>
        <p><strong>Email:</strong> <a href="mailto:support@flightbooking.com">support@flightbooking.com</a></p>
        <p><strong>Location:</strong> Bhopal, Madhya Pradesh, India</p>
        <p><strong>Working Hours:</strong> Monday to Saturday — 9:00 AM to 7:00 PM</p>

        <div className="social-links">
          <p><strong>Follow us on:</strong></p>
          <ul>
            <li>
              Facebook:{" "}
              <a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer">
                www.facebook.com/YourPage
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a href="https://www.instagram.com/YourProfile" target="_blank" rel="noopener noreferrer">
                www.instagram.com/YourProfile
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
