// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Admin-Item Adding
import AddItem from "./components/Renatal System/Admin/Add Item/AddItem";
import AdminItems from "./components/Renatal System/Admin/Item/Items";
import UpdateItem from "./components/Renatal System/Admin/Item/UpdateItem";

//User-Item Display,Order
import UserItems from "./components/Renatal System/User/Item/Items";
import ItemDetails from "./components/Renatal System/User/Item/ItemDetails";

function App() {
  return (
    <div>
      <Router>
        <Routes>
    

          {/* Admin-Item Adding */}
          <Route exact path="/add-items" element={<AddItem />} />
          <Route exact path="/admin-items" element={<AdminItems />} /> 
          <Route path="/update-item/:id" element={<UpdateItem />} />

          {/* User-Item Display  */}
          <Route exact path="/" element={<UserItems/>} />
          <Route exact path="/item-details/:id" element={<ItemDetails />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
