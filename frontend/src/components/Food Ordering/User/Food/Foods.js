import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdCart } from "react-icons/io";
import "../User.css";

const Food = ({ food }) => {
  const { _id, name, image, time, price, tag } = food;

  return (
    <div>
      <div className="card_ittem_card">
        <img src={image} alt={name} className="img_item_cart" />
        <h3 className="item_name">{name}</h3>
        <div className="item_con">
          <p className="detail_p">
            <b>Preparation Time</b>
            <br /> {time} minutes
          </p>
          <p className="detail_p">
            <b>Price</b>
            <br /> Rs {price}.00
          </p>
          <p className="detail_p">
            <b>Tag</b>
            <br />
            {tag}
          </p>
        </div>
        <Link className="btnLink" to={`/food-details/${_id}`}>
          <button className="viewbtn">View</button>
        </Link>
      </div>
    </div>
  );
};

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [tags, setTags] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8080/foods");
        setFoods(response.data.foods);
        // Extract tags from foods
        const allTags = response.data.foods.map((food) => food.tag);
        // Remove duplicate tags
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching foods:", error);
        setAlertMessage("Error fetching food items.");
      }
    };

    fetchFoods();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const handleTagFilter = (selectedTag) => {
    const filtered = foods.filter((food) => food.tag === selectedTag);
    setFilteredFoods(filtered);
  };
  const handleSearch = () => {
    const filtered = foods.filter((food) =>
      Object.values(food).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFoods(filtered);
    setNoResults(filtered.length === 0);
  };
  return (
    <div>
      <div className="usernavbar">
        <button onClick={() => (window.location.href = "/add-food")}>
          Admin
        </button>
        <IoMdCart
          className="cart_icon"
          onClick={() => (window.location.href = "/view-cart")}
        />
      </div>
    
      <div className="pdn_itmdetil">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          className="serch"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="updtbtn">
          Search
        </button>
      </div>
        <div className="tags_container">
          <button
            className="filterbtn"
            onClick={() => (window.location.href = "/")}
          >
            all
          </button>
          {tags.map((tag) => (
            <button
              className="filterbtn"
              key={tag}
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="card_container_cart">
          {filteredFoods.length > 0
            ? filteredFoods.map((food) => <Food key={food._id} food={food} />)
            : foods.map((food) => <Food key={food._id} food={food} />)}
        </div>
      </div>
    </div>
  );
};

export default Foods;
