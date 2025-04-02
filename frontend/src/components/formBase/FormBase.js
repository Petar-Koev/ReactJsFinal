import { useState } from "react";

import ButtonGroup from "../../components/buttonGroup/ButtonGroup";
import FormType from "../../enums/formType";
import Button from "../button/Button";

import styles from "./FormBase.module.css";

export default function FormBase({
  type,
  onSubmit,
  initialData = {},
  actionText = "Submit",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    type: "private",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        inputType === "checkbox" ? (checked ? "public" : "private") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {(type === FormType.REGISTER ||
        type === FormType.CREATE ||
        type === FormType.EDIT) && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}

      {(type === FormType.REGISTER || type === FormType.LOGIN) && (
        <>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </>
      )}

      {(type === FormType.CREATE || type === FormType.EDIT) && (
        <>
          <textarea
            name="description"
            placeholder="Description (max 100 chars)"
            value={formData.description}
            onChange={handleChange}
            maxLength={100}
            required
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
        </>
      )}
      {(type === FormType.CREATE || type === FormType.EDIT) && (
        <ButtonGroup action={actionText} />
      )}
      {(type === FormType.REGISTER || type === FormType.LOGIN) && (
        <Button text={actionText} type="submit" />
      )}
    </form>
  );
}
