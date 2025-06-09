import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  photoUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (userData: { email: string; password: string; name: string; confirmPassword: string }) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (savedUser && rememberMe) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('A senha deve conter pelo menos um número');
    }
    return errors;
  };

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      if (!validateEmail(email)) {
        throw new Error('Email inválido');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      localStorage.setItem('rememberMe', rememberMe.toString());
      
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao fazer login';
      toast.error(message);
      throw error;
    }
  };

  const signUp = async (userData: { email: string; password: string; name: string; confirmPassword: string }) => {
    try {
      const { email, password, name, confirmPassword } = userData;

      if (!email || !password || !name || !confirmPassword) {
        throw new Error('Todos os campos são obrigatórios');
      }

      if (!validateEmail(email)) {
        throw new Error('Email inválido');
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        throw new Error(passwordErrors[0]);
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some((u: User) => u.email === email)) {
        throw new Error('Este email já está cadastrado');
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
      localStorage.setItem('rememberMe', 'true');
      
      toast.success('Conta criada com sucesso!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar conta';
      toast.error(message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (!email) {
        throw new Error('Email é obrigatório');
      }

      if (!validateEmail(email)) {
        throw new Error('Email inválido');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: User) => u.email === email);

      if (!userExists) {
        throw new Error('Email não encontrado');
      }

      // Simulate sending reset email
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao enviar email de recuperação';
      toast.error(message);
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      // Update in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('users', JSON.stringify(users));
      }

      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao atualizar perfil';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rememberMe');
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logout,
        resetPassword,
        updateProfile,
        isAuthenticated: !!user,
        loading,
      }}
    >
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