import { useEffect, useState } from "react";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import Button from "../../components/button/Button";
import MovieCard from "../../components/movieCard/MovieCard";
import api from "../../services/api";
import { sortMovies } from "../../utils/moviesUtils";
import SortOptions from "../../enums/sortOptions";
import MovieGenre from "../../enums/movieGenre";
import styles from "./Movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [sortOption, setSortOption] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState("All");

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

  const sortedMovies = sortMovies(filteredMovies, sortOption);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>This is our movies catalog!</h2>
      <div className={styles.sortControls}>
        <span>Sort by:</span>
        <Button
          className={sortOption === SortOptions.TITLE ? styles.active : ""}
          text={"Title"}
          onClick={() => setSortOption("title")}
        />
        <Button
          className={sortOption === SortOptions.YEAR ? styles.active : ""}
          text={"Year"}
          onClick={() => setSortOption("year")}
        />
      </div>
      <div className={styles.filterControls}>
        <label htmlFor="genreSelect">Filter by Genre:</label>
        <select
          id="genreSelect"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value={MovieGenre.ALL}>{MovieGenre.ALL}</option>
          <option value={MovieGenre.DRAMA}>{MovieGenre.DRAMA}</option>
          <option value={MovieGenre.MYSTERY}>{MovieGenre.MYSTERY}</option>
          <option value={MovieGenre.SCIFI}>{MovieGenre.SCIFI}</option>
          <option value={MovieGenre.COMEDY}>{MovieGenre.COMEDY}</option>
          <option value={MovieGenre.ACTION}>{MovieGenre.ACTION}</option>
          <option value={MovieGenre.CRIME}>{MovieGenre.CRIME}</option>
        </select>
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
