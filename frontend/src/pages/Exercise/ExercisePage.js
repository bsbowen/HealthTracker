import React, { useState } from 'react';
import axios from 'axios';
import './ExercisePage.css';
import Navbar from "../../components/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ExercisePage = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [exerciseDate, setExerciseDate] = useState('');
    const [message, setMessage] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');

    const [loading, setLoading] = useState(false);

    const handleAddExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        setLoading(true);

        // Check if the user is logged in before proceeding
        if (!token) {
            setMessage("User is not logged in");
            setTimeout(() => {
                window.location.href = "/login"; // Redirect to login page after a short delay
            }, 1500);
            setLoading(false); // Reset loading state since user is not logged in
            return; // Stop further execution of the function
        }

        try {
            const response = await axios.post(
                '/api/exercise',
                {
                    exercise_type: exerciseType,
                    duration: duration,
                    exercise_date: exerciseDate,
                    calories_burned: caloriesBurned,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(`Logged ${duration} minutes for ${exerciseType}`, response.data);
            setMessage('Exercise logged successfully');

            // Clear the form fields after successful submission
            setExerciseType('');
            setDuration('');
            setExerciseDate('');
            setCaloriesBurned('');

            // Scroll back to the top or focus on the first input field for better UX
            window.scrollTo(0, 0);
        } catch (err) {
            console.error('Error logging exercise:', err);

            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                switch (err.response.status) {
                    case 400:
                        setMessage('Bad Request: Please check the data you entered.');
                        break;
                    case 401:
                        setMessage('Unauthorized: Please log in again.');
                        setTimeout(() => {
                            window.location.href = "/login"; // Redirect to login page after 1.5 seconds
                        }, 1500);
                        break;
                    case 403:
                        setMessage('Forbidden: You do not have permission to perform this action.');
                        break;
                    case 404:
                        setMessage('Not Found: The requested resource could not be found.');
                        break;
                    case 500:
                        setMessage('Server Error: Something went wrong on our end. Please try again later.');
                        break;
                    default:
                        setMessage(`Error: ${err.response.statusText}. Please try again.`);
                }
            } else if (err.request) {
                // The request was made but no response was received
                setMessage('No response from server. Please check your internet connection or try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Ensure loading is reset no matter the outcome
        }

    };

    const handleLookupClick = () => {
        if (exerciseType && duration) {
          // This opens ChatGPT with a prompt about the exercise type and duration entered by the user
          const lookupURL = `https://www.google.com/search?q=calories+burned+for+${encodeURIComponent(exerciseType)}+for+${duration}+minutes`;
          window.open(lookupURL, '_blank');
        } else {
          alert('Please enter both exercise type and duration first.');
        }
      };

    return (
        <div className="exercise-container">
            <Navbar />
            <h2 className="title">
                <i className="fas fa-running icon"></i> Log Exercise
            </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddExercise} className="exercise-form">
                <div className="input-container">
                    <label htmlFor="exerciseDate">Date:</label>
                    <input
                        type="date"
                        id="exerciseDate"
                        className="input-field"
                        value={exerciseDate}
                        onChange={(e) => setExerciseDate(e.target.value)}
                        required
                        max={new Date().toISOString().split("T")[0]} // Setting max to today's date
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="exerciseType">Exercise Type:</label>
                    <input
                        type="text"
                        id="exerciseType"
                        className="input-field"
                        value={exerciseType}
                        onChange={(e) => setExerciseType(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="duration">Duration (minutes):</label>
                    <input
                        type="number"
                        id="duration"
                        className="input-field"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        min="0"
                    />
                    <button type="button" className="lookup-btn" onClick={handleLookupClick}>Look Up Calories Burned
                    </button>
                </div>
                <div className="input-container">
                    <label htmlFor="caloriesBurned">Calories Burned:</label>
                    <input
                        type="number"
                        id="caloriesBurned"
                        className="input-field"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        min="0"
                    />
                </div>
                <button type="submit" className="log-btn" disabled={loading}>
                    {loading ? "Logging Exercise..." : "Add Exercise"}
                </button>
            </form>
        </div>
    );
};

export default ExercisePage;

