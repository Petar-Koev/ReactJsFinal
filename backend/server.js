require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const watchlistRoutes = require('./routes/watchlists');

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlists', watchlistRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Root route for testing
app.get('/', (req, res) => {
  res.send('Watch Me Later backend is running!');
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
