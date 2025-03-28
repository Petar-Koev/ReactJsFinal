const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/authMiddleware");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.post("/like/:movieId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.likedMovies.indexOf(movieId);

    if (index === -1) {
      user.likedMovies.push(movieId);
    } else {
      user.likedMovies.splice(index, 1);
    }

    await user.save();

    res.status(200).json({
      likedMovies: user.likedMovies,
      message: index === -1 ? "Movie liked" : "Movie unliked",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error toggling like", error: err.message });
  }
});

module.exports = router;
