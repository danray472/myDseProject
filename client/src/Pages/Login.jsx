import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Import CSS for login form

import { useAuth } from '../AuthProvider';
import '../Components/Spinner.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Get login from context
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use the login function from AuthContext which handles API calls and state updates
      await login({ email, password });
      enqueueSnackbar('Login successful', { variant: 'success' });
      // navigate('/Home'); -- Removed to let App.js handle the state change redirect
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || 'Login failed';
      enqueueSnackbar('Login error: ' + errorMsg, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to ElectroRenew</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          {loading ? <div className="mini-spinner" style={{ width: '18px', height: '18px', borderTopColor: 'white', marginTop: 0 }}></div> : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to="/register">Signup</Link></p> {/* Link to the signup page */}
    </div>
  );
};

export default Login;
