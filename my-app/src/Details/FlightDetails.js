import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FlightDetails.css";

const FlightDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state?.flight;

  const Conveniencefees = 40;
  const SeatSelection = 100;
  const ExcessBaggage = 50;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showSeatDetails, setShowSeatDetails] = useState(false);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedBookingDay");

    if (storedDate) {
      const parsedDate = JSON.parse(storedDate);

      const normalized = {
        day: parsedDate.day || "Selected Day",
        date: parsedDate.date,
        booked: parsedDate.bookedSeatList || parsedDate.booked || [],
      };

      setSelectedDate(normalized);
      setBookedSeats(normalized.booked);
      setShowSeatDetails(true);
    }
  }, []);

  if (!flight) return <h2>No flight data found</h2>;

  const from = flight.departure?.city || "Unknown";
  const to = flight.arrival?.city || "Unknown";

  const fareOptions = {
    cheapest: {
      label: "CHEAPEST",
      basePrice: flight.classStatus.economy.price.amount,
      totalPrice:
        flight.classStatus.economy.price.amount +
        Conveniencefees +
        SeatSelection +
        ExcessBaggage,
    },

    nonstop: {
      label: "NON STOP FIRST",
      basePrice: flight.classStatus.economy.price.amount + 300,
      totalPrice:
        flight.classStatus.economy.price.amount +
        300 +
        Conveniencefees +
        SeatSelection +
        ExcessBaggage,
    },

    preferred: {
      label: "YOU MAY PREFER",
      basePrice: flight.classStatus.economy.price.amount + 500,
      totalPrice:
        flight.classStatus.economy.price.amount +
        500 +
        Conveniencefees +
        SeatSelection +
        ExcessBaggage,
    },
  };

  const day = [
    {
      day: "Monday",
      date: "01 Jul",
      booked: ["A1", "A2", "B1", "C2", "C3", "A3", "B2", "B4"],
    },
    {
      day: "Tuesday",
      date: "02 Jul",
      booked: ["A2", "B3", "C1", "C4", "B1"],
    },
    {
      day: "Wednesday",
      date: "03 Jul",
      booked: ["A1", "A3", "B2", "B3", "C2", "C3"],
    },
    {
      day: "Thursday",
      date: "04 Jul",
      booked: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
    },
    {
      day: "Friday",
      date: "05 Jul",
      booked: [
        "A1",
        "A2",
        "A3",
        "A4",
        "B1",
        "B2",
        "B3",
        "B4",
        "C1",
        "C2",
        "C3",
        "C4",
      ],
    },
    {
      day: "Saturday",
      date: "06 Jul",
      booked: ["A1", "B2", "C3"],
    },
    {
      day: "Sunday",
      date: "07 Jul",
      booked: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
    },
  ];

  const allSeats = [
    "A1", "A2", "A3", "A4",
    "B1", "B2", "B3", "B4",
    "C1", "C2", "C3", "C4"
  ];

  const handleSeatClick = (item) => {
    if (selectedDate?.day === item.day) {
      setSelectedDate(null);
      setBookedSeats([]);
      setShowSeatDetails(false);
    } else {
      setSelectedDate(item);
      setBookedSeats(item.booked);
      setShowSeatDetails(true);
    }
  };

  const scrollSlider = (direction) => {
    const slider = document.getElementById("seatSlider");
    const scrollAmount = 150;

    if (slider) {
      slider.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="boarding-pass">
      <div className="ticket">

        {/* Header */}
        <div className="ticket-header">
          <div className="left-blue">Flight Details</div>
          <div className="right-blue">
            {from.toUpperCase()} ✈️ {to.toUpperCase()}
          </div>
        </div>

        {/* Flight Details */}
        <div className="ticket-body">
          <div className="ticket-left">

            <div className="price-category-container">
              {Object.keys(fareOptions).map((key) => (
                <div
                  key={key}
                  className={`price-box ${key} ${
                    selectedFare === key ? "selected-fare" : ""
                  }`}
                  onClick={() => setSelectedFare(key)}
                >
                  <div className="price-tag">
                    ₹ {fareOptions[key].totalPrice}
                  </div>

                  <div className="label">
                    {fareOptions[key].label}
                  </div>

                  <div className="duration">
                    {flight.duration}
                  </div>

                  <div className="fare-breakdown">
                    <small>Convenience fees: ₹40</small>
                    <br />
                    <small>+ Seat Selection: ₹100</small>
                    <br />
                    <small>+ Excess baggage: ₹50</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="route-info">
              <div className="city-name">{from}</div>
              <div className="center-dash">
                ----------- {flight.duration} -----------
              </div>
              <div className="city-name">{to}</div>
            </div>

            <div className="info-row">
              <div>
                <strong>Flight No:</strong> {flight.flightNumber}
              </div>

              <div>
                <strong>Time:</strong> {flight.departure.time} - {flight.arrival.time}
              </div>

              <div>
                <strong>Class:</strong> {flight.classStatus.economy.class}
              </div>

              <div>
                <strong>Rating:</strong> ⭐ {flight.rating}
              </div>
            </div>

            <div className="flight-meta-row">
              <div className="meta-left">
                <div className="route-title">
                  ✈️ {flight.airline} - {from} to {to}
                </div>

                <div className="timing">
                  Departure: <strong>{flight.departure.time}</strong> |
                  Arrival: <strong>{flight.arrival.time}</strong> |
                  Duration: <strong>{flight.duration}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="image-align-right">
            <img
              src={flight.image}
              alt={flight.airline || "Flight"}
              className="flight-image"
            />
          </div>
        </div>

        {/* Flight Timing */}
        <div className="flight-timing-row">
          <span>Departure: {flight.departure.time}</span>
          <span>Arrival: {flight.arrival.time}</span>
          <span>Duration: {flight.duration}</span>

          <div className="line-with-label">
            <div className="horizontal-line"></div>
            <span className="nonstop-label">Non Stop</span>
          </div>
        </div>

        {/* Seat Slider */}
        <div className="seat-slider-wrapper">
          <button
            className="arrow-btn"
            onClick={() => scrollSlider("left")}
          >
            &lt;
          </button>

          <div className="seat-slider" id="seatSlider">
            {day.map((item, index) => {
              const totalSeats = 12;
              const booked = item.booked.length;
              const available = totalSeats - booked;

              return (
                <div
                  key={index}
                  className={`seat-box ${
                    selectedDate?.day === item.day ? "selected" : ""
                  }`}
                  onClick={() => handleSeatClick(item)}
                >
                  <div className="seat-date">{item.date}</div>

                  <div className="seat-info">
                    <span>Total: {totalSeats}</span>
                    <span>Booked: {booked}</span>
                    <span>
                      {available > 0
                        ? `Available: ${available}`
                        : "❌ No Seat"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="arrow-btn"
            onClick={() => scrollSlider("right")}
          >
            &gt;
          </button>
        </div>

        {/* Seat Details */}
        {showSeatDetails && (
          <div className="seat-detail-box">
            <h4>Seats for {selectedDate?.date}</h4>

            <div className="seat-list">
              {allSeats.map((seat, idx) => (
                <div
                  key={idx}
                  className={`seat-label ${
                    bookedSeats.includes(seat)
                      ? "booked"
                      : "available"
                  }`}
                >
                  {seat}
                  {bookedSeats.includes(seat) && (
                    <span className="cross">❌</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="terms-conditions">
          <h4>Terms & Conditions</h4>
   <ul>
          <li>✔️ Tickets once booked are non-transferable and non-refundable beyond the cancellation window.</li>
          <li>⏰ Check-in closes 45 minutes prior to the flight departure time. Late arrivals may not be allowed to board.</li>
      <li>🪪 All passengers must carry a valid government-issued photo ID at the time of check-in.</li>
         <li>💼 Baggage Allowance:
           <ul>
          <li>Cabin Baggage: Maximum 7 kg (1 piece only)</li>
              <li>Checked-in Baggage: Maximum 15 kg (extra charges may apply for additional weight)</li>
           </ul>
     </li>
        <li>🔁 Rescheduling is subject to availability and may attract fare differences and change fees.</li>
        <li>📧 E-tickets and itineraries will be sent via email upon successful booking confirmation.</li>
     <li>📵 Use of mobile phones is prohibited during take-off and landing. Switch to airplane mode.</li>
       <li>🧾 All fares shown are inclusive of applicable taxes and convenience charges unless stated otherwise.</li>          <li>🚫 No refund will be processed for no-shows or boarding denials due to late arrival or missing documents.</li>
           <li>🎫 Boarding pass and ID verification are mandatory at airport security and boarding gates.</li>
       <li>⚠️ Flight timings and aircraft models are subject to change based on operational requirements.</li>   <li>🚫 Dangerous goods, explosives, and flammable items are strictly prohibited in any baggage.</li>
             <li>😷 Passengers showing symptoms of contagious illness may be denied boarding at airline discretion.</li>
            <li>💳 Transactions are secured using encryption. We are not liable for third-party payment gateway failures.</li>
          </ul>
      </div>

        {/* Agree */}
        <div className="agree-terms">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agree">
            I agree to all Terms & Conditions
          </label>
        </div>

        {/* Book Button */}
        <div className="book-btn-wrapper">
          <button
            className="book-btn"
            disabled={!agreed}
            onClick={() => {
              const finalSelectedDate =
                selectedDate ||
                JSON.parse(
                  localStorage.getItem("selectedBookingDay")
                );

              if (!finalSelectedDate || !selectedFare) {
                alert("Please select a day and fare before booking.");
                return;
              }

              localStorage.removeItem("selectedBookingDay");

              navigate("/booking", {
                state: {
                  from,
                  to,
                  date: finalSelectedDate.date,
                  price: fareOptions[selectedFare].totalPrice,
                  class: flight.classStatus.economy.class,
                  departureTime: flight.departure.time,
                  arrivalTime: flight.arrival.time,
                  duration: flight.duration,
                  airline: flight.airline,
                  flightNumber: flight.flightNumber,
                },
              });
            }}
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlightDetails;