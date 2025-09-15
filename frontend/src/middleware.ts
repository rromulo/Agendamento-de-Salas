import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const publicRoutes = ['/admin/login', '/login', '/cadastro'];

  if (token && publicRoutes.includes(path)) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const { user } = await response.json();
        const redirectPath = user.role === 'ADMIN' ? '/admin/agendamentos' : '/agendamentos';
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
    }
  }

  if (!token && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    
    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const { user, allowedRoutes } = await response.json();
    
    if (path.startsWith('/admin') && path !== '/admin/login') {
      if (user.role !== 'ADMIN') {
        const redirectPath =
          user.role === 'CLIENTE'
            ? '/agendamentos'
            : '/login';

        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }

    const headers = new Headers(request.headers);
    headers.set('x-user-role', user.role);
    headers.set('x-user-data', JSON.stringify({ user, allowedRoutes }));

    return NextResponse.next({
      request: { headers },
    });
  } catch (error) {
    console.error('Erro no middleware:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/:path*'],
};