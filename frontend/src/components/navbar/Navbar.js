import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; 

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/watchlists">Watchlists</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      <div className={styles.navRight}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
