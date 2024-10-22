const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Define routes for user actions

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

module.exports = router;