import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import useWatchlist from "../../hooks/useWatchlist";
import styles from "../CreateWatchlist/CreateWatchlist.module.css";

export default function EditWatchlist() {
  const { userWatchlists, updateWatchlist } = useWatchlist();
  const { id } = useParams();
  const navigate = useNavigate();

  const watchlist = userWatchlists.find((w) => w._id === id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "private",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (watchlist) {
      const { name, description, type } = watchlist;
      setFormData({ name, description, type });
    }
  }, [watchlist]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "public" : "private") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.name.trim() === "" || formData.description.trim() === "") {
      return setError("All fields are required.");
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Edit Watchlist</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Watchlist name"
        value={formData.name}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description (max 100 chars)"
        value={formData.description}
        onChange={handleChange}
        maxLength={100}
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="type"
          checked={formData.type === "public"}
          onChange={handleChange}
          className={styles.check}
        />
        Make Public
      </label>

      <Button text="Update Watchlist" type="submit" />
    </form>
  );
}
