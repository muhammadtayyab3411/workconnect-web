"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardHome() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to role-specific dashboard
      if (user.role === 'client') {
        router.push('/dashboard/client');
      } else if (user.role === 'worker') {
        router.push('/dashboard/worker');
      }
      // If role is 'admin' or unknown, stay on current page
    }
  }, [user, isLoading, router]);

  // Show loading while redirecting or checking auth
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent"></div>
        <p className="mt-4 text-zinc-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
} 