"use client";

import { DashboardHeader } from "@/components/common";
import { useAuth } from "@/lib/auth-context";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  
  // This ensures the component only renders on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Add a timeout for the loading state to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setTimeoutReached(true);
      }, 5000); // 5 second timeout
      
      return () => clearTimeout(timeout);
    } else {
      setTimeoutReached(false);
    }
  }, [isLoading]);
  
  // Don't render anything during server-side rendering or initial loading
  if (!isClient) {
    return null;
  }
  
  // Show loading state if authentication is still being checked (but not if timeout reached)
  if (isLoading && !timeoutReached) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated and finished loading (or timeout reached), redirect
  if (!user && (!isLoading || timeoutReached)) {
    redirect('/auth/login');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader 
        userName={user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : 'User'} 
        userImage="/images/user2.jpg" 
        notificationCount={5} // This would come from your API in a real app
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
} 