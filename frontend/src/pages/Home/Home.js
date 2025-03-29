import Button from "../../components/button/Button";
import useAuth from "../../hooks/useAuth";
import useWatchlists from "../../hooks/useWatchlist";
import WatchlistCard from "../../components/WatchlistCard/WatchlistCard";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import styles from "./Home.module.css";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { userWatchlists, entries, refreshEntries } = useWatchlists();
  refreshEntries();

  if (isAuthenticated) {
    return (
      <>
        <div className={styles.addWatchlistMain}>
          <h2 className={styles.addWatchlistTitle}>
            In a need for more watchlists?
          </h2>
          <Button text="Add list" to="/create" />
        </div>
        <h1 className={styles.title}>Your current watchlists: </h1>
        {userWatchlists.length !== 0 ? (
          <div className={styles.cards}>
            {userWatchlists.map((list) => {
              const listEntries = entries.filter(
                (e) => e.watchlistId === list._id
              );
              return (
                <WatchlistCard
                  key={list._id}
                  list={list}
                  entries={listEntries}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.homeContainer}>
            <h1>It looks like you don't have any watchlists...</h1>
            <p>Create your first!</p>
            <Button text="Add list" to="/create" />
          </div>
        )}
        <BackToTopButton />
      </>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <h1>
        Welcome to <span className={styles.brand}>"Watch Me Later"</span>
      </h1>
      <p>Your friends told you about a new exciting movie?</p>
      <p>And you want to watch it at any cost?</p>

      <Button text="Sign Up" to="/register" />

      <p className={styles.subtext}>Add it to your list and enjoy later!</p>
    </div>
  );
}
