const express = require('express');
const router = express.Router();
const SleepRecord = require('../models/SleepRecord');

// Create a new sleep record (POST)
router.post('/', async (req, res) => {
  const { userId, sleep_date, sleep_duration, sleep_quality } = req.body;
  try {
    const newSleepRecord = new SleepRecord({
      userId,
      sleep_date,
      sleep_duration,
      sleep_quality,
    });
    const savedSleepRecord = await newSleepRecord.save();
    res.json(savedSleepRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sleep record' });
  }
});

// Get all sleep records (GET)
router.get('/', async (req, res) => {
  try {
    const records = await SleepRecord.find(); // Fetch all sleep records
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sleep records' });
  }
});

// Get all sleep records for a specific user (GET by userId)
router.get('/user/:userId', async (req, res) => {
  try {
    const records = await SleepRecord.find({ userId: req.params.userId }); // Fetch by userId
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user sleep records' });
  }
});

// Get a single sleep record by ID (GET by id)
router.get('/:id', async (req, res) => {
  try {
    const record = await SleepRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Sleep record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sleep record' });
  }
});

// Update a sleep record (PUT)
router.put('/:id', async (req, res) => {
  const { sleep_date, sleep_duration, sleep_quality } = req.body;
  try {
    const updatedRecord = await SleepRecord.findByIdAndUpdate(
        req.params.id,
        {
          sleep_date,
          sleep_duration,
          sleep_quality,
        },
        { new: true } // Return the updated document
    );
    if (!updatedRecord) return res.status(404).json({ error: 'Sleep record not found' });
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update sleep record' });
  }
});

// Delete a sleep record (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await SleepRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ error: 'Sleep record not found' });
    res.json({ message: 'Sleep record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete sleep record' });
  }
});

module.exports = router;
