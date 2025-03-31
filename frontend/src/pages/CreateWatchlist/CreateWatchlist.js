import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../../hooks/useWatchlist";
import ButtonGroup from "../../components/buttonGroup/ButtonGroup";
import styles from "./CreateWatchlist.module.css";

export default function CreateWatchlist() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "private",
  });

  const [error, setError] = useState("");
  const { createWatchlist } = useWatchlist();
  const navigate = useNavigate();

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create Watchlist</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Watchlist name (max 50 chars)"
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
      <ButtonGroup action={"Create"} />
    </form>
  );
}
