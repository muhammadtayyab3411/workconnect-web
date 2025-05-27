#!/usr/bin/env node

/**
 * Test script to verify frontend Stripe integration
 */

const API_BASE_URL = 'http://localhost:8001/api';
const FRONTEND_URL = 'http://localhost:3000';

async function testStripeIntegration() {
  console.log('🧪 Testing Frontend Stripe Integration...\n');

  try {
    // Test 1: Check if subscription plans are available
    console.log('1. Testing subscription plans endpoint...');
    const plansResponse = await fetch(`${API_BASE_URL}/payments/subscription/plans/`);
    
    if (plansResponse.ok) {
      const plans = await plansResponse.json();
      console.log(`✅ Found ${plans.length} subscription plans`);
      
      if (plans.length > 0) {
        console.log(`   - Example plan: ${plans[0].name} - $${plans[0].price_monthly}/month`);
      }
    } else {
      console.log(`❌ Failed to fetch plans: ${plansResponse.status}`);
    }

    // Test 2: Check Stripe configuration endpoint
    console.log('\n2. Testing Stripe configuration endpoint...');
    const configResponse = await fetch(`${API_BASE_URL}/payments/stripe/config/`);
    
    if (configResponse.ok) {
      const config = await configResponse.json();
      console.log('✅ Stripe configuration available');
      console.log(`   - Publishable key: ${config.publishable_key ? 'Present' : 'Missing'}`);
    } else {
      console.log(`❌ Failed to fetch Stripe config: ${configResponse.status}`);
    }

    // Test 3: Check pricing page accessibility
    console.log('\n3. Testing pricing page...');
    try {
      const pricingResponse = await fetch(`${FRONTEND_URL}/pricing`);
      if (pricingResponse.ok) {
        console.log('✅ Pricing page accessible');
      } else {
        console.log(`❌ Pricing page not accessible: ${pricingResponse.status}`);
      }
    } catch (error) {
      console.log('⚠️  Frontend not running or not accessible');
    }

    // Test 4: Verify payment flow URLs
    console.log('\n4. Testing payment flow URLs...');
    const paymentUrls = [
      '/pricing',
      '/auth/signup',
      '/checkout',
      '/checkout/success'
    ];

    for (const url of paymentUrls) {
      try {
        const response = await fetch(`${FRONTEND_URL}${url}`);
        console.log(`   ${url}: ${response.ok ? '✅' : '❌'} (${response.status})`);
      } catch (error) {
        console.log(`   ${url}: ⚠️  Not accessible`);
      }
    }

    console.log('\n🎉 Stripe integration test completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start the frontend: cd workconnect-web && npm run dev');
    console.log('2. Visit http://localhost:3000/pricing');
    console.log('3. Select a plan and test the signup flow');
    console.log('4. Complete the checkout process');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testStripeIntegration(); 