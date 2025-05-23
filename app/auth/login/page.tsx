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
  Lock,
  AlertCircle,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';

// Create a login validation schema
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, error: authError, isLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState<{ email: string; message: string } | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setVerificationRequired(null);
    
    try {
      await login(data.email, data.password);
      
      // Add explicit redirection here
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      
      // Check if this is a verification error
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        if (errorData?.verification_required) {
          setVerificationRequired({
            email: errorData.email || data.email,
            message: errorData.message || 'Please verify your email address to continue.'
          });
          return;
        }
      }
      
      setServerError('Invalid email or password. Please try again.');
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setSocialLoading(provider);
      
      if (provider === 'google') {
        const result = await signIn('google', {
          callbackUrl: '/dashboard',
          redirect: false,
        });
        
        if (result?.error) {
          setServerError(`Error signing in with Google: ${result.error}`);
        } else if (result?.url) {
          // Redirect to the callback URL
          router.push(result.url);
        }
      } else if (provider === 'facebook') {
        setServerError('Facebook login not implemented yet.');
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setServerError(`Error signing in with ${provider}. Please try again.`);
    } finally {
      setSocialLoading(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

                {(authError || serverError) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex gap-2 items-center">
                    <AlertCircle className="h-4 w-4" />
                    <span>{serverError || authError}</span>
                  </div>
                )}

                {verificationRequired && (
                  <div className="mb-4 p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-md">
                    <div className="flex gap-2 items-start">
                      <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">Email verification required</p>
                        <p className="text-sm">{verificationRequired.message}</p>
                        <p className="text-sm mt-2">
                          Please check your email <span className="font-medium">{verificationRequired.email}</span> and click the verification link.
                        </p>
                        <div className="mt-3 flex gap-2 text-sm">
                          <button 
                            onClick={async () => {
                              try {
                                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification/`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ email: verificationRequired.email }),
                                });
                                if (response.ok) {
                                  setServerError(null);
                                  setVerificationRequired(null);
                                  setServerError('Verification email sent! Please check your inbox.');
                                }
                              } catch (_error) {
                                setServerError('Failed to resend verification email.');
                              }
                            }}
                            className="text-amber-600 hover:text-amber-700 underline"
                          >
                            Resend verification email
                          </button>
                          <span className="text-amber-500">•</span>
                          <button 
                            onClick={() => setVerificationRequired(null)}
                            className="text-amber-600 hover:text-amber-700 underline"
                          >
                            Try again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
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
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder=""
                          className={`w-full p-2.5 border rounded-md pr-10 focus:outline-none focus:ring-1 ${
                            errors.password ? 'border-red-300 focus:ring-red-300' : 'border-zinc-200 focus:ring-zinc-300'
                          }`}
                          {...register('password')}
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
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-500"
                          {...register('rememberMe')}
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
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Log in'}
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
                        onClick={() => handleSocialLogin('google')}
                        disabled={!!socialLoading}
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
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={!!socialLoading}
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
                        disabled={true}
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