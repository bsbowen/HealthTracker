import React, { useState } from 'react';
import ExerciseForm from '../components/Forms/ExerciseForm';
import ExerciseWidget from '../components/Widgets/ExerciseWidget';

const ExercisePage = () => {
    const [exerciseData, setExerciseData] = useState([]);

    const handleAddExercise = (entry) => {
        setExerciseData([...exerciseData, entry]);
    };

    return (
        <div>
            <h2>Exercise Tracker</h2>
            <ExerciseWidget exerciseData={exerciseData} />
            <ExerciseForm onAddExercise={handleAddExercise} />
        </div>
    );
};

export default ExercisePage;

