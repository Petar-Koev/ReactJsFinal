import { useEffect, useState } from "react";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import Button from "../../components/button/Button";
import MovieCard from "../../components/movieCard/MovieCard";
import api from "../../services/api";
import { sortMovies } from "../../utils/moviesUtils";
import SortOptions from "../../enums/sortOptions";
import MovieGenre from "../../enums/movieGenre";
import styles from "./Movies.module.css";
import useAuth from "../../hooks/useAuth";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [sortOption, setSortOption] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const { user, isAuthenticated } = useAuth();

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };
    fetchMovies();
  }, []);

  const sortedMovies = sortMovies(
    filteredMovies,
    sortOption,
    isAuthenticated ? user.likedMovies || [] : []
  );

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>This is our movies catalog!</h2>
      <div className={styles.filterControls}>
        <label htmlFor="genreSelect">Filter by Genre:</label>
        <select
          id="genreSelect"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {Object.entries(MovieGenre).map(([key, label]) => (
            <option key={key} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.sortControls}>
        <span>Sort by:</span>
        <Button
          className={sortOption === SortOptions.TITLE ? styles.active : ""}
          text={"Title"}
          onClick={() => setSortOption(SortOptions.TITLE)}
        />
        <Button
          className={sortOption === SortOptions.YEAR ? styles.active : ""}
          text={"Year"}
          onClick={() => setSortOption(SortOptions.YEAR)}
        />
        {isAuthenticated && (
          <Button
            className={
              sortOption === SortOptions.FAVORITES ? styles.active : ""
            }
            text={"Liked"}
            onClick={() => setSortOption(SortOptions.FAVORITES)}
          />
        )}
      </div>
      {sortedMovies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      ))}
      <BackToTopButton />
    </div>
  );
}
