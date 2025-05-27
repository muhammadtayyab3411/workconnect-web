import api from './api';

// Types for payment-related data
export interface SubscriptionPlan {
  id: number;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  max_jobs_per_month: number | null;
  platform_fee_percentage: number;
  is_active: boolean;
}

export interface UserSubscription {
  id: number;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete' | 'incomplete_expired' | 'trialing';
  billing_cycle: 'monthly' | 'yearly';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: number;
  type: 'card' | 'bank_account';
  last_four: string;
  brand: string;
  exp_month: number | null;
  exp_year: number | null;
  bank_name: string;
  account_holder_type: string;
  is_default: boolean;
  display_name: string;
  created_at: string;
}

export interface JobInvoice {
  id: number;
  job: {
    id: number;
    title: string;
  };
  client: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  worker: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  job_amount: number;
  platform_fee: number;
  stripe_fee: number;
  worker_payout: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'canceled';
  due_date: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StripeConfig {
  publishable_key: string;
}

export interface CreateSubscriptionRequest {
  plan_id: number;
  payment_method_id: string;
  billing_cycle: 'monthly' | 'yearly';
}

export interface CreateCheckoutSessionRequest {
  plan_id: number;
  billing_cycle: 'monthly' | 'yearly';
}

export interface CreateCheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}

export interface CreateSubscriptionResponse {
  subscription: UserSubscription;
  client_secret: string;
}

export interface AddPaymentMethodRequest {
  payment_method_id: string;
  is_default: boolean;
}

export interface PayInvoiceRequest {
  payment_method_id?: string;
}

export interface PayInvoiceResponse {
  client_secret: string;
  invoice: JobInvoice;
}

// Payment API client
export const paymentAPI = {
  // Stripe configuration
  getStripeConfig: async (): Promise<StripeConfig> => {
    const response = await api.get('/payments/stripe/config/');
    return response.data;
  },

  // Subscription plans - Public endpoint
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const response = await api.get('/payments/subscription/plans/');
    return response.data;
  },

  getCurrentSubscription: async (): Promise<UserSubscription> => {
    const response = await api.get('/payments/subscription/current/');
    return response.data;
  },

  createSubscription: async (data: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> => {
    const response = await api.post('/payments/subscription/create/', data);
    return response.data;
  },

  cancelSubscription: async (): Promise<{ message: string }> => {
    const response = await api.post('/payments/subscription/cancel/');
    return response.data;
  },

  // Payment methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await api.get('/payments/payment-methods/');
    return response.data;
  },

  addPaymentMethod: async (data: AddPaymentMethodRequest): Promise<PaymentMethod> => {
    const response = await api.post('/payments/payment-methods/add/', data);
    return response.data;
  },

  removePaymentMethod: async (paymentMethodId: number): Promise<{ message: string }> => {
    const response = await api.delete(`/payments/payment-methods/${paymentMethodId}/remove/`);
    return response.data;
  },

  // Invoices
  getInvoices: async (): Promise<JobInvoice[]> => {
    const response = await api.get('/payments/invoices/');
    return response.data;
  },

  getInvoiceDetail: async (invoiceId: number): Promise<JobInvoice> => {
    const response = await api.get(`/payments/invoices/${invoiceId}/`);
    return response.data;
  },

  payInvoice: async (invoiceId: number, data: PayInvoiceRequest): Promise<PayInvoiceResponse> => {
    const response = await api.post(`/payments/invoices/${invoiceId}/pay/`, data);
    return response.data;
  },

  // Create checkout session
  createCheckoutSession: async (data: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse> => {
    const response = await api.post('/payments/create-checkout-session/', data);
    return response.data;
  },
}; 