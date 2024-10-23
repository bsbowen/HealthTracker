import React, { useState } from 'react';

const SleepForm = ({ onAddSleep }) => {
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date && hours) {
            onAddSleep({ date, hours: parseFloat(hours) });
            setDate('');
            setHours('');
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
                <label>Hours of Sleep:</label>
                <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Sleep</button>
        </form>
    );
};

export default SleepForm;
