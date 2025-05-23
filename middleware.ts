import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/jobs'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  try {
    // Check for JWT token from NextAuth with explicit secret
    const token = await getToken({ 
      req: request, 
      secret: process.env.AUTH_SECRET 
    });
    
    // Check for regular token in cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    
    // If we have a NextAuth token, we're authenticated
    if (token) {
      const response = NextResponse.next();
      
      // If the NextAuth token contains Django tokens, set them in cookies
      if (token.accessToken && !accessToken) {
        response.cookies.set('accessToken', token.accessToken as string, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 // 24 hours
        });
        
        if (token.refreshToken) {
          response.cookies.set('refreshToken', token.refreshToken as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
          });
        }
      }
      
      return response;
    }
    
    // If we have an access token in cookies, we're also authenticated
    if (accessToken) {
      return NextResponse.next();
    }
    
    // No authentication found, redirect to login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    
    return NextResponse.redirect(url);
    
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error with token verification, redirect to login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Match all paths except those that start with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico, logo.svg, or other static assets
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|images).*)',
  ],
}; 