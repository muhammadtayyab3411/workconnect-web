"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Check, 
  ArrowLeft,
  Lock, 
  Loader2,
  AlertCircle,
  Download
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import StripeCheckout from '@/components/StripeCheckout';

// Plan selection interface
interface PlanSelection {
  planId: number;
  planName: string;
  billingCycle: 'monthly' | 'yearly';
  price: number;
  userType: string;
}

// Simple interface for demo
interface SubscriptionPlan {
  id: number;
  name: string;
  price_monthly: number;
  price_yearly: number;
  max_jobs_per_month: number;
  platform_fee_percentage: number;
  is_active: boolean;
  features: string[];
}

export default function CheckoutPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanSelection | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    // Set default plan for demo
    const defaultPlan = {
      planId: 1,
      planName: 'Professional',
      billingCycle: 'monthly' as const,
      price: 29,
      userType: 'client'
    };
    
    setSelectedPlan(defaultPlan);
    
    // Set default subscription plan details
    const defaultSubscriptionPlan = {
      id: 1,
      name: 'Professional',
      price_monthly: 29,
      price_yearly: 290,
      max_jobs_per_month: 50,
      platform_fee_percentage: 5,
      is_active: true,
      features: [
        'Unlimited project postings',
        'Advanced matching algorithm',
        'Priority customer support',
        'Detailed analytics dashboard',
        'Secure payment processing'
      ]
    };
    
    setSubscriptionPlan(defaultSubscriptionPlan);
    setLoading(false);
  }, [user, authLoading, router]);

  const handlePaymentSuccess = () => {
    const newInvoiceId = `INV-${Date.now()}`;
    setInvoiceId(newInvoiceId);
    setPaymentSuccess(true);
    
    // Clear pending subscription
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pendingSubscription');
    }
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleBackToPricing = () => {
    // Clear pending subscription
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pendingSubscription');
    }
    router.push('/pricing');
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-zinc-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">Checkout Error</h1>
          <p className="text-zinc-600 mb-6">{error}</p>
          <Button onClick={handleBackToPricing}>
            Back to Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Plan Details */}
          <div>
            <div className="mb-6">
              <button
                onClick={handleBackToPricing}
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Pricing
              </button>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Order Summary</h2>
                
                {selectedPlan && subscriptionPlan && (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-zinc-900">{selectedPlan.planName} Plan</h3>
                        <p className="text-sm text-zinc-600 capitalize">
                          {selectedPlan.billingCycle} billing
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-zinc-900">
                          ${selectedPlan.price}
                        </div>
                        <div className="text-sm text-zinc-600">
                          /{selectedPlan.billingCycle === 'monthly' ? 'month' : 'year'}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-200 pt-4 mb-6">
                      <h4 className="font-medium text-zinc-900 mb-3">Plan Features:</h4>
                      <ul className="space-y-2">
                        {subscriptionPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-zinc-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-zinc-200 pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total</span>
                        <span>${selectedPlan.price}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        Billed {selectedPlan.billingCycle}. Cancel anytime.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment */}
          <div>
            <Card className="border-zinc-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Payment Details</h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex gap-2 items-center">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {paymentSuccess ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900">Payment Successful!</h3>
                    <p className="text-zinc-600">
                      Your subscription has been activated successfully.
                    </p>
                    {invoiceId && (
                      <div className="bg-zinc-50 p-4 rounded-lg">
                        <p className="text-sm text-zinc-600">Invoice ID: <span className="font-mono">{invoiceId}</span></p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => window.print()}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-zinc-500">
                      Redirecting to dashboard in a few seconds...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-zinc-50 p-4 rounded-lg">
                      <h4 className="font-medium text-zinc-900 mb-2">Account Information</h4>
                      <div className="space-y-1 text-sm text-zinc-600">
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Name:</span> {user?.full_name}</p>
                        <p><span className="font-medium">Account Type:</span> {user?.role}</p>
                      </div>
                    </div>

                    <StripeCheckout
                      amount={selectedPlan?.price || 29}
                      planName={selectedPlan?.planName || 'Professional'}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-500">
                By completing this purchase, you agree to our{' '}
                <Link href="/terms" className="underline hover:text-zinc-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline hover:text-zinc-700">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 