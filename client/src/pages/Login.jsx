import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/signin", formData);

      const { token, existingUser } = res.data;

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(existingUser));
      localStorage.setItem("token", token);

      console.log("User stored:", existingUser);

      navigate("/"); // redirect after successful login
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <form onSubmit={handleSubmit}>
          <h1 className="login__heading">Login</h1>
          <p>If you are already a member, easily log in</p>

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <a href="#">Forgot my password</a>

          <button
            className="main__button"
            type="submit"
            id="login-btn"
          >
            Log in
          </button>

          <div className="or">
            <hr />
            OR
            <hr />
          </div>

          <div className="register">
            <p>If you don't have an account</p>
            <Link to="/signup">
              <button type="button" className="register-btn">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>

      <div className="login_main-img"></div>
    </div>
  );
};

export default Login;