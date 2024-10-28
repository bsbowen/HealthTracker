// src/components/Login.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      console.log("Logged in successfully");
      navigate("./Dashboard"); // Redirect to dashboard or home page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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

      {/* Login Form Section */}
      <div className="login-box">
        <h1 className="title">Health Tracker</h1>
        <h2 className="subtitle">Login Here!</h2>
        <form onSubmit={handleLogin}>
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        {/* New User Button to Navigate to Registration Page */}
        <div className="register-link">
          <p>New user?</p>
          <Link to="/register" className="register-btn">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
