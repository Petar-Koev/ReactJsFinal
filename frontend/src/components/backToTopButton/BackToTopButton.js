import { useEffect, useState } from "react";
import Button from "../button/Button";
import styles from "./BackToTopButton.module.css";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <Button
      text={"Back to top"}
      onClick={scrollToTop}
      className={styles.backToTop}
    />
  ) : null;
}
