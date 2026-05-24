import React from "react";
import { FaCalendarAlt, FaCartArrowDown, FaHome ,FaEnvelope} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FoodCard.css";

const FoodCard = ({ id, name, quantity, date, address, tag ,ema}) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
  navigate("/apply", {
    state: {
      foodId: id,
      foodEmail: ema,
      foodName: name
    }
  });
};

  return (
    <div className="card">
      <p
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          padding: "0.5rem 1rem",
          background: "#f5f5f5",
          color: "#333",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "0.5rem",
        }}
      >
        {tag ? tag : "food"}
      </p>

      <img
        className="foodcard-img"
        src="https://i.pinimg.com/736x/83/75/df/8375df279bf092dfff6b7cfdb4e25664.jpg"
        alt="Food"
      />

      <div className="card-content">
        <h2 className="food-title">{name}</h2>

        <div className="food-details">
          <ul className="icons">
            <li>
              <span className="icons-name">
                <FaCartArrowDown />
              </span>{" "}
              : {quantity} kg
            </li>

            <li>
              <span className="icons-name">
                <FaCalendarAlt />
              </span>{" "}
              : {date}
            </li>

            <li>
              <span className="icons-name">
                <FaHome />
              </span>{" "}
              : {address}
            </li>
                <li>
  <span className="icons-name">
    <FaEnvelope />
  </span>{" "}
  : {ema}
</li>
          </ul>
        </div>

        <button className="food-btn" onClick={handleSubmit}>
          Apply For This Food
        </button>
      </div>
    </div>
  );
};

export default FoodCard;