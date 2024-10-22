const express = require("express");
const router = express.Router();
const CalorieEntry = require("../models/CalorieEntry");

// Create a new calorie entry
router.post("/", async (req, res) => {
  const {
    userId,
    intake_date,
    meal_type,
    food_item,
    calories,
    protein,
    carbohydrates,
    fat,
  } = req.body;

  try {
    const newEntry = new CalorieEntry({
      user,
      intake_date,
      meal_type,
      food_item,
      calories,
      protein,
      carbohydrates,
      fat,
    });
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to create entry" });
  }
});

module.exports = router;
