import { useLocation, useParams } from "react-router-dom";
import useWatchlists from "../../hooks/useWatchlist";
import EntryCard from "../../components/entryCard/EntryCard";
import Button from "../../components/button/Button";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import styles from "./Watchlist.module.css";

export default function Watchlist() {
  const { id } = useParams();
  const {
    userWatchlists,
    entries,
    removeEntry,
    toggleWatched,
    publicWatchlists,
    publicEntries,
  } = useWatchlists();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPublic = searchParams.get("isPublic") === "true";

  const currentWatchlist =
    publicWatchlists.find((w) => w._id === id) ||
    userWatchlists.find((w) => w._id === id);

  if (!currentWatchlist) return <p>Loading...</p>;

  const currentEntries = isPublic
    ? publicEntries.filter((e) => e.watchlistId === id)
    : entries.filter((e) => e.watchlistId === id);

  return (
    <div className={styles.page}>
      <div className={styles.info}>
        <h1>{currentWatchlist.name}</h1>
        <h3>{currentWatchlist.description}</h3>
        <p>{currentWatchlist.type === "private" ? "Private" : "Public"}</p>
        <p>{currentEntries.length} Movies</p>
        <p>
          Created on{" "}
          <strong>
            {new Date(currentWatchlist.createdAt).toLocaleDateString()}
          </strong>
        </p>
      </div>
      <hr className={styles.divider} />
      <h3>Added movies: </h3>
      <div className={styles.entries}>
        {[...currentEntries]
          .sort((a, b) => a.watched - b.watched)
          .map((entry) => (
            <EntryCard
              key={entry._id}
              entry={entry}
              onToggleWatched={() => toggleWatched(entry._id, entry.watched)}
              onRemove={() => removeEntry(entry._id)}
              isPublic={isPublic}
            />
          ))}
      </div>
      {!isPublic && (
        <div className={styles.buttonArea}>
          <Button text={"Add movies"} to="/movies" />
        </div>
      )}
      <BackToTopButton />
    </div>
  );
}
