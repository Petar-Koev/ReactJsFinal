const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/user");
const Movie = require("../models/movie");
const Watchlist = require("../models/watchlist");
const WatchlistEntry = require("../models/watchlistEntry");

const MONGO_URI = "mongodb://localhost:27017/wl";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await mongoose.connection.db.dropDatabase();
    console.log("Database cleared");

    const hashedPassword = await bcrypt.hash("123456", 10);
    const testUser = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: hashedPassword,
    });

    const movies = await Movie.insertMany([
      {
        name: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        runtime: "2h 28min",
        director: "Christopher Nolan",
        description: "A mind-bending thriller by Christopher Nolan.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      },
      {
        name: "The Matrix",
        year: 1999,
        genre: "Action",
        runtime: "2h 16min",
        director: "The Wachowskis",
        description:
          "A hacker discovers the world is a simulation and joins a rebellion.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg",
      },
      {
        name: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama",
        runtime: "2h 22min",
        director: "Frank Darabont",
        description: "Two imprisoned men bond over a number of years.",
        poster: "https://m.media-amazon.com/images/I/911USrdQtPL.jpg",
      },
      {
        name: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        runtime: "2h 49min",
        director: "Christopher Nolan",
        description:
          "A team of explorers travel through a wormhole in space to save humanity.",
        poster: "https://i.ebayimg.com/images/g/wbgAAOSwpTBkojnL/s-l1200.jpg",
      },
      {
        name: "The Dark Knight",
        year: 2008,
        genre: "Action",
        runtime: "2h 32min",
        director: "Christopher Nolan",
        description: "Batman faces the Joker in a battle for Gotham's soul.",
        poster:
          "https://cdn.europosters.eu/image/1300/posters/the-dark-knight-trilogy-batman-i198201.jpg",
      },
      {
        name: "Parasite",
        year: 2019,
        genre: "Drama",
        runtime: "2h 12min",
        director: "Bong Joon-ho",
        description:
          "A poor family schemes to become employed by a wealthy one.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
      },
      {
        name: "Fight Club",
        year: 1999,
        genre: "Drama",
        runtime: "2h 19min",
        director: "David Fincher",
        description:
          "An insomniac and a soap salesman form an underground fight club.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      },
    ]);

    const watchlist = await Watchlist.create({
      name: "Sci-Fi Favorites",
      description: "Top sci-fi picks from Test User",
      type: "public",
      user: testUser._id,
    });

    await WatchlistEntry.insertMany(
      movies.slice(0, 3).map((movie) => ({
        movieId: movie._id,
        userId: testUser._id,
        watchlistId: watchlist._id,
      }))
    );

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
