import React from 'react';

const CaloriesWidget = ({ data }) => {
    return (
        <div className="widget-container">
            <h2>Total Calories</h2>
            <ul>
                {data.map((entry, index) => (
                    <li key={index}>{entry.amount} calories on {entry.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default CaloriesWidget;