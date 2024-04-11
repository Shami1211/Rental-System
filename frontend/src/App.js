// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Admin-Food Adding
import AddFood from "./components/Food Ordering/Admin/Add Food/AddFood";
import AdminFoods from "./components/Food Ordering/Admin//Food/Foods";
//User-Food Display,Order
import UserFoods from "./components/Food Ordering/User/Food/Foods";
import FoodDetails from "./components/Food Ordering/User/Food/FoodDetails";
import AddToCart from "./components/Food Ordering/User/Cart/AddtoCart";
import ViewCart from "./components/Food Ordering/User/Cart/Carts";
import AddDelivery from "./components/Food Ordering/User/AddDelivery/AddDelivery";
import EditCartItem from "./components/Food Ordering/User/Cart/EditCartItem";

function App() {
  return (
    <div>
      <Router>
        <Routes>
    

          {/* Admin-Food Adding */}
          <Route exact path="/add-food" element={<AddFood />} />
          <Route exact path="/admin-foods" element={<AdminFoods />} />

          {/* User-Food Display,Order */}
          <Route exact path="/" element={<UserFoods />} />
          <Route exact path="/food-details/:id" element={<FoodDetails />} />
          <Route exact path="/add-to-cart" element={<AddToCart />} />
          <Route exact path="/view-cart" element={<ViewCart />} />
          <Route exact path="/add-delivery" element={<AddDelivery />} />
          <Route path="/update-cart/:id" element={<EditCartItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
