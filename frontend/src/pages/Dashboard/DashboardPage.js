// src/Pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardPage.css";
import Navbar from "../../components/Navbar/Navbar";
import CaloriesWidget from "../../components/Widgets/CaloriesWidget";
import ExerciseWidget from "../../components/Widgets/ExerciseWidget";
import SleepWidget from "../../components/Widgets/SleepWidget";

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
        <div className="dashboard-page-container">
            <Navbar />
            <div className="dashboard-container">
                <div className="card">
                    <CaloriesWidget data={calorieData} />
                </div>
                <div className="card">
                    <ExerciseWidget data={exerciseData} />
                </div>
                <div className="card">
                    <SleepWidget data={sleepData} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
