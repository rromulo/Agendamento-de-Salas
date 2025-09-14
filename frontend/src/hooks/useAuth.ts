"use client";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/app/api/axios';
import { useEffect, useState } from 'react';
import { ICreateLog } from '@/interfaces/log.interface';
import { saveLog } from '@/services/logs';
import { toastError } from '@/utils/toastify';
import { AxiosError } from 'axios';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface IAllowedRoute {
  name: string;
  href: string;
  icon: string
}

export interface IAuthState {
  user: IUser | null;
  allowedRoutes: IAllowedRoute[]
  loading: boolean;
  error: string | null;
  titlePage: string;
}

export function useAuth() {
  const router = useRouter();
  
  const login = async ({ email, password }: ILoginData) => {
    try {
      const response = await api.post(`/login`, { email, password });
      const { token, allowedRoutes } = response.data;
      
      Cookies.set('token', token, { expires: 1 });
      
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
    Cookies.remove('token')
    router.push('/login')
  }

  return { login , logout};
}
