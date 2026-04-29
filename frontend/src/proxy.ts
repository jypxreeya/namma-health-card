import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('nhc_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. If no token and trying to access protected routes, redirect to login
  const isAuthRoute = pathname.startsWith('/login');
  const isPublicRoute = pathname === '/' || pathname.startsWith('/_next') || pathname.startsWith('/api');

  if (!token && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. If token exists and trying to access login, redirect to dashboard
  if (token && isAuthRoute) {
    // In a real app, we'd decode the JWT to find the role and redirect accordingly.
    // For now, redirecting to a generic dashboard or let the client handle it.
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
