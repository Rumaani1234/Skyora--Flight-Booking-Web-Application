import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flightsData from "../flights.json"; // JSON imported
import "./DepartureBoard.css";



const DepartureBoard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("All");
  
  const [minPrice, setMinPrice] = useState(3500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [connectionFilters, setConnectionFilters] = useState({ direct: false, oneStop: false, twoPlusStops: false });
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [searchedFrom, setSearchedFrom] = useState("");
  const [searchedTo, setSearchedTo] = useState("");

  const handleSearch = () => {
    setSearchedFrom(fromCity.trim().toLowerCase());
    setSearchedTo(toCity.trim().toLowerCase());
  };

  const filteredFlights = flightsData.filter((flight) => {
    const classMatch = selectedClass === "All" || flight.classStatus?.economy?.class === selectedClass;
    
    const price = flight.classStatus?.economy?.price?.amount || 0;
    const priceMatch = price >= minPrice && price <= maxPrice;

    const from = flight.departure.city.toLowerCase();
    const to = flight.arrival.city.toLowerCase();
    const fromMatch = !searchedFrom || from.includes(searchedFrom);
    const toMatch = !searchedTo || to.includes(searchedTo);

    const stops = 0; // Defaulting all flights as direct in this sample
    const connectionMatch =
      (!connectionFilters.direct && !connectionFilters.oneStop && !connectionFilters.twoPlusStops) ||
      (connectionFilters.direct && stops === 0) ||
      (connectionFilters.oneStop && stops === 1) ||
      (connectionFilters.twoPlusStops && stops >= 2);

    return classMatch && priceMatch && fromMatch && toMatch && connectionMatch;
  });

  


const handleRowClick = (flight) => {
  const from = flight.departure.city;
  const to = flight.arrival.city;

  //  navigate to /book-flight and pass flight + from-to for map
  navigate("/flight-details", {
    state: {
      flight,
      from,
      to,
    },
  });
};



  return (
    <div className="departure-container">
      <div className="trip-search">
        <div className="trip-search-item">
          <label>From</label>
          <input type="text" placeholder="Your City" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
        </div>
        <div className="trip-search-item">
          <label>To</label>
          <input type="text" placeholder="Destination" value={toCity} onChange={(e) => setToCity(e.target.value)} />
        </div>
        <div className="trip-search-item">
          <label>Traveller</label>
          <input type="number" placeholder="1 Adult" />
        </div>
        <div className="trip-search-item">
          <label>Return</label>
          <input type="date" />
        </div>
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="main-panel">
        <div className="filter-panel">
          <div className="connection-filter">
            <h4>Connection</h4>
            <label><input type="checkbox" checked={connectionFilters.direct} onChange={() => setConnectionFilters((prev) => ({ ...prev, direct: !prev.direct }))} /> Direct Flight</label><br />
            <label><input type="checkbox" checked={connectionFilters.oneStop} onChange={() => setConnectionFilters((prev) => ({ ...prev, oneStop: !prev.oneStop }))} /> 1 Connection</label><br />
            <label><input type="checkbox" checked={connectionFilters.twoPlusStops} onChange={() => setConnectionFilters((prev) => ({ ...prev, twoPlusStops: !prev.twoPlusStops }))} /> 2+ Connections</label><br />
          </div>

          <h3>Edit your selections:</h3>
          <div className="trip-type">
            <label><input type="radio" name="trip" defaultChecked /> Round Trip</label>
            <label><input type="radio" name="trip" /> One Way</label>
          </div>

          <div className="filter-group">
            <label>Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option>All</option>
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>

          

          <div className="filter-group">
            <label>Price Range (₹):</label>
            <input type="range" min="2000" max="6000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
            <span>Min: ₹{minPrice}</span>
            <input type="range" min="2000" max="6000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            <span>Max: ₹{maxPrice}</span>
          </div>

          <button className="reset-btn" onClick={() => {
            setSelectedClass("All");
            
            setMinPrice(2000);
            setMaxPrice(5000);
            setFromCity("");
            setToCity("");
            setSearchedFrom("");
            setSearchedTo("");
            setConnectionFilters({ direct: false, oneStop: false, twoPlusStops: false });
          }}>Reset All</button>
        </div>

        <div className="departure-board">
          <div className="board-header">
            <h2>Search Results</h2>
            <p>{filteredFlights.length} flights found</p>
          </div>
          <table className="flight-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Destination</th>
                <th>Flight</th>
                <th>Class</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map((flight, index) => (
                <tr key={index} className="flight-row" onClick={() => handleRowClick(flight)} style={{ cursor: "pointer" }}>
                  <td>{flight.departure.time}</td>
                  <td>{`${flight.departure.city} → ${flight.arrival.city}`}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.classStatus.economy.class}</td>
                  <td>{flight.duration}</td>
                  {/* <td className={getStatusClass("Boarding")}>Boarding</td> */}
                  <td>₹{flight.classStatus.economy.price.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartureBoard;

