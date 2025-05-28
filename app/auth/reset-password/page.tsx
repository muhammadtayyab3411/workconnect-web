"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, ShieldCheck, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/auth/forgot-password');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setSubmitted(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (_) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null; // Will redirect
  }

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
                alt="Secure Password Reset"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/forgot-hero.png'; // Fallback to forgot password image
                }}
              />
            </div>
            <div className="text-left max-w-lg w-full">
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">Reset your password</h1>
              <p className="text-lg text-zinc-500">Enter your new password below. Make sure it&apos;s strong and secure to protect your account.</p>
            </div>
          </div>

          {/* Right Column - Reset Form */}
          <div className="flex flex-col items-center justify-start w-full h-full px-6 md:px-16 py-12 bg-white order-1 md:order-2">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl px-10 py-14 shadow-sm border border-zinc-200">
                {error && (
                  <Alert className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                    Password reset successful! Redirecting to login...
                  </Alert>
                )}

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">
                    New Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    required
                    disabled={loading || success}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 mb-2">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    required
                    disabled={loading || success}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md mb-6"
                  disabled={loading || success}
                >
                  {loading ? "Resetting..." : submitted ? "Password Reset!" : "Reset Password"}
                </Button>

                <div className="flex justify-between items-start text-zinc-600 text-sm mb-6 gap-2 flex-wrap mt-3">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-13 h-13 bg-zinc-100 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-black" />
                      </div>
                    </div>
                    <span className='mt-2 text-center'>Secure Process</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-13 h-13 bg-zinc-100 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-black" />
                      </div>
                    </div>
                    <span className='mt-2 text-center'>Encrypted Storage</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-13 h-13 bg-zinc-100 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Key className="w-6 h-6 text-black" />
                      </div>
                    </div>
                    <span className='mt-2 text-center'>One-time Link</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-center">
                  <span className="text-sm text-zinc-600 mt-4">
                    Remember your password?&nbsp;
                    <Link href="/auth/login" className="text-zinc-900 font-medium hover:underline">Sign in</Link>
                  </span>
                  <span className="text-sm text-zinc-600 mt-4">
                    Need help?&nbsp;
                    <Link href="/auth/forgot-password" className="text-zinc-900 font-medium hover:underline">Request new link</Link>
                  </span>
                </div>
              </form>
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

function LoadingFallback() {
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

      <main className="w-full flex-1 min-h-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
} 