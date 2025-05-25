const axios = require('axios');

const API_BASE = 'http://localhost:8000/api';

// Test credentials
const testCredentials = {
  email: 'tayyab1@example.com',
  password: 'testpass123'
};

async function testJobAPI() {
  try {
    console.log('🚀 Testing Job Management API...\n');

    // 1. Login to get access token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login/`, testCredentials);
    const { access: accessToken } = loginResponse.data.tokens;
    console.log('✅ Login successful');

    // Set up authenticated headers
    const authHeaders = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // 2. Test job categories endpoint
    console.log('\n2. Fetching job categories...');
    const categoriesResponse = await axios.get(`${API_BASE}/job-categories/`, {
      headers: authHeaders
    });
    console.log(`✅ Found ${categoriesResponse.data.length} job categories`);
    console.log('Categories:', categoriesResponse.data.map(cat => cat.name).join(', '));

    // 3. Test jobs list endpoint
    console.log('\n3. Fetching jobs...');
    const jobsResponse = await axios.get(`${API_BASE}/jobs/`, {
      headers: authHeaders
    });
    console.log(`✅ Found ${jobsResponse.data.length} jobs`);
    
    if (jobsResponse.data.length > 0) {
      const firstJob = jobsResponse.data[0];
      console.log(`First job: "${firstJob.title}" in ${firstJob.city}`);
      
      // 4. Test job detail endpoint
      console.log('\n4. Fetching job details...');
      const jobDetailResponse = await axios.get(`${API_BASE}/jobs/${firstJob.id}/`, {
        headers: authHeaders
      });
      console.log(`✅ Job details: ${jobDetailResponse.data.title}`);
      console.log(`Description: ${jobDetailResponse.data.description.substring(0, 100)}...`);
    }

    // 5. Test job creation (if user is a client)
    console.log('\n5. Testing job creation...');
    const newJobData = {
      title: 'Test Job - API Integration Test',
      description: 'This is a test job created via API to verify the job management system is working correctly.',
      category: categoriesResponse.data[0].id, // Use first category
      job_type: 'one-time',
      urgent: false,
      address: '123 Test Street, Test City',
      city: 'Test City',
      payment_type: 'fixed',
      budget: 500.00,
      experience_level: 'any',
      duration: '2-4-hours'
    };

    try {
      const createJobResponse = await axios.post(`${API_BASE}/jobs/`, newJobData, {
        headers: authHeaders
      });
      console.log('✅ Job created successfully');
      console.log(`Created job ID: ${createJobResponse.data.job.id}`);
      
      // Clean up - delete the test job
      await axios.delete(`${API_BASE}/jobs/${createJobResponse.data.job.id}/`, {
        headers: authHeaders
      });
      console.log('✅ Test job cleaned up');
      
    } catch (createError) {
      if (createError.response?.status === 403) {
        console.log('ℹ️  Job creation skipped (user is not a client)');
      } else {
        throw createError;
      }
    }

    // 6. Test job filtering
    console.log('\n6. Testing job filtering...');
    const filteredJobsResponse = await axios.get(`${API_BASE}/jobs/?urgent=true`, {
      headers: authHeaders
    });
    console.log(`✅ Found ${filteredJobsResponse.data.length} urgent jobs`);

    console.log('\n🎉 All job API tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.status) {
      console.error(`Status: ${error.response.status}`);
    }
  }
}

// Run the test
testJobAPI(); 