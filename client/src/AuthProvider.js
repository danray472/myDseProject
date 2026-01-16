// AuthProvider.js
import React, { createContext, useState, useContext } from 'react';
import api from './api';

const AuthContext = createContext({
  user: null,
  login: () => { },
  logout: () => { }
});

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider Mounted");

  // Synchronous initialization to prevent "flicker" or "race conditions"
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse stored user", e);
      return null;
    }
  });



  // Background verification & Data fetching
  React.useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');

      // If we have a token (even if we don't have a user yet), try to validate/fetch
      if (token) {
        try {
          // Fetch fresh user data with explicit header to be safe, even though interceptor exists
          const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const freshUser = response.data;

          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
        } catch (error) {
          console.error("Token verification/User fetch failed", error);
          if (error.response && error.response.status === 401) {
            // Only logout if we are SURE the token is bad
            localStorage.clear();
            setUser(null);
          }
        }
      }
    };
    initAuth();
  }, []);

  const login = async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      const { user, token } = response.data;

      // Save session
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setUser(user);
      return response.data; // Return data for consuming components if needed
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
