const express = require("express");
const router = express.Router();
const CalorieEntry = require("../models/CalorieEntry");
const authenticateToken = require("../middleware/auth");

// Create a new calorie entry (POST)
router.post("/", authenticateToken, async (req, res) => {
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
      userId,
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

// Get all calorie entries (GET)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const entries = await CalorieEntry.find(); // Fetch all entries
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// Get all entries for a specific user (GET by userId)
router.get("/user", authenticateToken, async (req, res) => {
  try {
    // Using the userId from the token payload
    const userId = req.user.id;

    const entries = await CalorieEntry.find({ userId: req.params.userId }); // Fetch by userId
    res.json(entries);
  } catch (err) {
    console.error('Error fetching user entries:', err);
    res.status(500).json({ error: "Failed to fetch user entries" });
  }
});

// Get a single calorie entry by ID (GET by id)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const entry = await CalorieEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the entry" });
  }
});

// Update a calorie entry (PUT)
router.put("/:id", authenticateToken, async (req, res) => {
  const {
    intake_date,
    meal_type,
    food_item,
    calories,
    protein,
    carbohydrates,
    fat,
  } = req.body;

  try {
    const updatedEntry = await CalorieEntry.findByIdAndUpdate(
        req.params.id,
        {
          intake_date,
          meal_type,
          food_item,
          calories,
          protein,
          carbohydrates,
          fat,
        },
        { new: true } // Return the updated document
    );
    if (!updatedEntry)
      return res.status(404).json({ error: "Entry not found" });
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update entry" });
  }
});

// Delete a calorie entry (DELETE)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedEntry = await CalorieEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry)
      return res.status(404).json({ error: "Entry not found" });
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;
