import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import FormBase from "../../components/formBase/FormBase";
import FormType from "../../enums/formType";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formBox}>
        <h2>Log In</h2>

        {error && <p className={styles.error}>{error}</p>}
        <FormBase
          type={FormType.LOGIN}
          onSubmit={handleSubmit}
          actionText="Sign In"
        />
        <div className={styles.signupSide}>
          <p>
            Don’t have an account?
            <Link className={styles.link} to="/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
