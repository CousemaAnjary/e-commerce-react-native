import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (name: string, email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simuler une vérification de token au démarrage
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut d\'authentification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validation simple pour la démo
      if (email === 'demo@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: email,
          name: 'Utilisateur Demo',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };
        
        await AsyncStorage.setItem('userToken', 'demo_token_123');
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        return true;
      }
      
      // Accepter n'importe quel email/mot de passe pour la démo
      const userData: User = {
        id: Math.random().toString(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=3B82F6&color=fff`
      };
      
      await AsyncStorage.setItem('userToken', 'user_token_' + Date.now());
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: Math.random().toString(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=3B82F6&color=fff`
      };
      
      await AsyncStorage.setItem('userToken', 'user_token_' + Date.now());
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const updateProfile = async (name: string, email: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser: User = {
        ...user,
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=3B82F6&color=fff`
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Erreur de mise à jour du profil:', error);
      return false;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
