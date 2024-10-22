const express = require('express');
const router = express.Router();
const SleepRecord = require('../models/SleepRecord');

// Create new sleep record
router.post('/', async (req, res) => {
  const { userId, sleep_date, sleep_duration, sleep_quality } = req.body;
  try {
    const newSleepRecord = new SleepRecord({ user, sleep_date, sleep_duration, sleep_quality });
    const savedSleepRecord = await newSleepRecord.save();
    res.json(savedSleepRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sleep record' });
  }
});

module.exports = router;