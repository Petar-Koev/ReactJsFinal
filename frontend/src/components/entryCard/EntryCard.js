import styles from "./EntryCard.module.css";

export default function EntryCard({
  entry,
  onToggleWatched,
  onRemove,
  isPublic,
}) {
  const { movieId: movie, createdAt, watched } = entry;

  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.name} className={styles.poster} />

      <div className={styles.details}>
        <h3>{movie.name}</h3>
        <p>{movie.runtime}</p>
        <p className={styles.added}>
          Added: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      {!isPublic && (
        <div className={styles.actions}>
          <input
            type="checkbox"
            checked={watched}
            onChange={onToggleWatched}
            title="Mark as watched"
          />
          <button
            onClick={onRemove}
            title="Remove entry"
            className={styles.remove}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}
