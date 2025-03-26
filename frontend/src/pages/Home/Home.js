import Button from "../../components/button/Button";
import useAuth from "../../hooks/useAuth";
import styles from "./Home.module.css";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className={styles.homeContainer}>
        <h1>It looks like you don't have any watchlists...</h1>
        <p>Create your first!</p>
        <Button text="Add list" to="/create" />
      </div>
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
