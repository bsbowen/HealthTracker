const mongoose = require('mongoose');

const sleepRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sleep_date: { type: Date, required: true },
  sleep_duration: { type: Number, required: true }, // in hours
  sleep_quality: { type: String } // e.g., Good, Average, Poor
});

const SleepRecord = mongoose.model('SleepRecord', sleepRecordSchema);

module.exports = SleepRecord;