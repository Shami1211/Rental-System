import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/carts/");
        setCarts(response.data.carts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carts:", error);
        setError("Failed to fetch cart details");
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  useEffect(() => {
    let total = 0;
    carts.forEach((cart) => {
      total += parseFloat(cart.total);
    });
    setTotalAmount(total);
  }, [carts]);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/carts/${id}`);
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
      alert("Item removed from cart successfully.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart");
    }
  };

  return (
    <div className="card_ful_cart">
      <h2 className="carts-header">Cart Details</h2>
      <div className="button-container">
        <button
          onClick={() => (window.location.href = "/")}
          className="add-new-button"
        >
          Add New
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="carts-list">
          {carts.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div>
              {carts.map((cart) => (
                <div key={cart._id} className="">
                  <div className="cart_detail_box">
                    <img
                      src={cart.image}
                      alt={cart.name}
                      className="cart_item_image_cart"
                    />

                    <div>
                      <h3 className="itmname">{cart.name}</h3>
                      <p className="itmprice">Price: ${cart.price}</p>
                      <p className="itmprice">Quantity: {cart.qty}</p>
                      <p className="itmprice tot">Total: ${cart.total}</p>
                    </div>
                    <div className="btn_action_cart">
                      <Link to={`/update-cart/${cart._id}`}>
                        <button className="updtbtn">Edit</button>
                      </Link>
                      <br></br>
                      <button
                        className="dltbtn"
                        onClick={() => handleRemoveFromCart(cart._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="total-amount">
                <h3 className="tot_topic">
                  You have to pay{" "}
                  <span className="tot">Rs {totalAmount.toFixed(2)}</span>{" "}
                </h3>
              </div>
              <button
                onClick={() => (window.location.href = "/add-delivery")}
                className="add-new-button"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carts;
