import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [food, setFood] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/foods/${id}`);
        setFood(response.data.food);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Pass food details to AddToCart component
    navigate("/add-to-cart", { state: { food } });
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  const { name, image, time, price, tag } = food;

  return (
    <div>
      <div className="tem_open">
        <div>
          <h3 className="itemname">{name}</h3>
          <div className="item_card_details">
            <div>
              <img src={image} alt={name} className="itm_img_view" />
              <p className="itemdetal_view">
                <b>Preparation Time</b>
                <br></br>
                {time} minutes
              </p>
              <p className="itemdetal_view">
                <b>Price</b>
                <br></br> Rs {price}.00
              </p>
              <p className="itemdetal_view">
                <b>Tag</b>
                <br></br>
                {tag}
              </p>
              <button className="viewbtn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              {cartMessage && <div>{cartMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
