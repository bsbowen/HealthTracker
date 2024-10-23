import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For routing after login
import './register-page.css'; // Ensure styles are applied correctly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
      <div className="container">
        {/* Login Form Section */}
        <div className="login-box">
          <h1 className="title">Health Tracker</h1>
          <div className="round-button">
            <p>Register Here!</p> {/* Add a link to the registration page here */}
          </div>

          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="login-btn">Login</button>
            {error && <p className="error-msg">{error}</p>} {/* Display error message */}
          </form>
        </div>
      </div>
  );
};

export default Login;
