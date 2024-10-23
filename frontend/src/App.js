import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CaloriesPage from './Pages/CaloriesPage';
import ExercisePage from './Pages/ExercisePage';
import SleepPage from './Pages/SleepPage';
import DashboardPage from './Pages/DashboardPage';
import Login from './components/User/Login';

function App() {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    return (
        <Router>
            {/* Conditionally show the nav menu if the user is logged in */}
            {isLoggedIn && (
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/calories">Calories Tracker</Link></li>
                        <li><Link to="/exercise">Exercise Tracker</Link></li>
                        <li><Link to="/sleep">Sleep Tracker</Link></li>
                    </ul>
                </nav>
            )}

            <Routes>
                {/* Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Login />} />
                <Route path="/calories" element={isLoggedIn ? <CaloriesPage /> : <Login />} />
                <Route path="/exercise" element={isLoggedIn ? <ExercisePage /> : <Login />} />
                <Route path="/sleep" element={isLoggedIn ? <SleepPage /> : <Login />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
