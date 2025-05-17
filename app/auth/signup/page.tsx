"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Users, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt with:', { fullName, email, password, accountType });
  };

  return (
    <>
      {/* Custom Signup Header */}
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
            <Link href="/auth/login">
              <Button variant="outline" className="rounded-md border-zinc-200 hover:bg-zinc-50 text-zinc-800">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full h-screen flex items-stretch">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Left Column - Branded Section */}
          <div className="relative flex flex-col items-center justify-center w-full h-full px-8 py-12 bg-gradient-to-b from-zinc-50 to-white order-2 md:order-1">
            {/* Subtle background overlay */}
            <div className="absolute inset-0 bg-zinc-100/60 pointer-events-none" />
            {/* Hero Image */}
            <div className="relative z-10 w-full rounded-lg overflow-hidden mb-8 max-w-[370px]">
              <Image
                src="/images/signup-hero.png"
                alt="Connect with Local Professionals"
                width={370}
                height={240}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="relative z-10 text-center mb-8 max-w-md">
              <h1 className="text-3xl font-bold text-zinc-900 mb-3">Connect with Local Professionals</h1>
              <p className="text-lg text-zinc-500 mb-6">Join thousands of clients and service providers in your area</p>
              <div className="flex flex-col gap-3 text-center w-full">
                <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-700">Free to join - No hidden fees</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 ">
                <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-700">Verified professionals only</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-700">Secure payments & messaging</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Signup Form */}
          <div className="flex flex-col items-center justify-center w-full h-full px-6 md:px-16 py-12 bg-white order-1 md:order-2">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">Create your account</h2>
                <p className="text-zinc-500 text-base mb-8">Get started with your free account</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Image src="/images/facebook-icon.svg" alt="Facebook" width={20} height={20} />
                  Continue with Facebook
                </Button>
              </div>

              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-zinc-200 absolute w-full"></div>
                <span className="bg-white px-4 text-sm text-zinc-500 relative">or continue with email</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                    Email Address
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
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="accountType" className="block text-sm font-medium text-zinc-700">
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full p-2.5 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    required
                  >
                    <option value="">Select account type</option>
                    <option value="client">Client</option>
                    <option value="provider">Service Provider</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md mt-2"
                >
                  Create Account
                </Button>
              </form>

              <p className="text-xs text-zinc-500 text-center mt-4">
                By signing up, you agree to our{' '}
                <Link href="/terms" className="underline">Terms of Service</Link> and{' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>

              <div className="text-center mt-6">
                <p className="text-sm text-zinc-600">
                  Already have an account?
                  <Link href="/auth/login" className="ml-1 text-zinc-900 font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Footer-like info row */}
              <div className="flex justify-between items-center text-zinc-500 text-xs mt-8 gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Lock className="h-4 w-4" /> Secure & Encrypted
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> 10,000+ Users
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" /> 4.8/5 Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 