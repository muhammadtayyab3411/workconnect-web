import { loadStripe, Stripe, PaymentIntentResult } from '@stripe/stripe-js';
import { paymentAPI } from './payment-api';

let stripePromise: Promise<Stripe | null>;

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripePromise();
  }
  return stripePromise;
};

const loadStripePromise = async (): Promise<Stripe | null> => {
  try {
    // Get the publishable key from the backend
    const config = await paymentAPI.getStripeConfig();
    return loadStripe(config.publishable_key);
  } catch (error) {
    console.error('Failed to load Stripe configuration:', error);
    return null;
  }
};

export const redirectToCheckout = async (sessionId: string): Promise<void> => {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    throw error;
  }
};

export const confirmPayment = async (clientSecret: string, paymentMethodId?: string): Promise<PaymentIntentResult> => {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  if (paymentMethodId) {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
    });
  } else {
    return stripe.confirmCardPayment(clientSecret);
  }
}; 