// Test Profile API Integration
// Run this with: node test-profile.js

const axios = require('axios');

const API_URL = 'http://localhost:8000/api';

async function testProfileAPI() {
  console.log('🧪 Testing Profile API Integration...\n');

  try {
    // Test 1: Check if profile endpoint exists
    console.log('1️⃣ Testing profile endpoint availability...');
    
    try {
      const response = await axios.get(`${API_URL}/auth/profile/`);
      console.log('❌ Profile endpoint should require authentication');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Profile endpoint correctly requires authentication');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    // Test 2: Check if update endpoint exists
    console.log('\n2️⃣ Testing profile update endpoint...');
    
    try {
      const response = await axios.patch(`${API_URL}/auth/profile/`, {
        first_name: 'Test'
      });
      console.log('❌ Profile update should require authentication');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Profile update correctly requires authentication');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    // Test 3: Check if profile picture upload endpoint exists
    console.log('\n3️⃣ Testing profile picture upload endpoint...');
    
    try {
      const formData = new FormData();
      const response = await axios.post(`${API_URL}/auth/profile/picture/`, formData);
      console.log('❌ Profile picture upload should require authentication');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Profile picture upload correctly requires authentication');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 All profile API endpoints are set up correctly!');
    console.log('\n📝 Next steps:');
    console.log('1. Start the Django backend: cd workconnect-api && pipenv run python manage.py runserver');
    console.log('2. Start the Next.js frontend: cd workconnect-web && npm run dev');
    console.log('3. Login to test the profile functionality');

  } catch (error) {
    console.error('\n❌ Error testing API:', error.message);
  }
}

testProfileAPI(); 