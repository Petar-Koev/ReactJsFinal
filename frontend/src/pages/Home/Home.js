import Button from "../../components/button/Button";
import useAuth from "../../hooks/useAuth";
import useWatchlists from "../../hooks/useWatchlist";
import WatchlistCard from "../../components/WatchlistCard/WatchlistCard";
import BackToTopButton from "../../components/backToTopButton/BackToTopButton";
import styles from "./Home.module.css";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { userWatchlists, entries } = useWatchlists();

  if (isAuthenticated) {
    return (
      <>
        {userWatchlists.length === 0 ? (
          <div className={styles.homeContainer}>
            <h1>It looks like you have no watchlists...</h1>
            <p>Create your first!</p>
            <Button text="Add list" to="/create" />
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Your current watchlists:</h1>
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
                    isPublic={false}
                  />
                );
              })}
            </div>
            <div className={styles.buttonArea}>
              <Button text="Add watchlist" to="/create" />
            </div>
          </>
        )}

        <BackToTopButton />
      </>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <h1>
        Welcome to{" "}
        <span className={styles.brand}>
          {" "}
          <strong>"Watch Me Later"</strong>
        </span>
      </h1>
      <hr className={styles.divider} />
      <p>Your friends told you about a new exciting movie?</p>
      <p>And you want to watch it at any cost?</p>
      <div className={styles.signUpInArea}>
        <Button text="Sign Up" to="/register" />
        <Button text="Sign In" to="/login" />
      </div>
      <p className={styles.subtext}>Add it to your list and enjoy later!</p>
    </div>
  );
}
