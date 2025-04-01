import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../../hooks/useWatchlist";
import styles from "./CreateWatchlist.module.css";
import FormBase from "../../components/formBase/FormBase";
import FormType from "../../enums/formType";
import { isDuplicateName } from "../../utils/utils";

export default function CreateWatchlist() {
  const [error, setError] = useState("");
  const { createWatchlist, userWatchlists } = useWatchlist();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError("");

    if (isDuplicateName(userWatchlists, formData.name)) {
      return setError("A watchlist with this name already exists.");
    }

    if (formData.name.trim() === "" || formData.description.trim() === "") {
      return setError("All fields are required.");
    }

    if (formData.name.length > 50) {
      return setError("Name must be less than 50 characters.");
    }

    if (formData.description.length > 100) {
      return setError("Description must be 100 characters or less.");
    }

    try {
      await createWatchlist(formData);
      navigate("/");
    } catch (err) {
      console.error("Failed to create watchlist", err);
      setError("Failed to create watchlist");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Create Watchlist</h2>

        {error && <p className={styles.error}>{error}</p>}
        <FormBase
          type={FormType.CREATE}
          onSubmit={handleSubmit}
          actionText="Create"
        />
      </div>
    </div>
  );
}
