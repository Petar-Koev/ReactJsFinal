import { useEffect, useState } from "react";

import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import FilterControls from "../../components/filterControls/FilterControls";
import MovieCard from "../../components/movieCard/MovieCard";
import { sortMovies } from "../../utils/moviesUtils";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

import styles from "./Movies.module.css";
import SortControls from "../../components/sortControls/SortControls";

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
      <FilterControls genre={selectedGenre} setGenre={setSelectedGenre} />
      <SortControls
        sortOption={sortOption}
        setSort={setSortOption}
        isAuthenticated={isAuthenticated}
      />
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
