"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Users, Star, Check, AlertCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

// Error response interface
interface ErrorResponse {
  email?: string | string[];
  password?: string | string[];
  non_field_errors?: string | string[];
  [key: string]: unknown;
      }

// Create a schema that matches Django's validation requirements
const signupSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(150, 'Full name cannot exceed 150 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .refine(password => {
      // Check if password contains at least one digit
      return /\d/.test(password);
    }, 'Password must contain at least one digit')
    .refine(password => {
      // Check if password is not too common (basic check for common passwords)
      const commonPasswords = ['password', '12345678', 'qwerty123', 'admin123', '123456789'];
      return !commonPasswords.includes(password.toLowerCase());
    }, 'This password is too common'),
  accountType: z.enum(['client', 'provider'], {
    required_error: 'Please select an account type',
        }),
      });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
        const { register: registerUser, error: authError, isLoading } = useAuth();
        const [serverError, setServerError] = useState<string | null>(null);
        const [socialLoading, setSocialLoading] = useState<string | null>(null);
        const [verificationRequired, setVerificationRequired] = useState<{ email: string; message: string } | null>(null);
        const router = useRouter();
  
        const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
        } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      accountType: undefined,
    }
        });

        const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);
    setVerificationRequired(null);
    
    // Split full name into first and last name
    const nameParts = data.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Map account type to role
    const role = data.accountType === 'provider' ? 'worker' : 'client';
    
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        confirm_password: data.password, // Using the same password as confirmation
        first_name: firstName,
        last_name: lastName,
        role: role,
      });

      // Check if verification is required
      if (response.verification_required) {
        setVerificationRequired({
          email: response.email || data.email,
          message: response.message || 'Please check your email to verify your account.'
        });
        return;
      }

      // Simple redirect to checkout after successful signup
      router.push('/checkout');
      
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle known server validation errors and map them to form fields
      if (axios.isAxiosError(error)) {
        const serverErrors = (error as AxiosError<ErrorResponse>).response?.data;
        
        if (serverErrors?.email) {
          setError('email', { 
            type: 'server', 
            message: Array.isArray(serverErrors.email) 
              ? serverErrors.email[0] 
              : serverErrors.email.toString()
          });
        }
        
        if (serverErrors?.password) {
          setError('password', { 
            type: 'server', 
            message: Array.isArray(serverErrors.password) 
              ? serverErrors.password[0] 
              : serverErrors.password.toString()
          });
        }
        
        if (serverErrors?.non_field_errors) {
          setServerError(
            Array.isArray(serverErrors.non_field_errors) 
              ? serverErrors.non_field_errors[0] 
              : serverErrors.non_field_errors.toString()
          );
        }
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
        };

        const handleSocialSignup = async (provider: string) => {
          try {
            setSocialLoading(provider);

            if (provider === "google") {
              // Redirect to role selection page before Google OAuth
              router.push(`/auth/role-selection?provider=google`);
            } else if (provider === "facebook") {
              setServerError("Facebook login not implemented yet.");
            }
          } catch (error) {
            console.error(`${provider} signup error:`, error);
            setServerError(
              `Error signing up with ${provider}. Please try again.`
            );
          } finally {
            setSocialLoading(null);
          }
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
          <div className="flex flex-col items-center justify-center w-full h-full px-6 md:px-16 py-12 bg-white order-1 md:order-2 overflow-y-auto mt-5">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">Create your account</h2>
                <p className="text-zinc-500 text-base mb-8">Get started with your free account</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialSignup('google')}
                  disabled={!!socialLoading}
                >
                  <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
                  Continue with Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialSignup('facebook')}
                  disabled={!!socialLoading}
                >
                  <Image src="/images/facebook-icon.svg" alt="Facebook" width={20} height={20} />
                  Continue with Facebook
                </Button>
              </div>

              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-zinc-200 absolute w-full"></div>
                <span className="bg-white px-4 text-sm text-zinc-500 relative">or continue with email</span>
              </div>
              
              {(authError || serverError) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex gap-2 items-center">
                  <AlertCircle className="h-4 w-4" />
                  <span>{serverError || authError}</span>
                </div>
              )}

              {verificationRequired && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                  <div className="flex gap-2 items-start">
                    <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Check your email!</p>
                      <p className="text-sm">{verificationRequired.message}</p>
                      <p className="text-sm mt-2">
                        We sent a verification link to <span className="font-medium">{verificationRequired.email}</span>
                      </p>
                      <div className="mt-3 flex gap-2 text-sm">
                        <Link href="/auth/login" className="text-green-600 hover:text-green-700 underline">
                          Go to Login
                        </Link>
                        <span className="text-green-500">•</span>
                        <button 
                          onClick={() => setVerificationRequired(null)}
                          className="text-green-600 hover:text-green-700 underline"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-red-300 focus:ring-red-300' : 'border-zinc-200 focus:ring-zinc-300'
                    }`}
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 ${
                      errors.email ? 'border-red-300 focus:ring-red-300' : 'border-zinc-200 focus:ring-zinc-300'
                    }`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 ${
                      errors.password ? 'border-red-300 focus:ring-red-300' : 'border-zinc-200 focus:ring-zinc-300'
                    }`}
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="accountType" className="block text-sm font-medium text-zinc-700">
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 ${
                      errors.accountType ? 'border-red-300 focus:ring-red-300' : 'border-zinc-200 focus:ring-zinc-300'
                    }`}
                    {...register('accountType')}
                  >
                    <option value="">Select account type</option>
                    <option value="client">Client</option>
                    <option value="provider">Service Provider</option>
                  </select>
                  {errors.accountType && (
                    <p className="text-red-500 text-xs mt-1">{errors.accountType.message}</p>
                  )}
                </div>
                
                {/* Password requirements helper */}
                <div className="space-y-1.5 bg-zinc-50 p-3 rounded-md border border-zinc-100">
                  <p className="text-xs font-medium text-zinc-700 mb-2">Password must:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-xs text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
                      <span>Be at least 8 characters</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
                      <span>Include at least one number</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
                      <span>Not be a commonly used password</span>
                    </li>
                  </ul>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md mt-2"
                  disabled={isLoading || !!socialLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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