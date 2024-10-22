const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise_date: { type: Date, required: true },
  exercise_type: { type: String, required: true }, // e.g., Running, Swimming
  duration: { type: Number, required: true }, // in minutes
  calories_burned: { type: Number } // optional field to track calories burned
});

const ExerciseLog = mongoose.model('ExerciseLog', exerciseLogSchema);

module.exports = ExerciseLog;