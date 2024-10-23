import React from 'react';

const SleepWidget = ({ data }) => {
    return (
        <div className="widget-container">
            <h2>Total Sleep Duration</h2>
            <ul>
                {data.map((entry, index) => (
                    <li key={index}>{entry.hours} hours on {entry.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default SleepWidget;