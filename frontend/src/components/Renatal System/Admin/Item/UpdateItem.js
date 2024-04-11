import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    image: "",
    contact: "",
    location: "",
    price: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${id}`);
      setItem(response.data.item);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/items/${id}`, item);
      alert("Item updated successfully.");
      navigate("/admin-items");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <h1>Update Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={item.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={item.contact}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={item.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={item.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={item.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
