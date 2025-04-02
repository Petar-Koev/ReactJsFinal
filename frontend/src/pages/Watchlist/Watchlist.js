import { useLocation, useParams, useNavigate } from "react-router-dom";

import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import EntryCard from "../../components/entryCard/EntryCard";
import useWatchlists from "../../hooks/useWatchlist";
import Button from "../../components/button/Button";

import styles from "./Watchlist.module.css";
import WatchlistInfo from "../../components/watchlistInfo/WatchlistInfo";

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

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPublic = searchParams.get("isPublic") === "true";

  const currentWatchlist =
    publicWatchlists.find((w) => w._id === id) ||
    userWatchlists.find((w) => w._id === id);

  if (!currentWatchlist) {
    return navigate("/notFound");
  }

  const currentEntries = isPublic
    ? publicEntries.filter((e) => e.watchlistId === id)
    : entries.filter((e) => e.watchlistId === id);

  return (
    <div className={styles.page}>
      <WatchlistInfo watchlist={currentWatchlist} entries={currentEntries} />
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
