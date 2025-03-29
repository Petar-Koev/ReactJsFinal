import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../button/Button";
import api from "../../services/api";
import useWatchlist from "../../hooks/useWatchlist";
import MovieDetailsList from "../MovieDetailsList/MovieDetailsList";
import DropdownMenu from "../dropdownMenu/DropdownMenu";

import styles from "./MovieCard.module.css";

export default function MovieCard({
  movie,
  openDropdownId,
  setOpenDropdownId,
}) {
  const { isAuthenticated, user, setUser } = useAuth();
  const { entries, removeEntry, addEntry } = useWatchlist();

  const [liked, setLiked] = useState(false);

  const isDropdownOpen = openDropdownId === movie._id;

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(movie._id);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.likedMovies) {
      setLiked(user.likedMovies.includes(movie._id));
    }
  }, [user, movie._id, isAuthenticated]);

  const toggleLike = async () => {
    try {
      const res = await api.post(`/auth/like/${movie._id}`);
      const updatedLikedMovies = res.data.likedMovies;

      setLiked(updatedLikedMovies.includes(movie._id));
      setUser((prev) => ({
        ...prev,
        likedMovies: updatedLikedMovies,
      }));
    } catch (err) {
      console.error("Failed to like movie", err);
    }
  };

  const handleAddToList = async (watchlistId) => {
    const existingEntry = entries.find((entry) => {
      const entryMovieId =
        typeof entry.movieId === "string" ? entry.movieId : entry.movieId?._id;

      return entryMovieId === movie._id && entry.watchlistId === watchlistId;
    });

    try {
      if (existingEntry) {
        await removeEntry(existingEntry._id);
      } else {
        await addEntry(watchlistId, movie._id);
      }
    } catch (err) {
      console.error("Failed to update watchlist entry", err);
    }
  };

  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.name} className={styles.poster} />

      <div className={styles.details}>
        <div className={styles.title}>
          <h2>{movie.name}</h2>
          {isAuthenticated && (
            <div className={styles.actions}>
              <span className={styles.heart} onClick={toggleLike}>
                {liked ? "❤️" : "🤍"}
              </span>

              <div className={styles.dropdownWrapper}>
                <Button text="Add to Watchlist" onClick={toggleDropdown} />
                {isDropdownOpen && (
                  <DropdownMenu
                    movie={movie}
                    handleAddToList={handleAddToList}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <MovieDetailsList
          items={[
            { label: "Year", value: movie.year },
            { label: "Genre", value: movie.genre },
            { label: "Runtime", value: movie.runtime },
            { label: "Director", value: movie.director },
            { label: "Description", value: movie.description },
          ]}
        />
      </div>
    </div>
  );
}
