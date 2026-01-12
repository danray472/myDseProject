import React, { createContext, useState, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      console.log('Login successful. Response data:', response.data); // Log the response data
      setUser(response.data.user); // Set the user object received from the backend
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  const logout = () => {
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
