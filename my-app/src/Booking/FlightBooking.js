import React, { useState } from "react";
import "./FlightBooking.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; //  New import added

const FlightBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalSeats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];
  const bookedSeats = ["A2", "B3"];
  const availableSeats = totalSeats.filter(seat => !bookedSeats.includes(seat));

  const [form, setForm] = useState({
    tripType: "one-way",
    bookingDate: "",
    returnDate: "",
    firstName: "",
    lastName: "",
    AadharNo: "",
    phone: "",
    address: "",
    email: "",
    flightNumber: "",
    fromCity: "",
    toCity: "",
    travelClass: "Economy",
    totalPassengers: 1,
    
    passengers: [{
  firstName: "",
  lastName: "",
  AadharNo: "",
  dob: "",
  from: "",
  to: "",
  seatNumber: "",
  gender: "male", // default gender
}],

  });

  const [seatInput, setSeatInput] = useState("");
  const [seatMessage, setSeatMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passengerLimitError, setPassengerLimitError] = useState(false);
  const [aadharError, setAadharError] = useState("");
  const [aadharAssignError, setAadharAssignError] = useState(""); // ✅ Show server validation error


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "AadharNo") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 12) {
        setForm({ ...form, [name]: digitsOnly });
        if (digitsOnly.length !== 12) {
          setAadharError("Aadhar number must be exactly 12 digits.");
        } else {
          setAadharError("");
        }
      }
    } else {
      setForm({ ...form, [name]: value });

      if (name === "email") {
        validateEmail(value);
      }
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!pattern.test(email));
  };

  const handlePassengerChange = (index, e) => {
    const newPassengers = [...form.passengers];
    newPassengers[index][e.target.name] = e.target.value;
    setForm({ ...form, passengers: newPassengers });
  };

  const updatePassengerCount = (count) => {
    const num = parseInt(count);
    if (num > 4) {
      setPassengerLimitError(true);
      return;
    } else {
      setPassengerLimitError(false);
    }

    let updated = [...form.passengers];
    if (num > updated.length) {
      for (let i = updated.length; i < num; i++) {
         
        updated.push({
  firstName: "",
  lastName: "",
  AadharNo: "",
  dob: "",
  from: "",
  to: "",
  seatNumber: "",
  gender: "male",
});

      }
    } else {
      updated = updated.slice(0, num);
    }

    setForm({ ...form, totalPassengers: num, passengers: updated });
  };

  const checkSeatAvailability = () => {
    const seat = seatInput.trim().toUpperCase();
    if (!seat) {
      setSeatMessage("❌ Please enter a seat number.");
    } else if (availableSeats.includes(seat)) {
      setSeatMessage("✅ Seat is available.");
    } else {
      setSeatMessage("❌ Seat is not available.");
    }
  };

  const handleBooking = async () => {
    const requiredFields = [
      form.firstName,
      form.lastName,
      form.AadharNo,
      form.phone,
      form.address,
      form.email,
      form.flightNumber,
      form.bookingDate,
      form.fromCity,
      form.toCity,
    ];
    console.log("✅ Passenger List:", form.passengers);

    //  Aadhar duplicate check inside passenger list
const aadharSet = new Set();
let duplicateAadharFound = false;

form.passengers.forEach(p => {
  if (aadharSet.has(p.AadharNo)) {
    duplicateAadharFound = true;
  }
  aadharSet.add(p.AadharNo);
});

if (duplicateAadharFound) {
  alert("❌ Duplicate Aadhar numbers found in passenger list. Each passenger must have a unique Aadhar number.");
  return;
}


    if (emailError) {
      alert("Please enter a valid email address.");
      return;
    }

    if (passengerLimitError) {
      alert("Maximum 4 passengers are allowed.");
      return;
    }

    if (requiredFields.some(field => !field.trim())) {
      alert("Please fill in all required fields before booking.");
      return;
    }

    if (form.AadharNo.length !== 12) {
      alert("Please enter a valid 12-digit Aadhar number.");
      return;
    }

    if (!seatInput.trim()) {
      alert("Please enter a seat number.");
      return;
    }

    if (!availableSeats.includes(seatInput.trim().toUpperCase())) {
      alert("This seat is not available. Please choose another seat.");
      return;
    }

    const userConfirmed = window.confirm("Do you want to confirm your booking?");
    if (userConfirmed) {
      
      const bookingData = {
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  phone: form.phone,
  address: form.address,
  flightNumber: form.flightNumber,
  bookingDate: form.bookingDate,
  returnDate: form.returnDate,
  fromCity: form.fromCity,
  toCity: form.toCity,
  travelClass: form.travelClass,
  totalPassengers: form.totalPassengers,
  seatNumber: seatInput.trim().toUpperCase(),
  totalPrice: 5132,
  duration: "3h 15m",
  passengers: form.passengers, // ✅ This was missing
};
console.log("🧾 Form passengers before save:", form.passengers);

//yeh add kiye hai 
const simplifiedPassengers = form.passengers.map((p) => ({
  name: `${p.firstName} ${p.lastName}`,
  dob: p.dob,
}));
localStorage.setItem("passengerSummary", JSON.stringify(simplifiedPassengers));


    
      localStorage.setItem("bookingData", JSON.stringify(bookingData));

        console.log("📦 bookingData:", bookingData);
  console.log("👥 passengers:", bookingData.passengers);
      try {
        const res = await axios.post("http://localhost:5000/api/save-booking", {
  fullName: form.firstName + " " + form.lastName,
  dob: form.passengers[0]?.dob,
  aadharNo: form.AadharNo,
});

        

        console.log("✅ Booking saved successfully:", res.data.message);
      } 
      
      catch (error) {
  console.error("❌ Booking save failed:", error.message);

  if (error.response && error.response.data && error.response.data.message) {
    setAadharAssignError(error.response.data.message); //  Show this message below input
  } else {
    alert("❌ Something went wrong. Please try again.");
  }

  return; 
}


      localStorage.setItem("passengerName", JSON.stringify({
  firstName: form.firstName,
  lastName: form.lastName
}));


      //  Navigate to Aadhar verification page
      navigate("/aadhar-validation", {
        state: {
          ...location.state,
          aadharNo: form.AadharNo,
        },
      });
    }
  };

  return (
    <div className="booking-background">
      <div className="booking-form">
        <h2>Flight Ticket Booking</h2>

        
        <form>
          <div className="form-row">
            <div>
              <label>Trip Type:</label>
              <select name="tripType" value={form.tripType} onChange={handleChange}>
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
              </select>
            </div>
            <div>
              <label>Class:</label>
              <select name="travelClass" value={form.travelClass} onChange={handleChange}>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Booking Date:</label>
              <input type="date" name="bookingDate" value={form.bookingDate} onChange={handleChange} />
            </div>
            {form.tripType === "round-trip" && (
              <div>
                <label>Return Date:</label>
                <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} />
              </div>
            )}
          </div>

          <div className="form-row">
            <div>
              <label>Flight Number:</label>
              <input type="text" name="flightNumber" value={form.flightNumber} onChange={handleChange} placeholder="Enter flight number" />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>First Name:</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" />
            </div>
          </div>

          <div className="form-row">
  <div>
    <label>Aadhar No:</label>
    <input
      type="text"
      name="AadharNo"
      value={form.AadharNo}
      placeholder="Enter your 12-digit Aadhar number"
      onChange={handleChange}
      maxLength="12"
    />
    {aadharError && <p style={{ color: "red", fontSize: "13px" }}>{aadharError}</p>}
    {/* add kiye hai yeh */}
    {aadharAssignError && <p style={{ color: "red", fontSize: "13px" }}>{aadharAssignError}</p>}

  </div>
