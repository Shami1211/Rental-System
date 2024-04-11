import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddDelivery() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/deliveries/", { location, time });
      alert("Address Added Successfully");
    } catch (error) {
      console.error("Error adding delivery:", error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Add New Delivery</h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <label className="cart-label">Location:</label>
        <br></br>
        <input
          className="cart-input"
          type="text"
          name="location"
          value={location}
          onChange={handleLocationChange}
          required
        />
        <br></br>
        <label className="cart-label">Add Time:</label>
        <br></br> <br></br>
        <div>
          <label className="cart-label">Hours</label>
          <br></br>
          <input
            className="cart-input"
            type="number"
            name="hours"
            placeholder="HH"
            min="0"
            max="23"
            onChange={handleTimeChange}
            required
          />{" "}
          <br></br>
          <label className="cart-label">Minutes</label>
          <br></br>
          <input
            className="cart-input"
            type="number"
            name="minutes"
            placeholder="MM"
            min="0"
            max="59"
            onChange={handleTimeChange}
            required
          />
        </div>
        <br />
        <button type="submit" className="viewbtn">
          Add Address
        </button>
      </form>
    </div>
  );
}

export default AddDelivery;
