"use client";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/app/api/axios';
import { useEffect, useState } from 'react';

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

    const response = await api.post(`/login`, { email, password });

    console.log("RESPONSE LOGIN USE AUTH -->", response)
    
    const { token, allowedRoutes } = response.data;
    console.log('allowedRoutes USE AUTH --> ', allowedRoutes)
    
    Cookies.set('token', token, { expires: 1 });
    
    const defaultRoute = allowedRoutes.length > 0 ? allowedRoutes[0].href : '/agendamentos';
    console.log('defaultRoute --->', defaultRoute)
    router.push(defaultRoute);
  };

  return { login };
}
