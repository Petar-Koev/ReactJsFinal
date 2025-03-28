import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/button/Button";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
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
          <Button text="Sign In" type="submit" />
        </form>
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
