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
import { toastError } from '@/utils/toastify';
import { saveLog } from '@/services/logs';
import { ICreateLog } from '@/interfaces/log.interface';
import { AxiosError } from 'axios';

// Criação do Contexto de Autenticação
const AuthContext = createContext<
  | {
      authState: IAuthState;
      login: (data: ILoginData) => Promise<void>;
      logout: (dataLog: ICreateLog) => void;
      userData: () => Promise<void>
    }
  | undefined
>(undefined);

// Componente Provedor de Autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<IAuthState>({
    user: null,
    allowedRoutes: [],
    loading: false,
    error: null,
    titlePage: ''
  });

  const userData = async () => {
    try {
      const response = await api.get('/auth/me');
      const { user, message } = response.data;
      localStorage.setItem('allowedRoutes', JSON.stringify(message))
      setAuthState({
        user,
        allowedRoutes: message,
        loading: false,
        error: null,
        titlePage: message[0].name
      });
    } catch (error) {
      Cookies.remove('token');
      router.push('/login');
    }
  };

  const login = async ({ email, password }: ILoginData) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const response = await api.post('/login', { email, password });
      const { token, allowedRoutes, user } = await response.data;
  
      Cookies.set('token', token, { expires: 1 });
      
      setAuthState({
        user,
        allowedRoutes,
        loading: false,
        error: null,
        titlePage: allowedRoutes[0]?.name || ''
      });
      const defaultRoute = allowedRoutes.length > 0 ? allowedRoutes[0].href : '/agendamentos';
      router.push(defaultRoute);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        toastError(err.response.data.message);
      } 
    }
  };

  const logout = async (dataLog: ICreateLog) => {
    await saveLog(dataLog);
    router.push('/login');
    Cookies.remove('token');
    setAuthState({
      user: null,
      allowedRoutes: [],
      loading: false,
      error: null,
      titlePage: ''
    });
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
    <AuthContext.Provider value={{ authState, login, logout, userData }}>
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
