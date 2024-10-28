import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaloriesWidget = () => {
    const [calorieData, setCalorieData] = useState([]);
    const [error, setError] = useState(null);

    // Retrieve the user's token from localStorage or sessionStorage
    const token = localStorage.getItem('token');
    // Make sure to store the token when the user logs in

    useEffect(() => {
        if (!token) {
            setError('User is not logged in');
            return;
        }

        // Set up the Axios request with the Authorization header
        axios.get('./api/calories/user', {
            headers: {
                Authorization: `Bearer ${token}` // Send the JWT token in the Authorization header
            }
        })
            .then(response => setCalorieData(response.data))
            .catch(error => {
                console.error('Error fetching calorie data:', error);
                setError('Failed to fetch calorie data. Please try again.');
            });
    }, [token]);

    return (
        <div className="widget-container">
            <h2>Total Calories</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {calorieData.map((entry, index) => (
                        <li key={index}>{entry.amount} calories on {entry.date}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CaloriesWidget;
