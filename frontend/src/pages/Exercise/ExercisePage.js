import React, { useState } from 'react';
import axios from 'axios';
import './ExercisePage.css';
import Navbar from "../../components/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ExercisePage = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [exerciseDate, setExerciseDate] = useState('');
    const [message, setMessage] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');

    const handleAddExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                '/api/exercise',
                {
                    exercise_type: exerciseType,
                    duration: duration,
                    exercise_date: exerciseDate,
                    calories_burned: caloriesBurned,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(`Logged ${duration} minutes for ${exerciseType}`, response.data);
            setMessage('Exercise logged successfully');
        } catch (err) {
            console.error('Error logging exercise:', err);
            setMessage('Failed to log exercise. Please try again.');
        }
    };
    const handleLookupClick = () => {
        if (exerciseType && duration) {
          // This opens ChatGPT with a prompt about the exercise type and duration entered by the user
          const lookupURL = `https://www.google.com/search?q=calories+burned+for+${encodeURIComponent(exerciseType)}+for+${duration}+minutes`;
          window.open(lookupURL, '_blank');
        } else {
          alert('Please enter both exercise type and duration first.');
        }
      };


    return (
        <div className="exercise-container">
            <Navbar />
            <h2 className="title">
                <i className="fas fa-running icon"></i> Log Exercise
            </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddExercise} className="exercise-form">
                <div className="input-container">
                    <label htmlFor="exerciseDate">Date:</label>
                    <input
                        type="date"
                        id="exerciseDate"
                        className="input-field"
                        value={exerciseDate}
                        onChange={(e) => setExerciseDate(e.target.value)}
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
                    <label htmlFor="duration">Duration (minutes):</label>
                    <input
                        type="number"
                        id="duration"
                        className="input-field"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                     <button type="button" className="lookup-btn" onClick={handleLookupClick} >Look Up Calories Burned</button>
                </div>
                <div className="input-container">
                    <label htmlFor="caloriesBurned">Calories Burned:</label>
                    <input
                        type="number"
                        id="caloriesBurned"
                        className="input-field"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="log-btn">Add Exercise</button>
            </form>
        </div>
    );
};

export default ExercisePage;

