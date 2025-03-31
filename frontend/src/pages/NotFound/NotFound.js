import styles from "./NotFound.module.css";
import notFoundImage from "../../assets/imgs/notFound.jpg";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="404 Not Found" className={styles.image} />
      <h2 className={styles.text}>Oops! Page Not Found</h2>
    </div>
  );
}
