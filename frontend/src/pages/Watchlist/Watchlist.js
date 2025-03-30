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
      <div className={styles.header}>
        <div className={styles.info}>
          <h2>{currentWatchlist.name}</h2>
          <p>Description: {currentWatchlist.description}</p>
          <h3>Added movies: </h3>
        </div>
        <div className={styles.rightSide}>
          <p>
            Type:
            <strong>
              {currentWatchlist.type === "private" ? "Private" : "Public"}
            </strong>
          </p>
          <p>
            Movie count: <strong>{currentEntries.length}</strong>
          </p>
          <p>
            Created on{" "}
            <strong>
              {new Date(currentWatchlist.createdAt).toLocaleDateString()}
            </strong>
          </p>
        </div>
      </div>

      <div className={styles.entries}>
        {currentEntries.map((entry) => (
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
