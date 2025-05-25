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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
          <span className="text-zinc-600">Loading...</span>
        </div>
      </div>
    );
  }
  
  // If not authenticated and finished loading (or timeout reached), redirect
  if (!user && (!isLoading || timeoutReached)) {
    redirect('/auth/login');
    return null;
  }
  
  // Extract user information with fallbacks
  const userName = user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : 'User';
  const userImage = user?.profile_picture || "/images/user2.jpg";
  
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader 
        userName={userName}
        userImage={userImage}
        notificationCount={5} // This would come from your API in a real app
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
} 