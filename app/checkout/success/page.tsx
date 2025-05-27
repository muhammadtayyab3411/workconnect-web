"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Clear any pending subscription data
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('selectedPlan');
      sessionStorage.removeItem('pendingSubscription');
    }
  }, []);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center">
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
      </header>

      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">
              Welcome to WorkConnect Premium!
            </h1>
            <p className="text-lg text-zinc-600">
              Your subscription has been successfully activated.
            </p>
          </div>

          <Card className="border-zinc-200 mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                What&apos;s Next?
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900">Complete Your Profile</h3>
                    <p className="text-sm text-zinc-600">
                      Add your skills, experience, and portfolio to attract more clients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900">Explore Premium Features</h3>
                    <p className="text-sm text-zinc-600">
                      Access advanced search, priority listings, and enhanced messaging.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900">Start Connecting</h3>
                    <p className="text-sm text-zinc-600">
                      {user?.role === 'client' 
                        ? 'Post your first job and find the perfect professional.'
                        : 'Browse jobs and submit your first proposal.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button
              onClick={handleGoToDashboard}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 text-base"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/settings/billing">
                <Button variant="outline" className="w-full sm:w-auto">
                  Manage Subscription
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full sm:w-auto">
                  Get Help
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Need Help Getting Started?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Our support team is here to help you make the most of your premium subscription.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 