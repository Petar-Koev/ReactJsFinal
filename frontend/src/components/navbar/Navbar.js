import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navigateHome = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/movies" className={styles.navLink}>
          Movies
        </Link>
        <Link to="/watchlists" className={styles.navLink}>
          Watchlists
        </Link>
        <Link to="/contact" className={styles.navLink}>
          Contact Us
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <span style={{ cursor: "default" }} className={styles.navLink}>
              Welcome, {user.name}
            </span>
            <span className={styles.navLink} onClick={navigateHome}>
              Logout
            </span>
          </>
        ) : (
          <>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
