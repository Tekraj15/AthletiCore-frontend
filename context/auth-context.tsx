import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User type definition
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Player' | 'Official';
};

// Auth context type
type AuthContextType = {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
  setIsAuthLoading: (loading: boolean) => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Initially true

  const login = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error('❌ Error during login (saving to AsyncStorage)', err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
      setUser(null);
    } catch (err) {
      console.error('❌ Error during logout (clearing AsyncStorage)', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthLoading,
        setIsAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
