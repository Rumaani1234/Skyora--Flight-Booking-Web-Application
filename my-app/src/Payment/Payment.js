import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [redirectToAadhar, setRedirectToAadhar] = useState(false);

  //  Always run this hook, logic inside
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  // Destructure safely with fallback values
  const {
    from = "",
    to = "",
    date = "",
    class: travelClass = "",
    price = "",
    airline = "",
    flightNumber = "",
    departureTime = "",
    arrivalTime = "",
    duration = "",
  } = location.state || {};

  const baseFare = 40;
const insurance = 50;
const otherCharges = 100;
const basePrice = Number(price) || 0;
const finalAmount = basePrice + baseFare + insurance + otherCharges;

  //  Redirect after payment
  useEffect(() => {
    if (redirectToAadhar && location.state) {
      navigate("/booking-confirmation", {
        state: {
          from,
          to,
          date,
          class: travelClass,
          price,
          airline,
          flightNumber,
          departureTime,
          arrivalTime,
          duration,
        },
      });
    }
  }, [
    redirectToAadhar,
    navigate,
    location.state,
    from,
    to,
    date,
    travelClass,
    price,
    airline,
    flightNumber,
    departureTime,
    arrivalTime,
    duration,
  ]);

  const handleIconClick = (method) => {
    setSelectedMethod(method);
    setAmount("");
    setPassword("");
    setModalOpen(true);
  };

  const handlePayment = () => {
    if (!amount || !password) {
      alert("Please enter both amount and password.");
      return;
    }

    setPopupData({
      date,
      fare: travelClass,
      
      price: finalAmount,

    });
    setShowPopup(true);
    setModalOpen(false);
  };

  
  const handlePopupOK = () => {
  const bookingData = {
    fromCity: from,
    toCity: to,
    bookingDate: date,
    travelClass: travelClass,
    duration: duration,
    flightNumber: flightNumber,
    seatNumber: "To Be Assigned",
    totalPassengers: 1,
    passengers: [{ firstName: "Test", lastName: "User" }],
    totalPrice: finalAmount, //  actual amount with all charges
    firstName: "Test",
  };

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  setShowPopup(false);
  setRedirectToAadhar(true);
};


  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2 className="payment-title">✈️ Confirm & Pay</h2>

        <div className="flight-info">
          <img src="/assets/airIndia.jpg" alt="Flight" className="flight-img-oval" />
          <div className="flight-details">
            <p>✈️ {airline} ({flightNumber})</p>
            <p>📍 {from} ➞ {to}</p>
            <p>🛫 Departure: <strong>{departureTime}</strong></p>
            <p>🛬 Arrival: <strong>{arrivalTime}</strong></p>
            <p>🕓 Duration: <strong>{duration}</strong></p>
            <p>📅 Date: <strong>{date}</strong></p>
            <p>🎟️ Class: <strong>{travelClass}</strong></p>
          </div>
        </div>

        <div className="amount-section">
          <h3>Total Amount: ₹{finalAmount}</h3>

        </div>

        <div className="payment-methods">
          <h4>Select Payment Method:</h4>
          <div className="methods">
            <div className="icon-btn" onClick={() => handleIconClick("Paytm")}>
              <span className="custom-icon paytm-icon">₹</span> Paytm
            </div>
            <div className="icon-btn" onClick={() => handleIconClick("GooglePay")}>
              <span className="custom-icon gpay-icon">G</span> Google Pay
            </div>
            <div className="icon-btn" onClick={() => handleIconClick("PhonePe")}>
              <span className="custom-icon phonepe-icon">P</span> PhonePe
            </div>
            <div className="icon-btn" onClick={() => handleIconClick("Debit Card")}>
              <span className="custom-icon debit-icon">💳</span> Debit Card
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{selectedMethod} Payment</h3>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter UPI Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handlePayment}>Pay Now</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showPopup && popupData && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>✅ Ticket Booked!</h3>
            <p>
              🗓️ Date: {popupData.date}<br />
              🌐 Fare: {popupData.fare}<br />
              💲 Price: ₹{popupData.price}
            </p>
            <button onClick={handlePopupOK}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
