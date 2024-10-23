import React, { useState } from 'react';
import SleepForm from '../components/Forms/SleepForm'; // Correct path to SleepForm
import SleepWidget from '../components/Widgets/SleepWidget';

const SleepPage = () => {
    const [sleepData, setSleepData] = useState([]);

    const handleAddSleep = (entry) => {
        setSleepData([...sleepData, entry]);
    };

    return (
        <div>
            <h2>Sleep Tracker</h2>
            <SleepWidget sleepData={sleepData} />
            <SleepForm onAddSleep={handleAddSleep} />
        </div>
    );
};

export default SleepPage;


