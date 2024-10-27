// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css"; // Link to the CSS file
import Navbar from "./Navbar";

const DashboardPage = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [exerciseDuration, setExerciseDuration] = useState(0);
  const [sleepDuration, setSleepDuration] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch calorie entries
    axios
      .get("/api/calories/user/:userId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const calorieData = response.data;
        // Assuming the response is an array of entries, sum them up
        const total = calorieData.reduce(
          (acc, entry) => acc + entry.calories,
          0
        );
        setTotalCalories(total);
        if (calorieData.length > 0) setDate(calorieData[0].intake_date); // Example of getting the latest date
      })
      .catch((error) => console.error("Error fetching calorie data:", error));

    // Fetch exercise logs
    axios
      .get("/api/exercise/user/:userId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const exerciseData = response.data;
        // Sum all exercise durations
        const total = exerciseData.reduce(
          (acc, entry) => acc + entry.duration,
          0
        );
        setExerciseDuration(total);
      })
      .catch((error) => console.error("Error fetching exercise data:", error));

    // Fetch sleep records
    axios
      .get("/api/sleep/user/:userId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const sleepData = response.data;
        // Sum all sleep durations
        const total = sleepData.reduce(
          (acc, entry) => acc + entry.sleep_duration,
          0
        );
        setSleepDuration(total);
      })
      .catch((error) => console.error("Error fetching sleep data:", error));
  }, []);

  return (
    <div className="container">
    <div className="dashboard-container">
        <Navbar />
        {/* Total Calories */}
        <div className="card">
            <h3 className="card-title">Total Calories</h3>
            <p className="card-content">
                • {totalCalories} calories on {date}
            </p>
        </div>

        {/* Total Exercise Duration */}
        <div className="card">
            <h3 className="card-title">Total Exercise Duration</h3>
            <p className="card-content">
                • {exerciseDuration} minutes on {date}
            </p>
        </div>

        {/* Total Sleep Duration */}
        <div className="card">
            <h3 className="card-title">Total Sleep Duration</h3>
            <p className="card-content">
                • {sleepDuration} hours on {date}
            </p>
        </div>
    </div>
</div>

  );
};

export default DashboardPage;
