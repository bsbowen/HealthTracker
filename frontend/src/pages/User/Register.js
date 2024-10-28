// src/components/Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register-page.css"; // Assuming you moved register-page.css into src

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", { firstName, lastName, email, password });
      setMessage("Registration successful! You can now log in.");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      {/* Moving Icons Section */}
      <div className="icon-container">
        <i className="fas fa-heartbeat moving-icon"></i>
        <i className="fas fa-running moving-icon"></i>
        <i className="fas fa-apple-alt moving-icon"></i>
      </div>

      {/* Register Form Section */}
      <div className="login-box">
        <h1 className="title">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <input
              type="text"
              placeholder="First Name"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Last Name"
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-btn" type="submit">
            Register
          </button>
        </form>
        {message && (
          <div>
            <p className="success">{message}</p>
            <button
              className="login-btn"
              onClick={() => navigate("/api/auth/login")}
            >
              Go to Login
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
