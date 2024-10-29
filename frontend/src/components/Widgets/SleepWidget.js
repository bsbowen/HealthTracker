import React from 'react';

const SleepWidget = ({ data }) => {
    return (
        <div className="widget-container">
            {data.length === 0 ? (
                <p>No sleep data available.</p>
            ) : (
                <ul>
                    {data.map((entry, index) => (
                        <li key={index}>
                            {entry.sleep_duration} hours on {new Date(entry.sleep_date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SleepWidget;

