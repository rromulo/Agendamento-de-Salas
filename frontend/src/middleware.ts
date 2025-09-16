import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const publicRoutes = ['/login', '/cadastro'];
  const adminPublicRoutes = ['/admin/login'];
  const isPublicRoute = publicRoutes.includes(path) || adminPublicRoutes.includes(path);

  let user = null;
  if (token) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        user = data.user;
      }
    } catch (error) {
      console.error('Erro ao validar o token:', error);
    }
  }

  if (user && isPublicRoute) {
    const redirectPath = user.role === 'ADMIN' ? '/admin/agendamentos' : '/agendamentos';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (user) {
      const headers = new Headers(request.headers);
      headers.set('x-user-role', user.role);

      if (path.startsWith('/admin') && user.role !== 'ADMIN') {
        const redirectPath = user.role === 'CLIENTE' ? '/agendamentos' : '/login';
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
      
      return NextResponse.next({
          request: { headers }
      });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],  
};