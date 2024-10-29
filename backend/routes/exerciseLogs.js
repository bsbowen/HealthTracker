const express = require("express");
const router = express.Router();
const ExerciseLog = require("../models/ExerciseLog");
const authenticateToken = require("../middleware/auth"); // Add middleware to authenticate user

// Create new exercise log (POST)
router.post("/", authenticateToken, async (req, res) => {
  const { exercise_date, exercise_type, duration, calories_burned } = req.body;

  try {
    // Create a new exercise log using the authenticated user's ID
    const newExerciseLog = new ExerciseLog({
      userId: req.user.userId, // Attach userId from the token to associate the exercise log with the user
      exercise_date,
      exercise_type,
      duration,
      calories_burned,
    });

    const savedExerciseLog = await newExerciseLog.save();
    res.status(201).json(savedExerciseLog);
  } catch (err) {
    console.error("Failed to create exercise log:", err);
    res.status(500).json({ error: "Failed to create exercise log" });
  }
});

// Get all exercise logs for the authenticated user (GET)
router.get("/user", authenticateToken, async (req, res) => {
  try {
    // Fetch all exercise logs for the authenticated user
    const logs = await ExerciseLog.find({ userId: req.user.userId });
    res.json(logs);
  } catch (err) {
    console.error("Failed to fetch user exercise logs:", err);
    res.status(500).json({ error: "Failed to fetch user exercise logs" });
  }
});

// Get a specific exercise log by ID (GET by id)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const log = await ExerciseLog.findById(req.params.id);

    // Ensure the log belongs to the authenticated user
    if (!log || log.userId.toString() !== req.user.userId) {
      return res.status(404).json({ error: "Exercise log not found" });
    }

    res.json(log);
  } catch (err) {
    console.error("Failed to fetch exercise log:", err);
    res.status(500).json({ error: "Failed to fetch exercise log" });
  }
});

// Update an exercise log (PUT)
router.put("/:id", authenticateToken, async (req, res) => {
  const { exercise_date, exercise_type, duration, calories_burned } = req.body;

  try {
    const log = await ExerciseLog.findById(req.params.id);

    // Ensure the log belongs to the authenticated user
    if (!log || log.userId.toString() !== req.user.userId) {
      return res.status(404).json({ error: "Exercise log not found" });
    }

    // Update the exercise log with new data
    log.exercise_date = exercise_date || log.exercise_date;
    log.exercise_type = exercise_type || log.exercise_type;
    log.duration = duration || log.duration;
    log.calories_burned = calories_burned || log.calories_burned;

    const updatedLog = await log.save();
    res.json(updatedLog);
  } catch (err) {
    console.error("Failed to update exercise log:", err);
    res.status(500).json({ error: "Failed to update exercise log" });
  }
});

// Delete an exercise log (DELETE)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const log = await ExerciseLog.findById(req.params.id);

    // Ensure the log belongs to the authenticated user
    if (!log || log.userId.toString() !== req.user.userId) {
      return res.status(404).json({ error: "Exercise log not found" });
    }

    await log.deleteOne();
    res.json({ message: "Exercise log deleted successfully" });
  } catch (err) {
    console.error("Failed to delete exercise log:", err);
    res.status(500).json({ error: "Failed to delete exercise log" });
  }
});

module.exports = router;
