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

    // Recommended intake data
    const dailyIntakeRecommendations = [
        { nutrient: "Calories", amount: "1,800-2,400 kcal" },
        { nutrient: "Protein", amount: "46 grams" },
        { nutrient: "Carbohydrates", amount: "225-325 grams" },
        { nutrient: "Fat", amount: "70 grams" },
        { nutrient: "Fiber", amount: "25 grams" },
        { nutrient: "Iron", amount: "18 mg" },
        { nutrient: "Calcium", amount: "1,000 mg" },
        { nutrient: "Vitamin D", amount: "600 IU" },
        { nutrient: "Vitamin C", amount: "75 mg" }
    ];

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
            <div className="dashboard-content">
                {/* Left-side chart */}
                <div className="card recommended-intake">
                    <h2><i className="fas fa-utensils icon"></i> Recommended Daily Intake</h2>
                    <table className="intake-table">
                        <thead>
                        <tr>
                            <th>Nutrient</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dailyIntakeRecommendations.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nutrient}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* Right-side widgets */}
                <div className="widgets-container">
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
            </div>
        </div>
    );
};

export default DashboardPage;


