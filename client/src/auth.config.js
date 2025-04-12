export const authConfig = {
    pages: {
      signIn: '/', // Redirect users to the home page (authentication page)
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user; // Check if the user is logged in
        const isProtectedRoute = ['/profile', '/chat'].includes(nextUrl.pathname); // Protected routes
  
        if (isProtectedRoute) {
          return isLoggedIn; // Allow access if logged in, else redirect
        }
  
        return true; // Allow public routes
      },
    },
    providers: [], // Add authentication providers here (e.g., Google, Credentials)
  };