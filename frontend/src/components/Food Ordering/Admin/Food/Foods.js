import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../admin.css";
import { useReactToPrint } from "react-to-print";
const Food = ({ food, onDelete }) => {
  const { _id, name, image, time, price, tag } = food;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/foods/${_id}`);
        onDelete(_id);
        alert("Food item deleted successfully.");
        window.location.reload();
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  return (
    <tr>
      <td className="admin_tbl_td">
        <img src={image} alt={name} style={{ width: "50px", height: "50px" }} />
      </td>
      <td className="admin_tbl_td">{name}</td>
      <td className="admin_tbl_td">{time} minutes</td>
      <td className="admin_tbl_td">${price}</td>
      <td className="admin_tbl_td">{tag}</td>
      <td className="admin_tbl_td">
        <button className="dltbtn" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8080/foods");
      setFoods(response.data.foods);
    } catch (error) {
      setAlertMessage("Error fetching food items."); // Display error message to the user
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/foods/${id}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
      alert("Food item deleted successfully.");
    } catch (error) {
      // Handle error and provide feedback to the user
    }
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
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  return (
    <div>
      <h1 className="cart-header">Food Items List</h1>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
      <div className="tbldetsil">
        <div className="search_pdf_div">
          <button
            onClick={() => (window.location.href = "/add-food")}
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
              <th className="admin_tbl_th">Preparation Time</th>
              <th className="admin_tbl_th">Price</th>
              <th className="admin_tbl_th">Tag</th>
              <th className="admin_tbl_th">Action</th>
            </tr>
          </thead>
          {noResults ? (
            <div>
              <br></br>
              <h1 className="con_topic">
                No <span className="clo_us"> Found</span>{" "}
              </h1>
            </div>
          ) : (
            <tbody>
              {foods.map((food) => (
                <Food key={food._id} food={food} onDelete={handleDelete} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Foods;
