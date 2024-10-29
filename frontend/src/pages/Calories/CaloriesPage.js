import React, { useState } from 'react';
import axios from 'axios';
import './CaloriesPage.css';
import Navbar from "../../components/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';

const CaloriesPage = () => {
    const [mealType, setMealType] = useState('');
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [intakeDate, setIntakeDate] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleAddCalories = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        setLoading(true);

        // Check if the user is logged in
        if (!token) {
            setMessage("User is not logged in");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
            setLoading(false); // Stop loading if user is not logged in
            return;
        }

        try {
            const response = await axios.post(
                '/api/calories',
                {
                    meal_type: mealType,
                    food_item: foodItem,
                    intake_date: intakeDate,
                    calories: calories,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(`Logged ${calories} calories for ${mealType}`, response.data);
            setMessage('Calories logged successfully');

            // Clear the form fields after successful logging
            setMealType('');
            setFoodItem('');
            setIntakeDate('');
            setCalories('');
        } catch (err) {
            console.error('Error logging calories:', err);

            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                switch (err.response.status) {
                    case 400:
                        setMessage('Bad Request: Please check the data you entered.');
                        break;
                    case 401:
                        setMessage('Unauthorized: Please log in again.');
                        setTimeout(() => {
                            window.location.href = "/login";
                        }, 1500);
                        break;
                    case 403:
                        setMessage('Forbidden: You do not have permission to perform this action.');
                        break;
                    case 404:
                        setMessage('Not Found: The server could not find the requested resource.');
                        break;
                    case 500:
                        setMessage('Server Error: Something went wrong on our end. Please try again later.');
                        break;
                    default:
                        setMessage(`Error: ${err.response.statusText}. Please try again.`);
                }
            } else if (err.request) {
                // The request was made but no response was received
                setMessage('No response from server. Please check your internet connection or try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Stop loading once request is finished
        }
    };

    const handleNutritionLookup = () => {
        if (foodItem) {
            const lookupURL = `https://www.google.com/search?q=average+calorie+information+for+${encodeURIComponent(foodItem)}`;
            window.open(lookupURL, '_blank');
        } else {
            alert('Please enter a food item first.');
        }
    };

    return (
        <div className="calories-container">
            <Navbar />
            <h2 className="title">
                <i className="fas fa-apple-alt icon"></i> Log Calories
            </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddCalories} className="calories-form">
                <div className="input-container">
                    <label htmlFor="intakeDate">Date:</label>
                    <input
                        type="date"
                        id="intakeDate"
                        className="input-field"
                        value={intakeDate}
                        onChange={(e) => setIntakeDate(e.target.value)}
                        required
                        max={new Date().toISOString().split("T")[0]} // Setting max to today's date
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="mealType">Meal Type:</label>
                    <select
                        id="mealType"
                        className="input-field"
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        required
                    >
                        <option value="">Select Meal Type</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                <div className="input-container">
                    <label htmlFor="foodItem">Food Item:</label>
                    <input
                        type="text"
                        id="foodItem"
                        className="input-field"
                        value={foodItem}
                        onChange={(e) => setFoodItem(e.target.value)}
                        required
                    />
                    <button type="button" className="lookup-btn" onClick={handleNutritionLookup}>Look Up Calories</button>
                </div>

                <div className="input-container">
                    <label htmlFor="calories">Calories:</label>
                    <input
                        type="number"
                        id="calories"
                        className="input-field"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" className="log-btn" disabled={loading}>
                    {loading ? "Adding..." : "Add Calories"}
                </button>
            </form>
        </div>
    );
};

export default CaloriesPage;
