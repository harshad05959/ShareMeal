import React, { useState } from "react";
import "./DonateNow.css";
import { useNavigate } from "react-router-dom";
const DonateNow = () => {
  const [messName, setMessName] = useState("");
  const [address, setAddress] = useState("");
  const [foodRemaining, setFoodRemaining] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!messName || !address || !foodRemaining)
    {
        alert("Complete all remaining fields");
    }else{
    alert("Data Submited to the Mess Successfully");
    navigate('/');
    }
  };

  return (
    <div className="donate-container">
      <h2>Donate Now</h2>

      <form className="donate-form" onSubmit={handleSubmit}>
        <div>
          <label>Mess Name</label>
          <input
            value={messName}
            onChange={(e) => setMessName(e.target.value)}
          />
        </div>

        <div>
          <label>Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label>Food Remaining</label>
          <input
            value={foodRemaining}
            onChange={(e) => setFoodRemaining(e.target.value)}
          />
        </div>

        <button type="submit" >Donate</button>
      </form>
    </div>
  );
};

export default DonateNow;
