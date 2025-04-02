import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import WatchlistCard from "../../components/WatchlistCard/WatchlistCard";
import useWatchlists from "../../hooks/useWatchlist";
import useAuth from "../../hooks/useAuth";

import styles from "./WatchlistCatalog.module.css";

export default function WatchlistCatalog() {
  const { publicWatchlists, publicEntries } = useWatchlists();
  const { user, isAuthenticated } = useAuth();

  // Watchlists from other users only.
  const otherPublicWatchlists = isAuthenticated
    ? publicWatchlists.filter((watchlist) => watchlist.user._id !== user._id)
    : [];

  const otherEntries = isAuthenticated
    ? publicEntries.filter((entry) => entry.userId !== user.id)
    : [];

  return (
    <>
      <h1 className={styles.title}>Popular watchlists:</h1>
      {isAuthenticated ? (
        <div className={styles.cards}>
          {otherPublicWatchlists.map((list) => {
            const listEntries = otherEntries.filter(
              (e) => e.watchlistId === list._id
            );
            return (
              <WatchlistCard
                key={list._id}
                list={list}
                entries={listEntries}
                isPublic={true}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.cards}>
          {publicWatchlists.map((list) => {
            const listEntries = publicEntries.filter(
              (e) => e.watchlistId === list._id
            );
            return (
              <WatchlistCard
                key={list._id}
                list={list}
                entries={listEntries}
                isPublic={true}
              />
            );
          })}
        </div>
      )}
      <BackToTopButton />
    </>
  );
}
