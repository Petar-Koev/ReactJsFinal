import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./ButtonGroup.module.css";

export default function ButtonGroup({ action }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.buttonsArea}>
      <Button text="Go Back" onClick={handleGoBack} />
      <Button text={action} type="submit" />
    </div>
  );
}
