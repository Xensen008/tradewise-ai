import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  // Skip auth check for auth-related paths
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return response;
  }

  // Protected routes
  const protectedPaths = [ '/settings', '/profile'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const { data: { session } } = await supabase.auth.getSession();

    // If no session and trying to access protected route, redirect to home
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 