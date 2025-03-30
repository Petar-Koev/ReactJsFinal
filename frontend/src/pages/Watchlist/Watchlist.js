import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useWatchlists from "../../hooks/useWatchlist";
import EntryCard from "../../components/entryCard/EntryCard";
import Button from "../../components/button/Button";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import styles from "./Watchlist.module.css";

export default function Watchlist() {
  const { id } = useParams();
  const { userWatchlists, entries, removeEntry, toggleWatched } =
    useWatchlists();
  const [watchlist, setWatchlist] = useState(null);

  useEffect(() => {
    const current = userWatchlists.find((w) => w._id === id);
    if (current) setWatchlist(current);
  }, [id, userWatchlists]);

  if (!watchlist) return <p>Loading...</p>;

  const listEntries = entries.filter((e) => e.watchlistId === id);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h2>{watchlist.name}</h2>
          <p>Description: {watchlist.description}</p>
          <h3>Added movies: </h3>
        </div>
        <div className={styles.rightSide}>
          <p>
            Type:
            <strong>
              {watchlist.type === "private" ? "Private" : "Public"}
            </strong>
          </p>
          <p>
            Movie count: <strong>{listEntries.length}</strong>
          </p>
          <p>
            Created on{" "}
            <strong>
              {new Date(watchlist.createdAt).toLocaleDateString()}
            </strong>
          </p>
        </div>
      </div>

      <div className={styles.entries}>
        {listEntries.map((entry) => (
          <EntryCard
            key={entry._id}
            entry={entry}
            onToggleWatched={() => toggleWatched(entry._id, entry.watched)}
            onRemove={() => removeEntry(entry._id)}
          />
        ))}
      </div>
      <div className={styles.buttonArea}>
        <Button text={"Add movies"} to="/movies" />
      </div>
      <BackToTopButton />
    </div>
  );
}
