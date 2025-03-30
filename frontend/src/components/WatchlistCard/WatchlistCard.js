import Button from "../button/Button";
import useWatchlists from "../../hooks/useWatchlist";
import styles from "./WatchlistCard.module.css";

export default function WatchlistCard({ list, entries }) {
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
      <p className={styles.name}>{list.name}</p>
      <div className={styles.posterRow}>{posters}</div>
      <div className={styles.buttons}>
        <Button text="Open" to={`/watchlists/${list._id}`} />
        <Button text="Edit" to={`/watchlists/${list._id}/edit`} />
        <Button text="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
}
