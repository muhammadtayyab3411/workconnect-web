"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Eye, 
  EyeOff,
  Zap,
  Shield,
  Users,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password, rememberMe });
  };

  return (
    <>
      {/* Custom Login Header */}
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
            <Link href="/auth/signup">
              <Button variant="outline" className="rounded-md border-zinc-200 hover:bg-zinc-50 text-zinc-800">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen py-8 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto gap-8 md:gap-12">
            {/* Left Column - Branded Section (appears second on mobile) */}
            <div className="flex flex-col items-center self-start justify-between p-8 pt-0 order-2 md:order-1 text-center">
              {/* Background Image */}
              <div className="w-full rounded-lg overflow-hidden mb-10 max-w-md mx-auto">
                <Image
                  src="/images/left-section-background.jpg"
                  alt="Office Space"
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              
              <div className="text-center mb-12 max-w-md">
                <h1 className="text-3xl font-normal text-zinc-900 mb-5">WorkConnect</h1>
                <h2 className="text-2xl font-normal text-zinc-800 mb-2">Welcome back to WorkConnect</h2>
                <p className="text-lg text-zinc-500">Let&apos;s get you connected</p>
              </div>

              {/* Feature Icons */}
              <div className="flex justify-center gap-10 w-full mb-12 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="bg-zinc-100 rounded-lg mb-2 h-14 w-14 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-zinc-700" strokeWidth={2} />
                  </div>
                  <span className="text-base text-zinc-700">Fast</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-zinc-100 rounded-lg mb-2 h-14 w-14 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-zinc-700" strokeWidth={2} />
                  </div>
                  <span className="text-base text-zinc-700">Secure</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-zinc-100 rounded-lg mb-2 h-14 w-14 flex items-center justify-center">
                    <Users className="h-6 w-6 text-zinc-700" strokeWidth={2} />
                  </div>
                  <span className="text-base text-zinc-700">Trusted</span>
                </div>
              </div>

              {/* Security message */}
              <div className="flex items-center justify-center">
                <Lock className="h-4 w-4 text-zinc-500 mr-2" />
                <p className="text-sm text-zinc-500">Your information is encrypted and secure</p>
              </div>
            </div>

            {/* Right Column - Login Form (appears first on mobile) */}
            <div className="bg-white p-8 md:p-10 rounded-lg border border-zinc-200 shadow-sm order-1 md:order-2 h-fit self-start">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-medium text-zinc-800 mb-1">Log in to your account</h2>
                  <p className="text-zinc-500 text-sm mb-8">Enter your email below to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
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
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder=""
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-2.5 border border-zinc-200 rounded-md pr-10 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-zinc-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-zinc-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="h-4 w-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600">
                          Remember me
                        </label>
                      </div>
                      <Link href="/auth/forgot-password" className="text-sm text-zinc-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md mt-4"
                    >
                      Log in
                    </Button>

                    <div className="relative flex items-center justify-center mt-6 mb-6">
                      <div className="border-t border-zinc-200 absolute w-full"></div>
                      <span className="bg-white px-4 text-sm text-zinc-500 relative">or continue with</span>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button 
                        type="button" 
                        className="p-2.5 border border-zinc-200 rounded-md w-12 h-12 flex items-center justify-center"
                        aria-label="Sign in with Google"
                      >
                        <Image 
                          src="/images/google-icon.svg"
                          alt="Google"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button 
                        type="button" 
                        className="p-2.5 border border-zinc-200 rounded-md w-12 h-12 flex items-center justify-center"
                        aria-label="Sign in with Facebook"
                      >
                        <Image 
                          src="/images/facebook-icon.svg"
                          alt="Facebook"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button 
                        type="button" 
                        className="p-2.5 border border-zinc-200 rounded-md w-12 h-12 flex items-center justify-center"
                        aria-label="Sign in with Apple"
                      >
                        <Image 
                          src="/images/apple-icon.svg"
                          alt="Apple"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-center mt-8">
                  <p className="text-sm text-zinc-600">
                    Don&apos;t have an account?
                    <Link href="/auth/signup" className="ml-1 text-zinc-900 font-medium hover:underline">
                      Sign up now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 