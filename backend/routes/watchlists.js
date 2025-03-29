const router = require("express").Router();
const Watchlist = require("../models/watchlist");
const auth = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const WatchlistEntry = require("../models/watchlistEntry");

// Create a new watchlist
router.post("/", auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to create watchlist" });
  }
});

// Get all public watchlists
router.get("/", async (req, res) => {
  try {
    const lists = await Watchlist.find({ type: "public" }).populate(
      "user",
      "name"
    );
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching watchlists" });
  }
});

// Get a user watchlists
router.get("/mine", auth, async (req, res) => {
  try {
    const lists = await Watchlist.find({ user: req.user.id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your watchlists" });
  }
});

// GET /api/watchlists/user-entries
router.get("/user-entries", auth, async (req, res) => {
  try {
    const entries = await WatchlistEntry.find({ userId: req.user.id }).populate(
      "movieId"
    );

    res.json(entries);
  } catch (err) {
    console.error("ERROR in /user-entries:", err);
    res.status(500).json({ message: "Failed to fetch user entries" });
  }
});

// Get watchlist by ID
router.get("/:id", async (req, res) => {
  try {
    const list = await Watchlist.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (!list) return res.status(404).json({ message: "Not found" });

    const token = req.headers.authorization?.split(" ")[1];
    let loggedUserId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        loggedUserId = decoded.id;
      } catch (err) {}
    }

    // Block if private and user is not owner
    if (list.type === "private" && list.user._id.toString() !== loggedUserId) {
      return res.status(403).json({ message: "This watchlist is private." });
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error loading watchlist" });
  }
});

// Delete watchlist
router.delete("/:id", auth, async (req, res) => {
  const list = await Watchlist.findById(req.params.id);
  if (!list || list.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await list.deleteOne();
  res.sendStatus(204);
});

// Add a movie to a watchlist
router.post("/:id/entries", auth, async (req, res) => {
  const entry = await WatchlistEntry.create({
    watchlistId: req.params.id,
    movieId: req.body.movieId,
    userId: req.user.id,
  });
  res.status(201).json(entry);
});

// Get all entries in a watchlist
router.get("/:id/entries", async (req, res) => {
  const entries = await WatchlistEntry.find({
    watchlistId: req.params.id,
  }).populate("movieId");
  res.json(entries);
});

// Check / Uncheck movie
router.patch("/entries/:entryId", auth, async (req, res) => {
  const entry = await WatchlistEntry.findById(req.params.entryId);
  if (entry.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }
  entry.watched = req.body.watched;
  await entry.save();
  res.json(entry);
});

// Delete entry
router.delete("/entries/:entryId", auth, async (req, res) => {
  const entry = await WatchlistEntry.findById(req.params.entryId);
  if (entry.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }
  await entry.deleteOne();
  res.sendStatus(204);
});

module.exports = router;
