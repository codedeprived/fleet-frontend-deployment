// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken')); // Initialize token from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('jwtToken')); // Set based on token

  const login = (newToken) => {
    localStorage.setItem('jwtToken', newToken); // Save token to localStorage
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    if (savedToken) {
      // Optionally validate the token (e.g., decode or send to server for validation)
      setToken(savedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
