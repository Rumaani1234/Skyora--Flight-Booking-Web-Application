import React, { useEffect, useState } from "react";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [passengerSummary, setPassengerSummary] = useState([]);

console.log("🎯 Confirmation Page passengers:", bookingData.passengers);

  useEffect(() => {
    const storedName = localStorage.getItem("passengerName");
    if (storedName) {
      setName(JSON.parse(storedName));
    }

    const summary = localStorage.getItem("passengerSummary");
if (summary) {
  setPassengerSummary(JSON.parse(summary));
}


    
    return () => {
      localStorage.removeItem("passengerName");
    };
  }, []);

  if (!bookingData) {
    return <h2>No booking found!</h2>;
  }

  const from = bookingData.fromCity;
  const to = bookingData.toCity;
  const seat = bookingData.seatNumber;
  const date = bookingData.bookingDate;
  const classType = bookingData.travelClass;
  const duration = bookingData.duration;
  const flightNumber = bookingData.flightNumber;
  const total = bookingData.totalPrice;
  

  return (
    <div className="confirmation-container">
      <div className="content-box">
        <div className="header">
          <h2>Thank you for booking with Cleartrip</h2>
        </div>

        <div className="confirmation-header">
          <h1>Flight confirmed</h1>
          <div className="cleartrip-logo">
            <span className="tick-icon">✔️ Skyora</span>
          </div>
        </div>

        {/*  Show full name after confirmation */}
        <p className="greeting">Hi {name.firstName} {name.lastName}</p>
        <p>
          Your {from} - {to} one-way flight is confirmed. <br />
          We will email your ticket shortly.
        </p>

        <div className="booking-reference">
          <p>
            Your booking reference number is{" "}
            <span className="link-text">S1207240047.</span> Kindly use this reference number
            for any communication with us.
          </p>
        </div>

        <div className="insurance-box">
          <p><strong>Disclaimer</strong></p>
          <p>
            Special requests like seat preferences and meal selections are not guaranteed.
            Kindly confirm directly with your airline.
          </p>
        </div>

        <div className="booking-details">
          <div className="white-box">
            <h3>👤 Traveller Journey Details</h3>
            
            <p><span className="highlight-label">Total Passengers:</span> {passengerSummary.length}</p>
            <p><span className="highlight-label">From:</span> {from}</p>
            <p><span className="highlight-label">To:</span> {to}</p>
            <p><span className="highlight-label">Date:</span> {date}</p>
            <p><span className="highlight-label">Duration:</span> {duration}</p>
            <p><span className="highlight-label">Flight Number:</span> {flightNumber}</p>
            <p><span className="highlight-label">Seat:</span> {seat}</p>
            <p><span className="highlight-label">Class:</span> {classType}</p>
          </div>

          <div className="payment-info">
            <p className="receipt-heading">PAYMENT RECEIPT</p>
            <img src="/assets/paytm.jpg" alt="Paytm" className="card-logo" />
            <p className="card-number">5123 45xx xxxx 2346</p>
            <p className="total-charge">
              TOTAL CHARGE<br /><strong>Rs. {total}</strong>
            </p>
            <div className="fare-breakup">
              <p>Convenience fees: <span>Rs. 40</span></p>
              <p>Seat Selection: <span>Rs. 100</span></p>
              <p>Excess Baggage: <span>Rs. 50</span></p>
              <hr />
              <p>Total: <strong>Rs. {total}</strong></p>
            </div>
          </div>
        </div>

        {/* ✅ Updated Travellers Section */}
        <div className="travellers">
          <p><strong>Travellers</strong></p>
          <div className="traveller-details-heading">
            <span>Name</span>
            <span>Date of Birth</span>
            <span>Charge</span>
          </div>

        
         {/* {passengerSummary.map((p, i) => (
  <div key={i} className="traveller-details-row">
    <span>👤 {p.name}</span>
    <span>{p.dob || "N/A"}</span>
    <span>₹ {total}</span>
  </div>
))}
</div> */}
{passengerSummary.map((p, i) => (
  <div key={i} className="traveller-details-row">
    { <span>
      {p.gender === "female" ? "👦" : "👧"} {p.name}
    </span> }
  
<span>{p.dob || "N/A"}</span>
    <span>₹ {total}</span>
  </div>
))}
</div>


        <footer>
          <p className="footer-note">© 2006–2025 Cleartrip Private Limited</p>
        </footer>
      </div>
    </div>
  );
};

export default BookingConfirmation;










