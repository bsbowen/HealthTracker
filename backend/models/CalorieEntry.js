const mongoose = require('mongoose');

const calorieEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  intake_date: { type: Date, required: true },
  meal_type: { type: String, required: true },
  food_item: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number },
  carbohydrates: { type: Number },
  fat: { type: Number }
});

const CalorieEntry = mongoose.model('CalorieEntry', calorieEntrySchema);

module.exports = CalorieEntry;