import React from 'react';

const CaloriesWidget = ({ data }) => {
    return (
        <div className="widget-container">
            <h2>Total Calories</h2>
            {data.length === 0 ? (
                <p>No calorie data available.</p>
            ) : (
                <ul>
                    {data.map((entry, index) => (
                        <li key={index}>
                            {entry.calories} calories from {entry.food_item} on {new Date(entry.intake_date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CaloriesWidget;
