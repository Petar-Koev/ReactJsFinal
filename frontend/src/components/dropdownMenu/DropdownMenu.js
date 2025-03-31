import { useNavigate } from "react-router-dom";
import { isInWatchlist } from "../../utils/moviesUtils";
import useWatchlist from "../../hooks/useWatchlist";
import styles from "./DropdownMenu.module.css";

export default function DropdownMenu({ movie, handleAddToList }) {
  const { entries, userWatchlists } = useWatchlist();

  const navigate = useNavigate();
  const handleCreateRedirect = () => {
    navigate("/create");
  };
  return (
    <div className={styles.dropdown}>
      {userWatchlists?.map((w) => {
        const alreadyAdded = isInWatchlist(w._id, entries, movie);
        return (
          <div
            key={w._id}
            onClick={() => handleAddToList(w._id)}
            className={styles.dropdownItem}
          >
            {alreadyAdded ? "✅ Added to " : "➕ Add to "} {`"${w.name}"`}
          </div>
        );
      })}
      <div
        onClick={handleCreateRedirect}
        className={styles.dropdownItem + " " + styles.createItem}
      >
        ➕ Create new
      </div>
    </div>
  );
}
