import React from "react";
import "./FlightCards.css";
import flights from "../flights.json";
import { Link } from "react-router-dom"; // ✅ This is enough

const FlightCards = () => {
  return (
    <div className="flight-page">
      {flights.map((flight, index) => (
        <div className="flight-card" key={index}>
          <img src={flight.image} alt={flight.airline} className="flight-image" />

          <div className="flight-content">
            <div className="flight-airline">{flight.airline}</div>

            <div className="flight-block">
              <div className="flight-block-title">From</div>
              <div className="flight-block-value">{flight.departure.city}</div>
            </div>

            <div className="flight-block">
              <div className="flight-block-title">To</div>
              <div className="flight-block-value">{flight.arrival.city}</div>
            </div>

            <div className="flight-block">
              <div className="flight-block-title">Time</div>
              <div className="flight-block-value">
                {flight.departure.time} - {flight.arrival.time}
              </div>
            </div>

            <div className="flight-block">
              <div className="flight-block-title">Class</div>
              <div className="flight-block-value">
                {flight.classStatus.economy.class}
              </div>
            </div>

            <div className="flight-block">
              <div className="flight-block-title">Price</div>
              <div className="flight-block-value">
                ₹{flight.classStatus.economy.price.amount}
              </div>
            </div>

            <div className="flight-block">
              <div className="flight-block-title">Rating</div>
              <div className="flight-block-value">⭐ {flight.rating}</div>
            </div>
          </div>

          <div className="flight-action">
            <Link to="/booking" className="book-btn">Book</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightCards;
