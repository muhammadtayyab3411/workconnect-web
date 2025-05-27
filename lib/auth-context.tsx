"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { authAPI, userAPI, UserProfile } from './api';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Error response interface
interface ErrorResponse {
  email?: string | string[];
  password?: string | string[];
  non_field_errors?: string | string[];
  detail?: string | string[];
  [key: string]: unknown;
}

// Define the shape of our authentication context
interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithTokens: (tokens: { access: string; refresh: string }, user: UserProfile) => Promise<void>;
  updateUser: (userData: UserProfile) => void;
  register: (userData: {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    role: string;
    phone_number?: string;
  }) => Promise<{ verification_required?: boolean; message?: string; email?: string; [key: string]: unknown }>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app and makes auth object available
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const initialized = useRef(false);
  const { data: session, status } = useSession();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      // Prevent running if already initialized (e.g., after registration)
      if (initialized.current) {
        console.log('Auth context: Already initialized, skipping auth check');
        return;
      }
      
      try {
        if (typeof window !== 'undefined') {
          let token = localStorage.getItem('accessToken');
          
          // If no token in localStorage but we have a NextAuth session with Django tokens
          if (!token && session?.accessToken) {
            token = session.accessToken;
            // Store it in localStorage for API calls
            localStorage.setItem('accessToken', token);
            if (session.refreshToken) {
              localStorage.setItem('refreshToken', session.refreshToken);
            }
            // Also store in cookies for middleware
            Cookies.set('accessToken', token, { path: '/' });
          }
          
          if (token) {
            console.log('Auth context: Found token, fetching profile...');
            // If we have NextAuth session with Django user data, use that first
            if (session?.djangoUser) {
              console.log('Auth context: Found NextAuth Django user data, but fetching complete profile from API...');
              // Fetch complete profile from API instead of using incomplete session data
              const userData = await userAPI.getProfile();
              console.log('Auth context: Complete profile fetched successfully:', userData);
              setUser(userData);
            } else {
              // Fallback to fetching from API
              const userData = await userAPI.getProfile();
              console.log('Auth context: Profile fetched successfully:', userData);
              setUser(userData);
            }
          } else {
            console.log('Auth context: No token found');
          }
        }
      } catch (error) {
        console.error('Auth context: Authentication check failed:', error);
        // If token is invalid, clear it and don't try to refresh
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          Cookies.remove('accessToken');
        }
        // Don't set user to null here if we're on auth pages - just clear tokens
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
        const isOnAuthPage = currentPath.startsWith('/auth/') || currentPath === '/';
        if (!isOnAuthPage) {
          setUser(null);
        }
      } finally {
        console.log('Auth context: Setting loading to false');
        setIsLoading(false);
        initialized.current = true;
      }
    };

    // Wait for NextAuth session to be loaded before checking auth
    if (status !== 'loading') {
      checkAuth();
    }
  }, [session, status]); // Watch for session changes

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      
      // Handle both response formats for backward compatibility
      const accessToken = response.tokens?.access || response.access;
      const refreshToken = response.tokens?.refresh || response.refresh;
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Also store the access token in cookies for middleware
      Cookies.set('accessToken', accessToken, { path: '/' });
      
      // Set user data
      setUser(response.user);
      
      // Don't redirect here - let the component handle this
      // router.push('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.detail?.toString() || 'Failed to login. Please try again.');
      } else {
        setError('Failed to login. Please try again.');
      }
      throw err; // Rethrow so the component can catch it
    } finally {
      setIsLoading(false);
    }
  };

  // Login function that accepts tokens and user data directly for the email verification success case
  const loginWithTokens = async (tokens: { access: string; refresh: string }, user: UserProfile) => {
    console.log('Auth context: loginWithTokens called with:', { tokens: !!tokens, user });
    setIsLoading(true);
    setError(null);
    try {
      // Store tokens in localStorage
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      
      // Also store the access token in cookies for middleware
      Cookies.set('accessToken', tokens.access, { path: '/' });
      
      // Set user data
      console.log('Auth context: Setting user data:', user);
      setUser(user);
      console.log('Auth context: User set successfully, role is:', user.role);
      
      // Don't redirect here - let the component handle this
      // router.push('/dashboard');
    } catch (err: unknown) {
      console.error('Auth context: loginWithTokens error:', err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.detail?.toString() || 'Failed to login with tokens. Please try again.');
      } else {
        setError('Failed to login with tokens. Please try again.');
      }
      throw err; // Rethrow so the component can catch it
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    role: string;
    phone_number?: string;
  }) => {
    console.log('Auth context: Starting registration...');
    setIsLoading(true);
    setError(null);
    
    // Clear any existing tokens before registration to prevent conflicts
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Cookies.remove('accessToken');
    }
    
    try {
      const response = await authAPI.register(userData);
      console.log('Auth context: Registration API call successful:', response);
      
      // Check if this is the new verification-required response format
      if (response.verification_required) {
        console.log('Auth context: Email verification required');
        setIsLoading(false);
        // Don't set user or navigate - let the component handle the verification message
        return response;
      }
      
      // Handle legacy response formats with tokens (for social login or if verification is disabled)
      const accessToken = response.tokens?.access || response.access;
      const refreshToken = response.tokens?.refresh || response.refresh;
      
      if (accessToken && refreshToken) {
        console.log('Auth context: Storing tokens...');
        // Store tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Also store the access token in cookies for middleware
        Cookies.set('accessToken', accessToken, { path: '/' });
        
        console.log('Auth context: Setting user data and loading state...');
        // Set user data and loading state
        setUser(response.user);
        setIsLoading(false);
        initialized.current = true;
        
        console.log('Auth context: Navigating to dashboard...');
        // Use a small delay to ensure state is updated before navigation
        // setTimeout(() => {
        //   router.push('/dashboard');  // Commented out to let signup page handle redirect
        // }, 50);
      } else {
        setIsLoading(false);
      }
      
      return response;
      
    } catch (err: unknown) {
      console.error('Auth context: Registration failed:', err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        const errorData = axiosError.response?.data;
        let errorMessage: string | string[] | undefined = errorData?.email || 
                         errorData?.password || 
                         errorData?.non_field_errors;
        
        if (!errorMessage) {
          errorMessage = 'Registration failed. Please try again.';
        }
        
        setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage.toString());
      } else {
        setError('Registration failed. Please try again.');
      }
      setIsLoading(false);
      throw err; // Rethrow for component handling
    }
  };

  // Function to update user data (useful for profile updates)
  const updateUser = (userData: UserProfile) => {
    console.log('Auth context: Updating user data:', userData);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    try {
      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Clear token from cookies as well
      Cookies.remove('accessToken', { path: '/' });
      
      // Clear user data
      setUser(null);
      
      // Redirect to home with a small delay to avoid React hook issues
      setTimeout(() => {
        router.push('/');
      }, 0);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    loginWithTokens,
    updateUser,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 