"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/app/api/axios';
import {
  ILoginData,
  IUser,
  IAllowedRoute,
  IAuthState,
} from '../../hooks/useAuth'; // Importe as interfaces do seu arquivo useAuth.ts

// Criação do Contexto de Autenticação
const AuthContext = createContext<
  | {
      authState: IAuthState;
      login: (data: ILoginData) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);

// Componente Provedor de Autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<IAuthState>({
    user: null,
    allowedRoutes: [],
    loading: true,
    error: null,
    titlePage: ''
  });

  const userData = async () => {
    try {
      const response = await api.get('/auth/me');
      const { user, message } = response.data;
      setAuthState({
        user,
        allowedRoutes: message,
        loading: false,
        error: null,
        titlePage: message[0].name
      });
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      setAuthState({
        user: null,
        allowedRoutes: [],
        loading: false,
        error: 'Erro ao carregar dados do usuário. Por favor, faça login novamente.',
        titlePage: ''
      });
      // Opcional: remover o token inválido
      Cookies.remove('token');
      router.push('/login');
    }
  };

  const login = async ({ email, password }: ILoginData) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const response = await api.post('/login', { email, password });
      const { token, allowedRoutes } = response.data;

      Cookies.set('token', token, { expires: 1 });
      
      const defaultRoute = allowedRoutes.length > 0 ? allowedRoutes[0].href : '/agendamentos';
      
      setAuthState({
        user: response.data.user,
        allowedRoutes,
        loading: false,
        error: null,
        titlePage: allowedRoutes[0].name
      });
      router.push(defaultRoute);
    } catch (error) {
      console.error('Erro no login:', error);
      setAuthState(prev => ({ ...prev, loading: false, error: 'Erro no login. Verifique suas credenciais.' }));
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setAuthState({
      user: null,
      allowedRoutes: [],
      loading: false,
      error: null,
      titlePage: ''
    });
    router.push('/login');
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      userData();
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
