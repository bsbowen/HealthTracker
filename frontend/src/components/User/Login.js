// src/components/User/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission for registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, password });
    // For now, just log the values, later connect to backend
    alert("Registration Successful!");
  };

  // Navigate to login page
  const goToLogin = () => {
    navigate('/login');
  };

  return (
      <div className="container">
        <div className="icon-container">
          <i className="fas fa-heartbeat moving-icon"></i>
          <i className="fas fa-running moving-icon"></i>
          <i className="fas fa-apple-alt moving-icon"></i>
        </div>

        <div className="login-box">
          <h1 className="title">Health Tracker</h1>
          <p className="subtitle">Register Here!</p> {/* Moved subtitle here */}

          {/* Registration Form */}
          <form onSubmit={handleRegisterSubmit}>
            <div className="input-container">
              <input
                  type="text"
                  placeholder="First Name"
                  className="input-field"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                  type="text"
                  placeholder="Last Name"
                  className="input-field"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                  type="password"
                  placeholder="Create Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Register Button */}
            <button type="submit" className="login-btn">Register</button>
          </form>

          {/* Button to redirect to Login */}
          <button onClick={goToLogin} className="login-btn">Go to Login</button>
        </div>
      </div>
  );
};

export default Login;


