import React, { useState } from 'react';

const CaloriesForm = ({ onAddCalories }) => {
    const [date, setDate] = useState('');
    const [calories, setCalories] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date && calories) {
            onAddCalories({ date, calories: parseInt(calories) });
            setDate('');
            setCalories('');
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
                <label>Calories:</label>
                <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Calories</button>
        </form>
    );
};

export default CaloriesForm;
