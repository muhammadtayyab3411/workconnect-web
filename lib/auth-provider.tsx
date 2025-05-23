"use client";

import React from 'react';
import { AuthProvider as AuthContextProvider } from './auth-context';

export function AuthProviderClient({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
} 