</div>
<div className="form-row">
            <div>
              <label>Phone Number:</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email (e.g., user@gmail.com)"
                className={emailError ? "invalid-input" : ""}
              />
              {emailError && <p style={{ fontSize: "13px", color: "red" }}>❌ Please enter a valid email address.</p>}
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Address:</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Enter your address" />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>From:</label>
              <input type="text" name="fromCity" value={form.fromCity} onChange={handleChange} placeholder="Departure city" />
            </div>
            <div>
              <label>To:</label>
              <input type="text" name="toCity" value={form.toCity} onChange={handleChange} placeholder="Arrival city" />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Total Passengers:</label>
              <input
                type="number"
                name="totalPassengers"
                min="1"
                value={form.totalPassengers}
                onChange={(e) => updatePassengerCount(e.target.value)}
                placeholder="Number of passengers"
                className={passengerLimitError ? "invalid-input" : ""}
              />
              <p style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
                🔹 Note: You can book for up to 4 passengers only.
              </p>
              {passengerLimitError && (
                <p style={{ fontSize: "13px", color: "red" }}>
                  ❌ Maximum 4 passengers are allowed.
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <label>Seat Number:</label>
            <input
              type="text"
              value={seatInput}
              onChange={(e) => setSeatInput(e.target.value)}
              placeholder="e.g., A1, B2"
            />
            <button type="button" onClick={checkSeatAvailability}>Check Seat</button>
            <p style={{ color: seatMessage.includes("not") ? "red" : "green" }}>{seatMessage}</p>
          </div>

          <h3 className="passenger-title">Passenger Details</h3>
          <div className="passenger-heading">
            <span>First Name</span>
            <span>Last Name</span>
            <span>Aadhar No.</span>
            <span>Date of Birth</span>
            <span>From</span>
            <span>To</span>
          </div>

          {form.passengers.map((passenger, index) => (
            <div key={index} className="passenger-row">
              <input type="text" name="firstName" placeholder="First Name" value={passenger.firstName} onChange={(e) => handlePassengerChange(index, e)} />
              <input type="text" name="lastName" placeholder="Last Name" value={passenger.lastName} onChange={(e) => handlePassengerChange(index, e)} />

              <input
  type="text"
  name="AadharNo"
  placeholder="Aadhar No."
  value={passenger.AadharNo}
  onChange={(e) => handlePassengerChange(index, e)}
  maxLength="12"
/>

              <input type="date" name="dob" value={passenger.dob} onChange={(e) => handlePassengerChange(index, e)} />
              <input type="text" name="from" placeholder="From" value={passenger.from} onChange={(e) => handlePassengerChange(index, e)} />
              <input type="text" name="to" placeholder="To" value={passenger.to} onChange={(e) => handlePassengerChange(index, e)} />
            
            <input
  type="text"
  name="seatNumber"
  placeholder="Seat Number"
  value={passenger.seatNumber}
  onChange={(e) => handlePassengerChange(index, e)}
/>

<select
  name="gender"
  value={passenger.gender}
  onChange={(e) => handlePassengerChange(index, e)}
>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>

            </div>
          ))}

<button type="button" onClick={handleBooking}>Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default FlightBooking;


