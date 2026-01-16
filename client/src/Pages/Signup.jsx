import React, { useState } from 'react';
import api from '../api';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import './register.css'; // Import CSS for signup form
import '../Components/Spinner.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { username, email, password });
      console.log('Signup successful:', response.data);
      enqueueSnackbar('Signup successful', { variant: 'success' });
      // Redirect to the home page after successful signup
      navigate('/Home');
    } catch (error) {
      console.error('Signup error:', error.response.data);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>SignUp to ElectroRenew</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          {loading ? <div className="mini-spinner" style={{ width: '18px', height: '18px', borderTopColor: 'white', marginTop: 0 }}></div> : 'Signup'}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login page */}
    </div>
  );
};

export default Signup;
