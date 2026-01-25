import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userService } from './services/user.service';
import { ROLES } from './constants/roles';

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  const isAuthenticated = !!data;
  const isAdmin = data?.user?.role === ROLES.admin;

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/admin') && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (pathname === '/dashboard' && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
  ],
};
