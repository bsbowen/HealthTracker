import React, { useState } from 'react';
import CaloriesForm from '../components/Forms/CaloriesForm';
import CaloriesWidget from '../components/Widgets/CaloriesWidget';

const CaloriesPage = () => {
    const [caloriesData, setCaloriesData] = useState([]);

    const handleAddCalories = (entry) => {
        setCaloriesData([...caloriesData, entry]);
    };

    return (
        <div>
            <h2>Calories Tracker</h2>
            <CaloriesWidget caloriesData={caloriesData} />
            <CaloriesForm onAddCalories={handleAddCalories} />
        </div>
    );
};

export default CaloriesPage;


