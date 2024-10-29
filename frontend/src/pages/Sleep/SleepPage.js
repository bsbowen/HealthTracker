import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './SleepPage.css'; // Import your CSS for the page
import Navbar from "../../components/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const SleepPage = () => {
    const [date, setDate] = useState('');
    const [sleepHours, setSleepHours] = useState('');
    const [message, setMessage] = useState(''); // To display success or error messages

    const handleAddSleep = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("User is not logged in");
            return;
        }

        try {
            const response = await axios.post(
                '/api/sleep',
                {
                    sleep_date: date,
                    sleep_duration: sleepHours,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(`Logged ${sleepHours} hours of sleep on ${date}`, response.data);
            setMessage('Sleep logged successfully');
        } catch (err) {
            console.error('Error logging sleep:', err);
            setMessage('Failed to log sleep. Please try again.');
        }
    };

    return (
        <div className="sleep-container">
            <Navbar />
            <h2 className="title">
                <i className="fas fa-heartbeat icon"></i> Log Sleep
            </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddSleep} className="sleep-form">
                <div className="input-container">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        className="input-field"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="sleepHours">Sleep Hours:</label>
                    <input
                        type="number"
                        id="sleepHours"
                        className="input-field"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="log-btn">Add Sleep</button>
            </form>
        </div>
    );
};

export default SleepPage;

