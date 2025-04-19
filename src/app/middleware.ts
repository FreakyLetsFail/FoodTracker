import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/app/utils/supabase/client';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/sign-in', '/sign-up', '/auth/callback'];
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/api/'))) {
    return NextResponse.next();
  }

  // Check for session
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no session, redirect to sign in
  if (!session) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // User is authenticated, proceed
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|.*\\.svg).*)',
  ],
};