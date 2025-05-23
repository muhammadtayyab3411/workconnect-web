"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth-context';

export default function VerifyEmailPage() {
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { loginWithTokens } = useAuth();

  useEffect(() => {
    if (!token) {
      setError('Invalid verification link');
      setVerifying(false);
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Log the user in automatically
        if (data.tokens && data.user) {
          await loginWithTokens(data.tokens, data.user);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      } else {
        setError(data.error || 'Failed to verify email');
      }
    } catch (_error) {
      setError('Network error. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom Auth Header */}
      <header className="py-4 px-4 md:px-8 border-b border-zinc-200">
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-semibold text-lg text-zinc-900">
              <Image
                src="/logo.svg"
                alt="WorkConnect"
                width={150}
                height={30}
                className="h-8 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo-fallback.png';
                }}
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full flex-1 min-h-0 flex items-stretch bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full flex-1 min-h-0">
          {/* Left Column - Visual/Welcome */}
          <div className="flex flex-col items-center justify-start w-full h-full bg-zinc-50 px-8 py-12 order-2 md:order-1">
            <div className="w-full rounded-lg overflow-hidden mb-10 max-w-md">
              <Image
                src="/images/forgot-hero.png"
                alt="Email Verification"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/forgot-hero.png'; // Fallback
                }}
              />
            </div>
            <div className="text-left max-w-lg w-full">
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">
                {verifying ? 'Verifying your email...' : success ? 'Email verified!' : 'Verification failed'}
              </h1>
              <p className="text-lg text-zinc-500">
                {verifying ? 'Please wait while we verify your email address.' 
                : success ? 'Your email has been successfully verified. You can now access your account.'
                : 'There was an issue verifying your email. Please try again or contact support.'}
              </p>
            </div>
          </div>

          {/* Right Column - Verification Status */}
          <div className="flex flex-col items-center justify-start w-full h-full px-6 md:px-16 py-12 bg-white order-1 md:order-2">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl px-10 py-14 shadow-sm border border-zinc-200 text-center">
                {verifying && (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-16 h-16 text-zinc-400 animate-spin mb-4" />
                    <p className="text-lg font-medium text-zinc-900 mb-2">Verifying Email</p>
                    <p className="text-sm text-zinc-600">This should only take a moment...</p>
                  </div>
                )}

                {success && (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <p className="text-lg font-medium text-zinc-900 mb-2">Verification Successful!</p>
                    <p className="text-sm text-zinc-600 mb-6">Your email has been verified. Redirecting to dashboard...</p>
                    <Button
                      onClick={() => router.push('/dashboard')}
                      className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                )}

                {error && !verifying && (
                  <div className="flex flex-col items-center">
                    <XCircle className="w-16 h-16 text-red-500 mb-4" />
                    <p className="text-lg font-medium text-zinc-900 mb-2">Verification Failed</p>
                    <Alert className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-left">
                      {error}
                    </Alert>
                    <div className="flex flex-col gap-3 w-full">
                      <Button
                        onClick={() => router.push('/auth/signup')}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md"
                      >
                        Try Registration Again
                      </Button>
                      <Button
                        onClick={() => router.push('/auth/login')}
                        variant="outline"
                        className="w-full border-zinc-300 text-zinc-700 py-3 rounded-md"
                      >
                        Back to Login
                      </Button>
                    </div>
                  </div>
                )}

                {!verifying && (
                  <div className="flex justify-center items-center text-zinc-600 text-sm mt-8">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>Secure email verification</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Footer */}
      <footer className="w-full border-t border-zinc-200 bg-white py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">
        <div className="mb-2 md:mb-0">© 2024 JobConnect. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/help" className="hover:underline">Help</Link>
        </div>
      </footer>
    </div>
  );
} 