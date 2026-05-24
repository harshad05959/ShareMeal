import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ name, des, img }) => {
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    navigate("/DonateNow");
  };

  return (
    <div className="partner-card">
      <img src={img} alt="Ngo pic" />

      <div className="card-content">
        <h2 className="card-heading">{name}</h2>
        <p className="card-description">{des}</p>
        <button className="btn-card" onClick={handleSubmit}>
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Card;
