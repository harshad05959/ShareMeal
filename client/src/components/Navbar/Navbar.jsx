import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.scss";

const Navbar = ({ token }) => {
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="main">
      {/* Logo */}
      <div className="logo">
        <h2>
          Share<span>MEAL</span>
        </h2>
      </div>

      {/* Navigation Links */}
      <div className={showMenu ? "nav-items mobile-menu-link" : "nav-items"}>
        <ul>
          <li>
            <Link style={{ fontSize: "1.5rem" }} to="/">Home</Link>
          </li>
          <li>
            <Link style={{ fontSize: "1.5rem" }} to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link style={{ fontSize: "1.5rem" }} to="/ourwork">Our Work</Link>
          </li>
          <li>
            <Link style={{ fontSize: "1.5rem" }} to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      {/* Login / Dashboard buttons */}
      <div className="header-login">
        {token ? (
          <Link className="link" to="/dashboard">
            <button className="btn-nav">Dashboard</button>
          </Link>
        ) : (
          <div className="l-btn">
            <Link className="link" to="/login">
              <button className="btn-nav">Login</button>
            </Link>
            <Link className="link" to="/signup">
              <button className="btn-nav">Signup</button>
            </Link>
          </div>
        )}

        {/* Hamburger Menu */}
        <div className="hamburger-menu">
          <button className="menu-btn" onClick={handleClick}>
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
