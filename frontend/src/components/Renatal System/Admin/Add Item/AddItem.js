import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    contact: "",
    location: "",
    price: "",
    type: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/items/", inputs); // Assuming the endpoint is correct
      alert("Item added successfully.");
      history("/admin-items"); // Navigate to items page after successful submission
    } catch (error) {
      console.error("Error submitting item:", error);
      setError("Error adding item. Please try again.");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Add New Item</h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <div>
          <label className="cart-label">Name:</label>
          <input
            className="cart-input"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="cart-label">Image URL:</label>
          <input
            className="cart-input"
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="cart-label">Contact:</label>
          <input
            className="cart-input"
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="cart-label">Location:</label>
          <input
            className="cart-input"
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="cart-label">Price:</label>
          <input
            className="cart-input"
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
  <label className="cart-label">Type:</label>
  <select
    className="cart-input-select"
    name="type"
    value={inputs.type}
    onChange={handleChange}
    required
  >
    <option value="">Select a type</option>
    <option value="van">Van</option>
    <option value="bus">Bus</option>
    <option value="car">Car</option>
    <option value="motorcycle">Motorcycle</option>
    <option value="bicycle">Bicycle</option>
    <option value="train">Train</option>
    <option value="plane">Plane</option>
    <option value="boat">Boat</option>
    <option value="campervan">Campervan</option>
    <option value="tent">Tent</option>
    <option value="backpack">Backpack</option>
    <option value="camera">Camera</option>
    <option value="binoculars">Binoculars</option>
    <option value="maps">Maps</option>
    <option value="compass">Compass</option>
    <option value="GPS">GPS</option>
    <option value="luggage">Luggage</option>
    <option value="sleeping bag">Sleeping Bag</option>
    <option value="tent">Tent</option>
    <option value="cooler">Cooler</option>
    <option value="flashlight">Flashlight</option>
    <option value="water bottle">Water Bottle</option>
    <option value="sunscreen">Sunscreen</option>
    <option value="hat">Hat</option>
    <option value="sunglasses">Sunglasses</option>
    <option value="first aid kit">First Aid Kit</option>
    <option value="bug spray">Bug Spray</option>
    <option value="binoculars">Binoculars</option>
    <option value="umbrella">Umbrella</option>
    <option value="towel">Towel</option>
  </select>
</div>

        <div>
          <label className="cart-label">Description:</label>
          <textarea
            className="cart-input"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </div>
        
           
        <button className="viewbtn" type="submit">
          Add New Item
        </button>
        {error && <p className="food-error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddItem;
