// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate instead of history.push

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Add logging to debug
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            console.log('Login successful:', response.data); // Check the API response
            localStorage.setItem('token', response.data.token); // Save token to localStorage
            // Redirect to dashboard
            navigate('/dashboard'); // Correct usage for redirection
        } catch (err) {
            console.error('Login failed:', err); // Log the error
            setError('Invalid credentials');
        }
    };

    const handleRegister = () => {
        window.location.href = '/register'; // Redirect to register page
    };

    return (
        <div className="wrapper">
            {/* Moving Icons Section */}
            <div className="icon-container">
                <i className="fas fa-heartbeat moving-icon"></i>
                <i className="fas fa-running moving-icon"></i>
                <i className="fas fa-apple-alt moving-icon"></i>
            </div>

            <div className="container">
                {/* Login Form Section */}
                <h1 className="title">Health Tracker</h1>

                <div className="round-button" id="register-btn" onClick={handleRegister}>
                    <p>Register Here!</p>
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="email"
                            id="username"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if login fails */}
            </div>
        </div>
    );
};

export default Login;
