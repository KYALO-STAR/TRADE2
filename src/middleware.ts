import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthService } from './lib/auth'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/bots',
  '/referrals',
  '/automation',
  '/synthetics'
]

// Define admin routes
const adminRoutes = [
  '/admin'
]

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/course',
  '/tips'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth token from cookies or headers
  const authToken = request.cookies.get('auth_token')?.value || 
                   request.headers.get('authorization')?.replace('Bearer ', '')

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/?login=true', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // For admin routes, we would typically check user role here
  if (isAdminRoute) {
    if (!authToken) {
      const loginUrl = new URL('/?login=true&admin=true', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // **This is a temporary solution for demonstration.**
    // In a real app, you would verify the token on the server to get the user's role.
    // Since we are client-side, we'll have to rely on a less secure method for now.
    try {
      const user = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/?error=unauthorized', request.url))
      }
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/?login=true&admin=true', request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Rate limiting headers (implement actual rate limiting in production)
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', '99')
  response.headers.set('X-RateLimit-Reset', String(Date.now() + 60000))

  return response
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
}