// src/Pages/SleepPage.js
import React, { useState } from 'react';
import './SleepPage.css'; // Import your CSS for the page

const SleepPage = () => {
    const [date, setDate] = useState('');
    const [sleepHours, setSleepHours] = useState('');

    const handleAddSleep = (e) => {
        e.preventDefault();
        console.log(`Logged ${sleepHours} hours of sleep on ${date}`);
    };

    return (
        <div className="sleep-container">
            <h2 className="title">Log Sleep</h2>
            <form onSubmit={handleAddSleep} className="sleep-form">
                <div className="input-container">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        className="input-field"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                    />
                </div>

                <button type="submit" className="log-btn">Add Sleep</button>
            </form>
        </div>
    );
};

export default SleepPage;


