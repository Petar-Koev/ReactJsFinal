import Button from "../../components/button/Button";
import SortOptions from "../../enums/sortOptions";

import styles from "./SortControls.module.css";

export default function SortControls({ sortOption, setSort, isAuthenticated }) {
  return (
    <div className={styles.sortControls}>
      <span>Sort by:</span>
      <Button
        className={sortOption === SortOptions.TITLE ? styles.active : ""}
        text={"Title"}
        onClick={() => setSort(SortOptions.TITLE)}
      />
      <Button
        className={sortOption === SortOptions.YEAR ? styles.active : ""}
        text={"Year"}
        onClick={() => setSort(SortOptions.YEAR)}
      />
      {isAuthenticated && (
        <Button
          className={sortOption === SortOptions.FAVORITES ? styles.active : ""}
          text={"Liked"}
          onClick={() => setSort(SortOptions.FAVORITES)}
        />
      )}
    </div>
  );
}
