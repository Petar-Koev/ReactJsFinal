const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['public', 'private'], default: 'private' }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
