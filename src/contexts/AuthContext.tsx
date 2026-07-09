import React, { createContext, useState, useContext, ReactNode } from 'react';
import authService from '../services/authService';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      // Compatibility with previous implementation which passed (email, password) arguments
      // Check if credentials is an object or strings
      // But we defined the interface as LoginCredentials object
      const response = await authService.login(credentials);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Erro ao realizar login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Erro ao realizar cadastro' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
