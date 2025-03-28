import { useEffect, useState } from "react";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import Button from "../../components/button/Button";
import MovieCard from "../../components/movieCard/MovieCard";
import api from "../../services/api";
import { sortMovies } from "../../utils/moviesUtils";
import SortOptions from "../../enums/sortOptions";
import styles from "./Movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [sortOption, setSortOption] = useState("title");

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

  const sortedMovies = sortMovies(movies, sortOption);

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
        <Button
          className={sortOption === SortOptions.GENRE ? styles.active : ""}
          text={"Genre"}
          onClick={() => setSortOption("genre")}
        />
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
