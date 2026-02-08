import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DonateNow.css";

function FoodDonation() {
  const navigate = useNavigate(); 
  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");

  const email = localStorage.getItem("email");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      foodName,
      foodTag,
      quantity,
      expiryDate,
      address,
      email,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/fooddonation",
        { formData }
      );

      if(response.status===formData){
         alert("Data save successfully");
         navigate("//dashboard/food");
      }else{
         alert("complete all fields");
      }

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="foodDonation_container">
      <div className="foodDonation_heading">
        <h1 className="heading-foodd">FOOD DONATION FORM</h1>
      </div>

      <div className="foodDonation_wrapper">
        <form className="food-donation_form" onSubmit={handleSubmit}>
          <div className="form_element">
            <label htmlFor="foodName">Food name</label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>

          <div className="form_element">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="form_element">
            <label htmlFor="foodTag">Food type or tag</label>
            <select
              id="foodTag"
              value={foodTag}
              onChange={(e) => setFoodTag(e.target.value)}
            >
              <option value="" disabled>
                Choose type
              </option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non Veg</option>
            </select>
          </div>

          <div className="form_element">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="form_element">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button id="foodDonation_submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoodDonation;
