import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  console.log('TOKEN DOS COOKIES?? -->', token)
  console.log('PATH DOS MIDDLEWARE?? -->', path)
  if (path === '/admin/login') {
    return NextResponse.next();
  }

  if (!token) {
    console.log('TEM TOKEN -->', token)
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
      console.log('PATH MIDDLEWARE', path)
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
  matcher: ['/admin/:path*'],
};