"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

export default function SetupCompletePage() {
  const { data: session, status } = useSession();
  const { loginWithTokens } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const completeSetup = async () => {
      if (status === 'loading') return;

      if (!session) {
        router.push('/auth/login');
        return;
      }

      try {
        // Get the pending role from localStorage
        const pendingRole = localStorage.getItem('pending_user_role');
        console.log('Setup completion - Pending role:', pendingRole);
        console.log('Setup completion - Session user:', session.djangoUser);
        
        let finalUser = session.djangoUser;
        
        if (pendingRole && ['client', 'worker'].includes(pendingRole)) {
          console.log('Updating user role to:', pendingRole);
          
          // Update the user role via API
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-role/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({
              role: pendingRole,
            }),
          });

          if (response.ok) {
            const updatedUserData = await response.json();
            console.log('Role update successful:', updatedUserData);
            finalUser = updatedUserData.user;
          } else {
            console.error('Role update failed:', await response.text());
          }
        }

        // Clear the pending role
        localStorage.removeItem('pending_user_role');

        // Set auth context with Django tokens and updated user data
        if (session.accessToken && session.refreshToken && finalUser) {
          console.log('Setting auth context with user:', finalUser);
          await loginWithTokens(
            { access: session.accessToken, refresh: session.refreshToken }, 
            finalUser
          );
        }

        // Wait a moment to ensure auth context is updated
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          router.push('/dashboard');
        }, 500);
        
      } catch (error) {
        console.error('Setup completion error:', error);
        setError('Failed to complete setup. Please try again.');
      }
    };

    completeSetup();
  }, [session, status, loginWithTokens, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Setup Failed</h1>
          <p className="text-zinc-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/auth/signup')}
            className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4">
          <Image
            src="/logo.svg"
            alt="WorkConnect"
            width={64}
            height={64}
            className="w-full h-full"
          />
        </div>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent mb-4"></div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Setting up your account...</h1>
        <p className="text-zinc-600">Please wait while we complete your registration.</p>
      </div>
    </div>
  );
} 