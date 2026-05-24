import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./foodDonation.css";

function FoodDonation() {
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");

  const email = localStorage.getItem("email"); // logged-in email

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!foodName || !foodTag || !quantity || !expiryDate || !address) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/fooddonation",
        {
          foodName,
          foodTag,
          quantity,
          expiryDate,
          address,
          email, // automatically sent
        }
      );

      if (response.status === 201) {
        alert("Food donation added successfully");
        navigate("/dashboard/food");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div className="foodDonation_container">
      <div className="foodDonation_heading">
        <h1>FOOD DONATION FORM</h1>
      </div>

      <div className="foodDonation_wrapper">
        <form className="food-donation_form" onSubmit={handleSubmit}>

          <div className="form_element">
            <label>Email</label>
            <input type="email" value={email || ""} disabled readOnly />
          </div>

          <div className="form_element">
            <label>Food Name</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>

          <div className="form_element">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="form_element">
            <label>Food Type</label>
            <select
              value={foodTag}
              onChange={(e) => setFoodTag(e.target.value)}
            >
              <option value="">Choose type</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non Veg</option>
            </select>
          </div>

          <div className="form_element">
            <label>Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="form_element">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FoodDonation;