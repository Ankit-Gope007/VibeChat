// components/ProtectedRoute.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  
  useEffect(() => {


    if (sessionStorage.getItem("isLoggedIn") === "false") {
      router.push('/');
    }
  }, [session, status, router]);
  
  if (status === 'loading') {
    console.log('session', session);
    console.log('status', status);
    return <div>Loading...</div>;
  }
  
  return session ? children : null;
}