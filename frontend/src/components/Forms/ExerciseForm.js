import React, { useState } from 'react';

const ExerciseForm = ({ onAddExercise }) => {
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date && duration) {
            onAddExercise({ date, duration: parseInt(duration) });
            setDate('');
            setDuration('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Duration (minutes):</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Exercise</button>
        </form>
    );
};

export default ExerciseForm;
