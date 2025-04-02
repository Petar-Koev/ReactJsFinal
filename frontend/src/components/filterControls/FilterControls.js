import MovieGenre from "../../enums/movieGenre";

import styles from "./FilterControls.module.css";

export default function FilterControls({ genre, setGenre }) {
  return (
    <div className={styles.filterControls}>
      <label htmlFor="genreSelect">Filter by Genre:</label>
      <select
        id="genreSelect"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {Object.entries(MovieGenre).map(([key, label]) => (
          <option key={key} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
