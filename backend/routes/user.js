const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const CalorieEntry = require('../models/CalorieEntry'); // Import CalorieEntry model
const ExerciseLog = require('../models/ExerciseLog');   // Import ExerciseLog model
const SleepRecord = require('../models/SleepRecord');   // Import SleepRecord model

// POST route for creating a user
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// GET route for fetching a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT route to update user by userId
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName,
          lastName,
          email,
          password, // If password is being updated, ensure you hash it properly
        },
        { new: true } // Returns the updated document
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE route to delete a user and all associated entries by userId
router.delete('/:id', async (req, res) => {
  try {
    // Delete the user
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cascade delete: Remove all related entries
    await CalorieEntry.deleteMany({ userId: req.params.id });
    await ExerciseLog.deleteMany({ userId: req.params.id });
    await SleepRecord.deleteMany({ userId: req.params.id });

    res.json({ message: 'User and associated entries deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user and associated entries' });
  }
});

module.exports = router;
