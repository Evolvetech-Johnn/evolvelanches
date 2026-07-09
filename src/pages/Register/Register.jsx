import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../Login/Login.css'; // Reusing Login styles

const Register = () => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
        return setError('As senhas não coincidem.');
    }

    const result = await register(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="container login-container">
      <div className="login-card">
        <h2>Criar Conta</h2>
        {error && <div className="alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu Nome"
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              required 
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required 
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Digite novamente"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Criando Conta...' : 'Cadastrar'}
          </button>
        </form>
        <div className="login-footer">
            <p>Já tem uma conta? <Link to="/login">Entrar</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
