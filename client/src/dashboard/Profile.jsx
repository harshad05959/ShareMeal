import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  // ================= GET USER =================
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [editingProfile, setEditingProfile] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [number, setNumber] = useState(user?.number || "");
  const [email, setEmail] = useState(user?.email || "");

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= REDIRECT IF NOT LOGGED IN =================
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ================= FETCH USER FOODS =================
  const fetchUserFoods = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/getparticularuserdata/${user.email}`
      );
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFoods();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ================= PROFILE UPDATE =================
  const handleSaveProfile = async () => {
    try {
      const response = await axios.put("http://localhost:3000/update", {
        id: user._id,
        name,
        number,
        email,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setEditingProfile(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  // ================= DELETE FOOD =================
  const handleDeleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/deletefood/${id}`);

      // Remove from UI instantly
      setFoods((prevFoods) =>
        prevFoods.filter((food) => food._id !== id)
      );

      alert("Food deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      {/* ================= PROFILE SECTION ================= */}
      <div className="wrapper">
        <div className="profile">
          <div className="profile_img_info">
            <div className="img"></div>

            <div className="info">
              {!editingProfile ? (
                <>
                  <p className="name">{name}</p>
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleSaveProfile}>Save</button>
                  <button onClick={() => setEditingProfile(false)}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="profile_skills">
            <div className="skills">
              <p>User Info</p>
              {!editingProfile && (
                <ul>
                  <li>
                    <MdEmail />
                    <span>{email}</span>
                  </li>
                  <li>
                    <BsFillTelephoneFill />
                    <span>{number}</span>
                  </li>
                </ul>
              )}
            </div>

            {!editingProfile && (
              <div className="tags_wrap">
                <span
                  className="tag"
                  onClick={() => setEditingProfile(true)}
                >
                  Edit Profile
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= FOOD SECTION ================= */}
      <div className="user_foods">
        <h2>My Posted Foods</h2>

        {loading ? (
          <p>Loading...</p>
        ) : foods.length === 0 ? (
          <p>No food donations posted yet.</p>
        ) : (
          foods.map((food) => (
            <div key={food._id} className="food_card">
              <div className="food_actions">
                <button
                  className="delete_btn"
                  onClick={() => handleDeleteFood(food._id)}
                >
                  Delete
                </button>
              </div>

              <p><strong>Name:</strong> {food.foodName}</p>
              <p><strong>Quantity:</strong> {food.quantity}</p>
              <p><strong>Type:</strong> {food.foodTag}</p>
              <p><strong>Expiry:</strong> {food.expiryDate?.substring(0, 10)}</p>
              <p><strong>Address:</strong> {food.address}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;