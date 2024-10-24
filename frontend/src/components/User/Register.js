// src/components/User/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import your CSS file

const Register = () => {
    // State for form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // For navigation after registration

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, simply log the input values, later you can send them to your backend
        console.log({ firstName, lastName, email, password });

        // Redirect to login or another page after registration
        navigate('/login');
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
                <h1 className="title">Health Tracker</h1>
            </div>

            <form onSubmit={handleSubmit}>
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
                        placeholder="Create Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-btn">Register</button>
            </form>

            <div className="button-container">
                <a href="/login">
                    <button type="button" className="login-btn">Go to Login</button>
                </a>
            </div>
        </div>
    );
};

export default Register;
