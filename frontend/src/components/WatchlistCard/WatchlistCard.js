import useWatchlists from "../../hooks/useWatchlist";
import Button from "../button/Button";

import styles from "./WatchlistCard.module.css";

export default function WatchlistCard({ list, entries, isPublic }) {
  const { deleteWatchlist } = useWatchlists();

  const handleDelete = () => {
    deleteWatchlist(list._id);
  };

  const posterPlaceholder =
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon-instagram-post-design-template-7f191da00465c7deac30cfd49313e5f6_screen.jpg?ts=1704369684";

  const posters = entries
    .slice(0, 3)
    .map((entry) => (
      <img
        key={entry._id}
        src={entry.movieId?.poster || posterPlaceholder}
        alt={entry.movieId?.name || "Movie poster"}
        className={styles.poster}
      />
    ));

  while (posters.length < 3) {
    posters.push(
      <img
        key={`placeholder-${posters.length}`}
        src={posterPlaceholder}
        alt="Placeholder"
        className={styles.poster}
      />
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.posterRow}>{posters}</div>
      <div className={styles.info}>
        <p className={styles.name}>{list.name}</p>
        <p>Movies: {entries.length}</p>
        <p>{list.type === "private" ? "Private" : "Public"}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          text="Open"
          to={`/watchlists/${list._id}?isPublic=${isPublic}`}
          className={styles.button}
        />
        {!isPublic && (
          <>
            <Button
              className={styles.button}
              text="Edit"
              to={`/watchlists/${list._id}/edit`}
            />
            <Button
              className={styles.button}
              text="Delete"
              onClick={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}
