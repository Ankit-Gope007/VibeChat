// middleware.js (Next.js 13+)
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  // Define which paths are public and which require authentication
  const isPublicPath = path === '/';
  const isApiPath = path.startsWith('/profile') || path.startsWith('/chat');
  
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is logged in but tries to access login page
    return NextResponse.redirect(new URL('/chat', req.url));
  }
  
  if (!isPublicPath && !isApiPath && !token) {
    // If user is not logged in and tries to access protected route
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/profile',
    '/chat',
  ],
};

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ['/profile', '/chat'], // Apply middleware only on these routes
// };