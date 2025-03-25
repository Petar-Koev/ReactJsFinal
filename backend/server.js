require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

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
