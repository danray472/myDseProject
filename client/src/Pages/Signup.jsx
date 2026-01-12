import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import './register.css'; // Import CSS for signup form

  const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { username, email, password });
      console.log('Signup successful:', response.data);
      enqueueSnackbar('Signup successful', { variant: 'success' });
      // Redirect to the home page after successful signup
      navigate('/Home');
    } catch (error) {
      console.error('Signup error:', error.response.data);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <div className="signup-container">
      <h2>SignUp to ElectroRenew</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login page */}
    </div>
  );
};

export default Signup;
