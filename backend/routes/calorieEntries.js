const express = require("express");
const router = express.Router();
const CalorieEntry = require("../models/CalorieEntry");
const authenticateToken = require("../middleware/auth");

/// Create a new calorie entry (POST)
router.post('/', authenticateToken, async (req, res) => {
  console.log("Incoming request body:", req.body); // Debug line
  const { meal_type, food_item, intake_date, calories, protein, carbohydrates, fat } = req.body;

  try {
    const newEntry = new CalorieEntry({
      userId: req.user.userId, // Use userId from the token
      meal_type,
      food_item: food_item || "food",
      intake_date: intake_date || new Date().toISOString().split("T")[0], // Defaults to today’s date
      calories,
      protein: protein || 0,
      carbohydrates: carbohydrates || 0,
      fat: fat || 0
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error('Error creating calorie entry:', err);
    res.status(500).json({ error: 'Failed to create calorie entry' });
  }
});


// Get all calorie entries (GET)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const entries = await CalorieEntry.find(); // Fetch all entries
    res.json(entries);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// Get all entries for a specific user (GET by userId)
router.get("/user", authenticateToken, async (req, res) => {
  try {
    // Using the userId from the token payload
    const userId = req.user.userId; // Extract userId from req.user

    const entries = await CalorieEntry.find({ userId }); // Fetch entries by userId
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
    console.error('Error fetching calorie entry:', err);
    res.status(500).json({ error: "Failed to fetch the entry" });
  }
});

// Update a calorie entry (PUT)
router.put("/:id", authenticateToken, async (req, res) => {
  const {
    meal_type,
    calories,
    protein,
    carbohydrates,
    fat,
  } = req.body;

  try {
    const updatedEntry = await CalorieEntry.findByIdAndUpdate(
        req.params.id,
        {
          meal_type,
          calories,
          protein,
          carbohydrates,
          fat,
        },
        { new: true } // Return the updated document
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(updatedEntry);
  } catch (err) {
    console.error('Error updating calorie entry:', err);
    res.status(500).json({ error: "Failed to update entry" });
  }
});

// Delete a calorie entry (DELETE)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedEntry = await CalorieEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error('Error deleting calorie entry:', err);
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;
