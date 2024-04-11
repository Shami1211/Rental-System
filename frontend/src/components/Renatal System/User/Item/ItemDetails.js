import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        setItem(response.data.item);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleAddToCart = () => {
    navigate("/add-to-cart", { state: { item } });
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  const { name, image, location, price, description,contact } = item;

  return (
    <div>
      <div className="item_open">
        <div>
          <h3 className="itemname">{name}</h3>
          <div className="item_card_details">
            <div>
              <img src={image} alt={name} className="item_img_view" />
              <p className="detail_p">
            <b>Location</b>
            <br /> {location} 
          </p>
          <p className="detail_p">
            <b>Price</b>
            <br /> Rs {price}.00
          </p>
          <p className="detail_p">
            <b>Description</b>
            <br />
            {description}
          </p>
          <p className="detail_p">
            <b>Contact</b>
            <br />
            {contact}
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

export default ItemDetails;
