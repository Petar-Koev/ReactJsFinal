const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  watchlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Watchlist' },
  watched: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WatchlistEntry', entrySchema);
