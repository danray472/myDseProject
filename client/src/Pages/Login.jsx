import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Import CSS for login form

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);
      enqueueSnackbar('Login successful', { variant: 'success' });
      // Redirect to another page after successful login
      navigate('/Home'); // Change the destination page as needed
    } catch (error) {
      console.error('Login error:', error.response.data);
      enqueueSnackbar('Login error: ' + error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <div className="login-container">
      <h2>Login to ElectroRenew</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Signup</Link></p> {/* Link to the signup page */}
    </div>
  );
};

export default Login;
