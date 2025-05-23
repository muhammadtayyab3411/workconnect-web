"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export function RoleGuard({ children, allowedRoles, redirectTo }: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        const defaultRedirect = redirectTo || (user.role === 'client' ? '/dashboard/client' : '/dashboard/worker');
        router.push(defaultRedirect);
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if user doesn't have access
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
} 