import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { SessionWithUser } from 'db';

import { serverFetcher } from './utils/clients';

export async function middleware(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith('/admin');
  const isEmployeePath = path.startsWith('/employee');
  const isUserPath = path.startsWith('/user');

  const sessionCookie = request.cookies.get('session');

  if (isUserPath || isEmployeePath || isAdminPath) {
    const unathorizedURL = `${origin}/unauthorized`;

    if (!sessionCookie) {
      return NextResponse.redirect(unathorizedURL);
    }

    const { data: session, status } = await serverFetcher.get<SessionWithUser>(
      '/user/auth/verify',
      cookies(),
    );

    if (status !== 'success') {
      return NextResponse.redirect(unathorizedURL);
    }

    const isUser = session.user.role === 'user';
    if (isUser && isUserPath) {
      return NextResponse.next();
    }

    const isEmployee = session.user.role === 'employee';
    if (isEmployee && isEmployeePath) {
      return NextResponse.next();
    }

    const isAdmin = session.user.role === 'admin';
    if (isAdmin) {
      return NextResponse.next();
    }

    return NextResponse.redirect(unathorizedURL);
  }

  const isSignInPage = path === '/auth/sign-in';
  if (isSignInPage) {
    if (sessionCookie) {
      return NextResponse.redirect(`${origin}/`);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/employee/:path*', '/user/:path*', '/auth/sign-in'],
};
