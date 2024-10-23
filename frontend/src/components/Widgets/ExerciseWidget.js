import React from 'react';

const ExerciseWidget = ({ data }) => {
    return (
        <div className="widget-container">
            <h2>Total Exercise Duration</h2>
            <ul>
                {data.map((entry, index) => (
                    <li key={index}>{entry.duration} minutes on {entry.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseWidget;