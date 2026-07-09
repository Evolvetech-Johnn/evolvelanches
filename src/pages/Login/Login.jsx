import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login({ email, password });
    if (result.success) {
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        const destination = location.state?.from || "/";
        navigate(destination);
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container login-container">
      <div className="login-card">
        <h2>Entrar na Conta</h2>
        {error && <div className="alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="login-footer">
          <p>
            Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
          <p className="hint">Admin: admin@evolve.com / Evolve@2026</p>
          <p className="hint">Cliente: cliente@evolve.com / Evolve@2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
