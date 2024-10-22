const express = require("express");
const router = express.Router();
const ExerciseLog = require("../models/ExerciseLog");

// Create new exercise log (POST)
router.post("/", async (req, res) => {
  const { userId, exercise_date, exercise_type, duration, calories_burned } = req.body;
  try {
    const newExerciseLog = new ExerciseLog({
      userId,
      exercise_date,
      exercise_type,
      duration,
      calories_burned,
    });
    const savedExerciseLog = await newExerciseLog.save();
    res.json(savedExerciseLog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create exercise log" });
  }
});

// Get all exercise logs (GET)
router.get("/", async (req, res) => {
  try {
    const logs = await ExerciseLog.find(); // Fetch all logs
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercise logs" });
  }
});

// Get all exercise logs for a specific user (GET by userId)
router.get("/user/:userId", async (req, res) => {
  try {
    const logs = await ExerciseLog.find({ userId: req.params.userId }); // Fetch by userId
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user exercise logs" });
  }
});

// Get a specific exercise log by ID (GET by id)
router.get("/:id", async (req, res) => {
  try {
    const log = await ExerciseLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "Exercise log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercise log" });
  }
});

// Update an exercise log (PUT)
router.put("/:id", async (req, res) => {
  const { exercise_date, exercise_type, duration, calories_burned } = req.body;
  try {
    const updatedLog = await ExerciseLog.findByIdAndUpdate(
        req.params.id,
        {
          exercise_date,
          exercise_type,
          duration,
          calories_burned,
        },
        { new: true } // Return the updated document
    );
    if (!updatedLog) return res.status(404).json({ error: "Exercise log not found" });
    res.json(updatedLog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update exercise log" });
  }
});

// Delete an exercise log (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedLog = await ExerciseLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ error: "Exercise log not found" });
    res.json({ message: "Exercise log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete exercise log" });
  }
});

module.exports = router;
