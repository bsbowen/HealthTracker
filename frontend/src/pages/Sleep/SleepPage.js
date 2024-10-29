import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './SleepPage.css'; // Import your CSS for the page
import Navbar from "../../components/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const SleepPage = () => {
    const [date, setDate] = useState('');
    const [sleepHours, setSleepHours] = useState('');
    const [message, setMessage] = useState(''); // To display success or error messages

    const [loading, setLoading] = useState(false);

    const handleAddSleep = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        setLoading(true);

        if (!token) {
            setMessage("User is not logged in");
            setTimeout(() => {
                window.location.href = "/login"; // Redirect to login page
            }, 1500);
            setLoading(false); // Set loading to false since there's no need to continue
            return;
        }

        try {
            const response = await axios.post(
                '/api/sleep',
                {
                    sleep_date: date,
                    sleep_duration: sleepHours,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(`Logged ${sleepHours} hours of sleep on ${date}`, response.data);
            setMessage('Sleep logged successfully');

            // Clear the input fields after successful logging
            setDate('');
            setSleepHours('');
        } catch (err) {
            console.error('Error logging sleep:', err);

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
            setLoading(false); // Stop loading once the request is finished
        }

    };


    return (
        <div className="sleep-container">
            <Navbar />
            <h2 className="title">
                <i className="fas fa-heartbeat icon"></i> Log Sleep
            </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddSleep} className="sleep-form">
                <div className="input-container">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        className="input-field"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        max={new Date().toISOString().split("T")[0]} // Setting max to today's date
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="sleepHours">Sleep Hours:</label>
                    <input
                        type="number"
                        id="sleepHours"
                        className="input-field"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(e.target.value)}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" className="log-btn" disabled={loading}>
                    {loading ? "Adding Sleep..." : "Add Sleep"}
                </button>
            </form>
        </div>
    );
};

export default SleepPage;

