// src/components/User/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing after login

const Login = () => {
  // Step 2: Add state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use for redirecting after login

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, we assume login is successful. You can later connect this to a back-end API for authentication.
    if (username === 'admin' && password === 'password') {
      // Redirect to Dashboard or any other page
      navigate('/dashboard');
    } else {
      alert('Invalid login credentials');
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
          <div className="round-button">
            <p>Register Here!</p> {/* Add link to register page if needed */}
          </div>

          {/* Step 4: Add form and input handlers */}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
  );
};

export default Login;
