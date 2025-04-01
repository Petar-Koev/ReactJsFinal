import styles from "./ContactUs.module.css";

export default function ContactUs() {
  return (
    <div className={styles.page}>
      <h2>Contact Us</h2>
      <hr className={styles.divider} />
      <p>If you have any questions or feedback, feel free to reach out!</p>

      <div className={styles.info}>
        <p>
          <strong>Email:</strong> petar.koev94@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p>
          <strong>Address:</strong> Movie Street 42, SinCity, USA
        </p>
      </div>

      <p>We're here to help and will get back to you as soon as possible!</p>
    </div>
  );
}
