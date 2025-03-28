import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Button.module.css";

export default function Button({
  text,
  to,
  type = "button",
  onClick,
  className,
}) {
  if (to) {
    return (
      <Link to={to} className={cn(className, styles.customButton)}>
        {text}
      </Link>
    );
  }

  return (
    <button
      className={cn(className, styles.customButton)}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
