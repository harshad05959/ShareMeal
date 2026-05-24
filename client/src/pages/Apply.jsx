import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Apply.css";

const Apply = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { foodEmail, foodName } = location.state || {};

  const [ngoName, setNgoName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ngoName || !contact || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/applyfood",
        {
          ownerEmail: foodEmail,
          applicantName: ngoName,
          applicantContact: contact,
          applicantEmail: email,
          foodName: foodName,
        }
      );

      alert(response.data.message);

      // clear form
      setNgoName("");
      setContact("");
      setEmail("");
      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Failed to send application");
    }
  };

  return (
    <div className="apply-container">
      <div className="apply-card">
        <h2>Apply for {foodName}</h2>

        <form className="apply-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Food Owner Email</label>
            <input type="email" value={foodEmail || ""} readOnly />
          </div>

          <div className="form-group">
            <label>NGO Name</label>
            <input
              type="text"
              placeholder="Enter your NGO name"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
};

export default Apply;