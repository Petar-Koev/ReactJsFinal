import { Link } from 'react-router-dom';

import styles from './Button.module.css'

export default function Button({ text, to }) {
  return (
    <Link to={to} className={styles.customButton}>
      {text}
    </Link>
  );
}
