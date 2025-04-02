import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import FormBase from "../../components/formBase/FormBase";
import FormType from "../../enums/formType";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

import styles from "./../Login/Login.module.css";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setError("");

    if (formData.name.length > 50) {
      return setError("Name must be less than 50 characters.");
    }

    if (formData.email.trim() === "" || formData.password.trim() === "") {
      return setError("All fields are required.");
    }

    try {
      const { email, password } = formData;
      await api.post("/auth/register", formData);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formBox}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <FormBase
          type={FormType.REGISTER}
          onSubmit={handleSubmit}
          actionText="Sign Up"
        />
        <div className={styles.signupSide}>
          <p>
            Already have an account?
            <Link className={styles.link} to="/login">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
