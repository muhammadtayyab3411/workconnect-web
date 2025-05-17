"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle reset logic here
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
                alt="Secure Password Reset"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="text-left max-w-lg w-full">
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">Forgot your password?</h1>
              <p className="text-lg text-zinc-500">No worries, we&apos;ll help you get back in. Enter your email address and we&apos;ll send you instructions to reset your password securely.</p>
            </div>
          </div>

          {/* Right Column - Reset Form */}
          <div className="flex flex-col items-center justify-start w-full h-full px-6 md:px-16 py-12 bg-white order-1 md:order-2">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl px-10 py-14 shadow-sm border border-zinc-200">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md mb-6"
                >
                  {submitted ? "Link Sent!" : "Send Reset Link"}
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
                    <span className='mt-2 text-center'>End-to-end encrypted</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                  <div className="w-13 h-13 bg-zinc-100 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                  </div>
                    <span className='mt-2 text-center'>Quick recovery</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center">
                  <span className="text-sm text-zinc-600 mt-4">
                    Remember your password?&nbsp;
                    <Link href="/auth/login" className="text-zinc-900 font-medium hover:underline">Sign in</Link>
                  </span>
                  <span className="text-sm text-zinc-600 mt-4">
                    Don&apos;t have an account?&nbsp;
                    <Link href="/auth/signup" className="text-zinc-900 font-medium hover:underline">Create one</Link>
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