import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './ExercisePage.css';
import Navbar from "../../components/Navbar/Navbar";

const ExercisePage = () => {
    const [date, setDate] = useState('');
    const [exerciseType, setExerciseType] = useState(''); // Add input state for exercise type
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState(''); // Add input state for optional calories burned
    const [message, setMessage] = useState('');

    const handleAddExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                '/api/exercise',
                {
                    exercise_date: date,
                    exercise_type: exerciseType,
                    duration: exerciseDuration,
                    calories_burned: caloriesBurned,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(`Logged ${exerciseDuration} minutes of ${exerciseType} on ${date}`, response.data);
            setMessage('Exercise logged successfully');
        } catch (err) {
            console.error('Error logging exercise:', err);
            setMessage('Failed to log exercise. Please try again.');
        }
    };

    return (
        <div className="tracker-container">
            <Navbar />
            <h2 className="title">Log Exercise</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddExercise} className="tracker-form">
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
                    <label htmlFor="exerciseType">Exercise Type:</label>
                    <input
                        type="text"
                        id="exerciseType"
                        className="input-field"
                        value={exerciseType}
                        onChange={(e) => setExerciseType(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="exerciseDuration">Duration (minutes):</label>
                    <input
                        type="number"
                        id="exerciseDuration"
                        className="input-field"
                        value={exerciseDuration}
                        onChange={(e) => setExerciseDuration(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="caloriesBurned">Calories Burned (optional):</label>
                    <input
                        type="number"
                        id="caloriesBurned"
                        className="input-field"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                    />
                </div>

                <button type="submit" className="log-btn">Add Exercise</button>
            </form>
        </div>
    );
};

export default ExercisePage;
