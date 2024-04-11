import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import './AddStock.css'; // Import your CSS file

const AddStock = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    time: "",
    price: "",
    tag: "",
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
      await axios.post("http://localhost:8080/foods/", inputs);
      alert("Food item added successfully.");
      history("/admin-foods"); // Navigate to foods page after successful submission
    } catch (error) {
      console.error("Error submitting food:", error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Add New Food Item</h2>
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
          <label className="cart-label">Preparation Time (minutes):</label>
          <input
            className="cart-input"
            type="number"
            name="time"
            value={inputs.time}
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
          <label className="cart-label">Tag:</label>
          <select
            className="cart-input-select"
            name="tag"
            value={inputs.tag}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Condiments and Sauces">Condiments and Sauces</option>
            <option value="Seafood">Seafood</option>
            <option value="Meat and Poultry">Meat and Poultry</option>
            <option value="Fresh Produce">Fresh Produce</option>
            <option value="Dairy Products">Dairy Products</option>
            <option value="Cereals and Grains">Cereals and Grains</option>
            <option value="Snacks">Snacks</option>
            <option value="Cooking Oils">Cooking Oils</option>
            <option value="Healthy Foods">Healthy Foods</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>
        <br></br>
        {error && <p className="food-error-message">{error}</p>}
        <button className="viewbtn" type="submit">
          Add New Food
        </button>
      </form>
    </div>
  );
};

export default AddStock;
