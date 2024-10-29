import React, { useState } from 'react';
import axios from 'axios';
import './CaloriesPage.css';
import Navbar from "../../components/Navbar/Navbar";

const CaloriesPage = () => {
    const [mealType, setMealType] = useState('');
    const [foodItem, setFoodItem] = useState(''); // New input state for food item
    const [calories, setCalories] = useState('');
    const [intakeDate, setIntakeDate] = useState(''); // New input state for intake date
    const [message, setMessage] = useState('');

    const handleAddCalories = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        // Log the values to verify data before making the request
        console.log({ mealType, foodItem, intakeDate, calories });

        try {
            const response = await axios.post(
                '/api/calories',
                {
                    meal_type: mealType,
                    food_item: foodItem, // Add the food item
                    intake_date: intakeDate, // Add the intake date
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
        } catch (err) {
            console.error('Error logging calories:', err);
            setMessage('Failed to log calories. Please try again.');
        }
    };

    return (
        <div className="calories-container">
            <Navbar />
            <h2 className="title">Log Calories</h2>
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
                    />
                </div>

                <button type="submit" className="log-btn">Add Calories</button>
            </form>
        </div>
    );
};

export default CaloriesPage;
