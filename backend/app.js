const express = require("express");
const path = require('path');
const connectDB = require("./config/db"); // Import the DB connection logic
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const calorieEntryRoutes = require("./routes/calorieEntries");
const exerciseLogRoutes = require("./routes/exerciseLogs");
const sleepRecordRoutes = require("./routes/sleepRecords");

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/calories", calorieEntryRoutes);
app.use("/api/exercise", exerciseLogRoutes);
app.use("/api/sleep", sleepRecordRoutes);

// Serve index.html when the root URL is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler"); // Import error handling middleware
app.use(errorHandler); // Use error handler

// Connect to MongoDB
connectDB(); // Connect to MongoDB using the external config/db.js file

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
