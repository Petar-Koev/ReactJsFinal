const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  description: String,
  director: String,
  watchCount: Number,
  poster: String,
  runtime: String,
  genre: String
});

module.exports = mongoose.model('Movie', movieSchema);
