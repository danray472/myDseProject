// AuthProvider.js
import React, { createContext, useState, useContext } from 'react';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      // Make a POST request to the backend to authenticate the user
      const response = await api.post('/auth/login', userData);
      // If the login is successful, set the authenticated user data
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  const logout = () => {
    // Perform logout logic, then clear the authenticated user
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
