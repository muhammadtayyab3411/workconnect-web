"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';

// Initialize Stripe (use test key for demo)
const stripePromise = loadStripe('pk_test_51234567890abcdef'); // Demo test key

interface CheckoutFormProps {
  amount: number;
  planName: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function CheckoutForm({ amount, planName, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card element not found');
      setProcessing(false);
      return;
    }

    try {
      // For demo purposes, we'll simulate a successful payment
      // In a real app, you'd create a payment intent on your backend
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      console.log('Demo payment successful for:', planName, 'Amount:', amount);
      
      // Generate a fake invoice ID
      const invoiceId = `INV-${Date.now()}`;
      console.log('Generated invoice:', invoiceId);
      
      onSuccess();
      
    } catch (error) {
      console.error('Payment error:', error);
      onError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-zinc-200 rounded-lg">
        <label className="block text-sm font-medium text-zinc-700 mb-3">
          Card Information
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
          className="p-3 border border-zinc-300 rounded-md"
        />
      </div>

      <div className="bg-zinc-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="text-xl font-bold">${amount}</span>
        </div>
        <p className="text-sm text-zinc-600 mt-1">
          You will be charged ${amount} for the {planName} plan
        </p>
      </div>

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3"
      >
        {processing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Pay ${amount}
          </>
        )}
      </Button>

      <p className="text-xs text-zinc-500 text-center">
        This is a demo. Use test card: 4242 4242 4242 4242
      </p>
    </form>
  );
}

interface StripeCheckoutProps {
  amount: number;
  planName: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function StripeCheckout({ amount, planName, onSuccess, onError }: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        amount={amount}
        planName={planName}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
} 