import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../admin.css";
import { useReactToPrint } from "react-to-print";

const Item = ({ item, onDelete }) => {
  const {
    _id,
    name,
    image,
    contact,
    location,
    price,
    type,
    description,
  } = item;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/items/${_id}`);
        onDelete(_id);
        alert("Item deleted successfully.");
        window.location.reload();
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  return (
    <tr>
      <td className="admin_tbl_td">
        <img
          src={image}
          alt={name}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td className="admin_tbl_td">{name}</td>
      <td className="admin_tbl_td">{contact}</td>
      <td className="admin_tbl_td">{location}</td>
      <td className="admin_tbl_td">${price}</td>
      <td className="admin_tbl_td">{type}</td>
      <td className="admin_tbl_td">{description}</td>
      <td className="admin_tbl_td">
        <button className="dltbtn" onClick={handleDelete}>
          Delete
        </button>
        <Link className="dltbtn" to={`/update-item/${_id}`} >
          Update
        </Link>
      </td>
    </tr>
  );
};

const Items = () => {
  const [items, setItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItems(response.data.items);
    } catch (error) {
      setAlertMessage("Error fetching items."); // Display error message to the user
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      alert("Item deleted successfully.");
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };

  const handleSearch = () => {
    const filtered = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filtered);
    setNoResults(filtered.length === 0);
  };

  /* PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Items Report",
    onAfterPrint: () => alert("Items Report Successfully Downloaded!"),
  });

  return (
    <div>
      <h1 className="cart-header">Items List</h1>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
      <div className="tbldetsil">
        <div className="search_pdf_div">
          <button
            onClick={() => (window.location.href = "/add-item")}
            className="updtbtn"
          >
            Add New Item
          </button>
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

          <button onClick={handlePrint} className="updtbtn">
            Generate Report
          </button>
        </div>

        <table ref={ComponentsRef} className="table_details_admin">
          <thead>
            <tr>
              <th className="admin_tbl_th">Image</th>
              <th className="admin_tbl_th">Name</th>
              <th className="admin_tbl_th">Contact</th>
              <th className="admin_tbl_th">Location</th>
              <th className="admin_tbl_th">Price</th>
              <th className="admin_tbl_th">Type</th>
              <th className="admin_tbl_th">Description</th>
              <th className="admin_tbl_th">Action</th>
            </tr>
          </thead>
          {noResults ? (
            <div>
              <br />
              <h1 className="con_topic">
                No <span className="clo_us">Found</span>{" "}
              </h1>
            </div>
          ) : (
            <tbody>
              {items.map((item) => (
                <Item key={item._id} item={item} onDelete={handleDelete} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Items;
