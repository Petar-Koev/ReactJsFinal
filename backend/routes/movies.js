const router = require('express').Router();
const Movie = require('../models/movie');

// GET /api/movies - fetch all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

// GET /api/movies/:id - fetch one movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (err) {
    res.status(404).json({ message: 'Movie not found' });
  }
});

module.exports = router;
