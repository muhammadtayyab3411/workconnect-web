"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  CheckCircle,
  Wrench,
  ArrowRight
} from "lucide-react";
import { signIn } from "next-auth/react";

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<'client' | 'worker' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider') || 'google';

  const handleRoleSelect = (role: 'client' | 'worker') => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    try {
      // Store the selected role in localStorage to retrieve after OAuth
      if (typeof window !== 'undefined') {
        localStorage.setItem('pending_user_role', selectedRole);
      }
      
      // For Google OAuth, redirect directly to OAuth
      if (provider === 'google') {
        const result = await signIn('google', {
          callbackUrl: '/auth/setup-complete',
          redirect: false,
        });
        
        if (result?.error) {
          console.error('Error with OAuth:', result.error);
          router.push(`/auth/signup?error=${encodeURIComponent('OAuth failed. Please try again.')}`);
        } else if (result?.url) {
          router.push(result.url);
        }
      }
    } catch (error) {
      console.error('OAuth error:', error);
      router.push(`/auth/signup?error=${encodeURIComponent('OAuth failed. Please try again.')}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
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

      <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 mb-4">Join as a client or worker?</h1>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Choose your account type to get started with WorkConnect. You can always change this later.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Client Card */}
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedRole === 'client' 
                  ? 'ring-2 ring-zinc-900 shadow-lg' 
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
              onClick={() => handleRoleSelect('client')}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-zinc-900" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">I&apos;m a client</h3>
                  <p className="text-zinc-600 mb-6">
                    I&apos;m looking to hire skilled professionals for my projects
                  </p>
                  
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Post jobs and receive bids</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Browse and hire workers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Manage projects and payments</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Access verified professionals</span>
                    </li>
                  </ul>
                  
                  {selectedRole === 'client' && (
                    <div className="mt-6 p-3 bg-zinc-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-zinc-900" />
                        <span className="font-medium text-zinc-900">Selected</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Worker Card */}
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedRole === 'worker' 
                  ? 'ring-2 ring-zinc-900 shadow-lg' 
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
              onClick={() => handleRoleSelect('worker')}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wrench className="w-8 h-8 text-zinc-900" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">I&apos;m a worker</h3>
                  <p className="text-zinc-600 mb-6">
                    I&apos;m a skilled professional looking for work opportunities
                  </p>
                  
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Find and bid on jobs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Showcase your skills</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Secure payment processing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700">Build your reputation</span>
                    </li>
                  </ul>
                  
                  {selectedRole === 'worker' && (
                    <div className="mt-6 p-3 bg-zinc-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-zinc-900" />
                        <span className="font-medium text-zinc-900">Selected</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={handleContinue}
              disabled={!selectedRole || isLoading}
              className="px-8 py-3 text-lg bg-zinc-900 hover:bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Continue with {provider === 'google' ? 'Google' : 'selected provider'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            
            <div className="mt-4">
              <Link 
                href="/auth/signup"
                className="text-zinc-600 hover:text-zinc-900 underline"
              >
                Back to signup options
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 