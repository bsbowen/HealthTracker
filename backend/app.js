require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db"); // Import the DB connection logic
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

// Middleware for parsing JSON
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB(); // Connect to MongoDB using the external config/db.js file

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const calorieEntryRoutes = require("./routes/calorieEntries");
const exerciseLogRoutes = require("./routes/exerciseLogs");
const sleepRecordRoutes = require("./routes/sleepRecords");

const authenticateToken = require('./middleware/auth');

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/calories", authenticateToken, calorieEntryRoutes);
app.use("/api/exercise", authenticateToken, exerciseLogRoutes);
app.use("/api/sleep", authenticateToken, sleepRecordRoutes);

// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Serve the main index.html file for any route that isn't part of your API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler"); // Import error handling middleware
app.use(errorHandler); // Use error handler

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
