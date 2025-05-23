"use client";

import { useAuth } from "@/lib/auth-context";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const { user, isLoading } = useAuth();
  const { data: session } = useSession();
  const [backendUser, setBackendUser] = useState<unknown>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackendUser = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('accessToken') || session?.accessToken;
          if (token) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/debug/`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            
            if (response.ok) {
              const data = await response.json();
              setBackendUser(data);
            } else {
              setBackendError(`API Error: ${response.status}`);
            }
          } else {
            setBackendError('No access token available');
          }
        } catch (error) {
          setBackendError(`Network Error: ${error}`);
        }
      }
    };

    fetchBackendUser();
  }, [user, session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Quick Test:</h2>
          <p><strong>User Role:</strong> {user?.role || 'Not set'}</p>
          <p><strong>User ID:</strong> {user?.id || 'Not set'}</p>
          <p><strong>User Email:</strong> {user?.email || 'Not set'}</p>
          <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Auth Context User:</h2>
          <pre className="text-sm overflow-auto bg-white p-3 rounded border">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Backend User Data:</h2>
          {backendError ? (
            <div className="text-red-600 bg-red-50 p-3 rounded border">
              Error: {backendError}
            </div>
          ) : (
            <pre className="text-sm overflow-auto bg-white p-3 rounded border">
              {JSON.stringify(backendUser, null, 2)}
            </pre>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">NextAuth Session:</h2>
          <pre className="text-sm overflow-auto bg-white p-3 rounded border">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Local Storage:</h2>
          <pre className="text-sm overflow-auto bg-white p-3 rounded border">
            {typeof window !== 'undefined' ? JSON.stringify({
              accessToken: localStorage.getItem('accessToken') ? 'exists' : 'missing',
              refreshToken: localStorage.getItem('refreshToken') ? 'exists' : 'missing',
              pending_user_role: localStorage.getItem('pending_user_role'),
            }, null, 2) : 'Not available on server'}
          </pre>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Manual Role Update (Testing):</h2>
          <div className="space-x-4">
            <button 
              onClick={async () => {
                const token = localStorage.getItem('accessToken') || session?.accessToken;
                if (token) {
                  try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-role/`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                      },
                      body: JSON.stringify({ role: 'worker' }),
                    });
                    const result = await response.json();
                    console.log('Role update result:', result);
                    window.location.reload(); // Refresh to see changes
                  } catch (error) {
                    console.error('Role update error:', error);
                  }
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Set Role to Worker
            </button>
            <button 
              onClick={async () => {
                const token = localStorage.getItem('accessToken') || session?.accessToken;
                if (token) {
                  try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-role/`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                      },
                      body: JSON.stringify({ role: 'client' }),
                    });
                    const result = await response.json();
                    console.log('Role update result:', result);
                    window.location.reload(); // Refresh to see changes
                  } catch (error) {
                    console.error('Role update error:', error);
                  }
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Set Role to Client
            </button>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">⚠️ Authentication Issue Detected</h2>
          <p className="text-sm text-red-700 mb-3">
            Your session tokens are for user ID {user?.id}, but the database only has user ID {backendUser ? (backendUser as { user_id: number }).user_id : 'unknown'}. 
            This means your auth state is corrupted.
          </p>
          <div className="space-y-2">
            <button 
              onClick={async () => {
                // Clear all auth state
                localStorage.clear();
                
                // Clear NextAuth session
                const { signOut } = await import('next-auth/react');
                await signOut({ redirect: false });
                
                // Clear cookies
                document.cookie.split(";").forEach(cookie => {
                  const eqPos = cookie.indexOf("=");
                  const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                });
                
                alert('Auth state cleared! You will be redirected to login.');
                window.location.href = '/auth/login';
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
            >
              🧹 Clear All Auth State & Re-login
            </button>
            
            <button 
              onClick={async () => {
                // Try to generate new tokens for the existing user
                const email = '21jzbcs0157@uetpeshawar.edu.pk';
                try {
                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email,
                      password: 'your_password_here' // You'll need to enter your actual password
                    }),
                  });
                  
                  if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('accessToken', data.tokens.access);
                    localStorage.setItem('refreshToken', data.tokens.refresh);
                    alert('New tokens generated! Refreshing page...');
                    window.location.reload();
                  } else {
                    alert('Login failed. Please use the clear auth button instead.');
                  }
                } catch (error) {
                  console.error('Login error:', error);
                  alert('Login failed. Please use the clear auth button instead.');
                }
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full"
            >
              🔄 Try to Re-authenticate with Database User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 