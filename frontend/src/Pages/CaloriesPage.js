// src/Pages/CaloriesPage.js
import React, { useState } from 'react';
import './CaloriesPage.css'; // Import your CSS for the page

const CaloriesPage = () => {
    const [date, setDate] = useState('');
    const [calories, setCalories] = useState('');

    const handleAddCalories = (e) => {
        e.preventDefault();
        console.log(`Logged ${calories} calories on ${date}`);
    };

    return (
        <div className="calories-container">
            <h2 className="title">Log Calories</h2>
            <form onSubmit={handleAddCalories} className="calories-form">
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
                    <label htmlFor="calories">Calories:</label>
                    <input
                        type="number"
                        id="calories"
                        className="input-field"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                </div>

                <button type="submit" className="log-btn">Add Calories</button>
            </form>
        </div>
    );
};

export default CaloriesPage;





