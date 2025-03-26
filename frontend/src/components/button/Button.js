import { Link } from 'react-router-dom';

import styles from './Button.module.css'

export default function Button({ text, to, type = 'button', onClick }) {
  if(to) {
    return (
      <Link to={to} className={styles.customButton}>
        {text}
      </Link>
    );
  }
 
  return (
    <button
      className={styles.customButton}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
