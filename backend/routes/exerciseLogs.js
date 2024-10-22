const express = require("express");
const router = express.Router();
const ExerciseLog = require("../models/ExerciseLog");

// Create new exercise log
router.post("/", async (req, res) => {
  const { userId, exercise_date, exercise_type, duration, calories_burned } =
    req.body;
  try {
    const newExerciseLog = new ExerciseLog({
      user,
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

module.exports = router;
