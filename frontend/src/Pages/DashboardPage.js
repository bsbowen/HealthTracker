// src/Pages/DashboardPage.js
import React from 'react';
import './DashboardPage.css'; // Link to the CSS file

const DashboardPage = () => {
    // Replace these values with your real data
    const totalCalories = 1599;
    const exerciseDuration = 65; // minutes
    const sleepDuration = 15; // hours
    const date = '2024-10-21'; // Replace with actual date

    return (
        <div className="dashboard-container">
            {/* Total Calories */}
            <div className="card">
                <h3>Total Calories</h3>
                <p>• {totalCalories} calories on {date}</p>
            </div>

            {/* Total Exercise Duration */}
            <div className="card">
                <h3>Total Exercise Duration</h3>
                <p>• {exerciseDuration} minutes on {date}</p>
            </div>

            {/* Total Sleep Duration */}
            <div className="card">
                <h3>Total Sleep Duration</h3>
                <p>• {sleepDuration} hours on {date}</p>
                <p>• {sleepDuration} hours on {date}</p> {/* Example of multiple entries */}
            </div>
        </div>
    );
};

export default DashboardPage;


