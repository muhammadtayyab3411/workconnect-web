"use client";

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import VerificationModal from './VerificationModal';

interface VerificationGuardProps {
  children: React.ReactNode;
}

export default function VerificationGuard({ children }: VerificationGuardProps) {
  const { user, isLoading } = useAuth();

  // Don't show verification modal while loading or on auth pages
  if (isLoading) {
    return <>{children}</>;
  }

  // Check if we're on an auth page
  const isAuthPage = typeof window !== 'undefined' && 
    (window.location.pathname.startsWith('/auth/') || window.location.pathname === '/');

  // If user is not authenticated or we're on auth pages, show children normally
  if (!user || isAuthPage) {
    return <>{children}</>;
  }

  // If user is authenticated but not verified and not on auth pages, show verification modal
  if (!user.is_verified) {
    return (
      <>
        {children}
        <VerificationModal userEmail={user.email} />
      </>
    );
  }

  // User is verified, show children normally
  return <>{children}</>;
} 