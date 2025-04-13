import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Set axios defaults and verify token on init
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data);
      setIsAdmin(res.data.role === 'admin');
      setLoading(false);
    } catch (err) {
      console.error('Token verification failed:', err);
      logout();
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      const userRes = await axios.get('http://localhost:5000/api/auth/me');
      setUser(userRes.data);
      setIsAdmin(userRes.data.role === 'admin');
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err);
      setLoading(false);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/register', { 
        name, 
        email, 
        password 
      });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      const userRes = await axios.get('http://localhost:5000/api/auth/me');
      setUser(userRes.data);
      setIsAdmin(userRes.data.role === 'admin');
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Registration failed:', err);
      setLoading(false);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setToken('');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
  };

  // Admin-specific functions
  const getAdminStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/dashboard');
      return res.data.stats;
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
      throw err;
    }
  };

  const getAllUsers = async (page = 1, limit = 10, filters = {}) => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        params: { page, limit, ...filters }
      });
      return res.data;
    } catch (err) {
      console.error('Failed to fetch users:', err);
      throw err;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        userData
      );
      return res.data;
    } catch (err) {
      console.error('Failed to update user:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAdmin,
      loading,
      login,
      register,
      logout,
      // Admin functions
      getAdminStats,
      getAllUsers,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add this at the bottom of your AuthContext.js
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};