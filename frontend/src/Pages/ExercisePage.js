// src/Pages/ExercisePage.js
import React, { useState } from 'react';
import './ExercisePage.css'; // Import your CSS for the page

const ExercisePage = () => {
    const [date, setDate] = useState('');
    const [exerciseDuration, setExerciseDuration] = useState('');

    const handleAddExercise = (e) => {
        e.preventDefault();
        console.log(`Logged ${exerciseDuration} minutes of exercise on ${date}`);
    };

    return (
        <div className="tracker-container">
            <h2 className="title">Log Exercise</h2>
            <form onSubmit={handleAddExercise} className="tracker-form">
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
                    <label htmlFor="exerciseDuration">Duration (minutes):</label>
                    <input
                        type="number"
                        id="exerciseDuration"
                        className="input-field"
                        value={exerciseDuration}
                        onChange={(e) => setExerciseDuration(e.target.value)}
                    />
                </div>

                <button type="submit" className="log-btn">Add Exercise</button>
            </form>
        </div>
    );
};

export default ExercisePage;


