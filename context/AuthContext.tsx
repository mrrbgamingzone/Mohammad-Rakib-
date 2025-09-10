
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, pass: string) => {
    console.log("Logging in with", email, pass); // Simulate API call
    return new Promise<void>(resolve => {
        setTimeout(() => {
            const mockUser: User = {
                id: 'usr_123',
                email: email,
                name: 'John Doe',
                role: 'user',
            };
            setUser(mockUser);
            resolve();
        }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
