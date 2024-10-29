// src/Pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardPage.css";
import Navbar from "../../components/Navbar/Navbar";
import CaloriesWidget from "../../components/Widgets/CaloriesWidget";
import ExerciseWidget from "../../components/Widgets/ExerciseWidget";
import SleepWidget from "../../components/Widgets/SleepWidget";
import '@fortawesome/fontawesome-free/css/all.min.css';

const DashboardPage = () => {
    const [calorieData, setCalorieData] = useState([]);
    const [exerciseData, setExerciseData] = useState([]);
    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        axios.get("/api/calories/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((response) => {
            setCalorieData(response.data);
        }).catch((error) => console.error("Error fetching calorie data:", error));

        axios.get("/api/exercise/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((response) => {
            setExerciseData(response.data);
        }).catch((error) => console.error("Error fetching exercise data:", error));

        axios.get("/api/sleep/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((response) => {
            setSleepData(response.data);
        }).catch((error) => console.error("Error fetching sleep data:", error));
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="card">
                <h2><i className="fas fa-apple-alt icon"></i> Total Calories</h2>
                <CaloriesWidget data={calorieData} />
            </div>
            <div className="card">
                <h2><i className="fas fa-running icon"></i> Total Exercise Duration</h2>
                <ExerciseWidget data={exerciseData} />
            </div>
            <div className="card">
                <h2><i className="fas fa-heartbeat icon"></i> Total Sleep Duration</h2>
                <SleepWidget data={sleepData} />
            </div>
        </div>
    );
};

export default DashboardPage;

