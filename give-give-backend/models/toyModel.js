const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  age_recommendation: { type: String },
  price_recommendation: { type: String },
  additional_info: { type: Object } // For any extra details the user adds
});

module.exports = mongoose.model('Toy', toySchema);
