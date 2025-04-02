import styles from "./WatchlistInfo.module.css";

export default function WatchlistInfo({ watchlist, entries }) {
  return (
    <div className={styles.info}>
      <h1>{watchlist.name}</h1>
      <h3>{watchlist.description}</h3>
      <p>{watchlist.type === "private" ? "Private" : "Public"}</p>
      {}
      <p>
        {entries.length}{" "}
        {entries.length > 1 || entries.length === 0 ? "Movies" : "Movie"}
      </p>
      <p>
        Created on{" "}
        <strong>{new Date(watchlist.createdAt).toLocaleDateString()}</strong>
      </p>
    </div>
  );
}
