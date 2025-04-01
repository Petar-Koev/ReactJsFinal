import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWatchlist from "../../hooks/useWatchlist";
import FormBase from "../../components/formBase/FormBase";
import FormType from "../../enums/formType";
import { isDuplicateName } from "../../utils/utils";
import styles from "../CreateWatchlist/CreateWatchlist.module.css";

export default function EditWatchlist() {
  const { userWatchlists, updateWatchlist } = useWatchlist();
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const watchlist = userWatchlists.find((w) => w._id === id);

  if (!watchlist) {
    return navigate("/notFound");
  }

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
      await updateWatchlist(id, formData);
      navigate("/");
    } catch (err) {
      console.error("Failed to update watchlist", err);
      setError("Update failed.");
    }
  };

  if (!watchlist) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Update Watchlist</h2>

        {error && <p className={styles.error}>{error}</p>}
        <FormBase
          type={FormType.EDIT}
          onSubmit={handleSubmit}
          actionText="Update"
          initialData={{
            name: watchlist?.name || "",
            description: watchlist?.description || "",
            type: watchlist?.type || "private",
          }}
        />
      </div>
    </div>
  );
}
