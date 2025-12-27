import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is stored in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just simulate a successful login if email has @ and password length > 6
      if (email.includes('@') && password.length >= 6) {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          phone: '9876543210', // Default phone number for demo
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        setError(null);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just simulate a successful registration
      if (email.includes('@') && password.length >= 6) {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          phone,
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        setError(null);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      } else {
        setError('Invalid email or password format');
        return false;
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};