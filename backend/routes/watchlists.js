const router = require('express').Router();
const Watchlist = require('../models/watchlist');
const auth = require('../middleware/authMiddleware');

// Create a new watchlist 
router.post('/', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create watchlist' });
  }
});

// Get all public watchlists
router.get('/', async (req, res) => {
  try {
    const lists = await Watchlist.find({ type: 'public' }).populate('user', 'name');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching watchlists' });
  }
});

// Get a user watchlists 
router.get('/mine', auth, async (req, res) => {
  try {
    const lists = await Watchlist.find({ user: req.user.id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your watchlists' });
  }
});

// Get watchlist by ID 
router.get('/:id', async (req, res) => {
  try {
    const list = await Watchlist.findById(req.params.id).populate('user', 'name');
    res.json(list);
  } catch (err) {
    res.status(404).json({ message: 'Watchlist not found' });
  }
});

// Delete watchlist 
router.delete('/:id', auth, async (req, res) => {
  const list = await Watchlist.findById(req.params.id);
  if (!list || list.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await list.deleteOne();
  res.sendStatus(204);
});

module.exports = router;
