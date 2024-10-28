// src/components/Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"; // Assuming you will have a CSS file to style the navbar

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Navigate back to login page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="nav-link">
          Home
        </Link>
        <Link to="/calorie-log" className="nav-link">
          Calorie Log
        </Link>
        <Link to="/exercise-log" className="nav-link">
          Exercise Log
        </Link>
        <Link to="/sleep-log" className="nav-link">
          Sleep Log
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
