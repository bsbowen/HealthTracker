import React from 'react';

const ExerciseWidget = ({ data }) => {
    return (
        <div className="widget-container">
            {data.length === 0 ? (
                <p>No exercise data available.</p>
            ) : (
                <ul>
                    {data.map((entry, index) => (
                        <li key={index}>
                            {entry.duration} minutes of {entry.exercise_type} on {new Date(entry.exercise_date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExerciseWidget;

