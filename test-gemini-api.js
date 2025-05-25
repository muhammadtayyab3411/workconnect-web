#!/usr/bin/env node

/**
 * Test Gemini API Integration
 * This tests the document upload with Gemini AI verification
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_BASE_URL = 'http://localhost:8000/api';

// Test with the verified user from database
const TEST_USER = {
  email: '21jzbcs0157@uetpeshawar.edu.pk', // Verified user from DB
  password: 'testpass123' // You'll need to provide the actual password
};

let authToken = null;

async function login(email, password) {
  try {
    console.log(`🔐 Logging in as ${email}...`);
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
      email: email,
      password: password
    });
    authToken = response.data.tokens.access;
    console.log('✅ Login successful');
    return true;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDocumentReverify() {
  try {
    console.log('\n🔄 Testing document re-verification...');
    
    // First get existing documents
    const docsResponse = await axios.get(`${API_BASE_URL}/auth/profile/documents/`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log(`📄 Found ${docsResponse.data.length} existing documents`);
    
    if (docsResponse.data.length > 0) {
      const doc = docsResponse.data[0];
      console.log(`🔍 Testing re-verification of document: ${doc.document_type} (${doc.status})`);
      
      const reverifyResponse = await axios.post(
        `${API_BASE_URL}/auth/profile/documents/${doc.id}/reverify/`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      
      console.log('✅ Re-verification successful!');
      console.log('📊 Verification result:', {
        status: reverifyResponse.data.verification_result?.status,
        confidence: reverifyResponse.data.verification_result?.confidence,
        reasoning: reverifyResponse.data.verification_result?.reasoning
      });
      
      return true;
    } else {
      console.log('ℹ️  No existing documents to re-verify');
      return false;
    }
    
  } catch (error) {
    console.log('❌ Document re-verification failed:', error.response?.data || error.message);
    return false;
  }
}

async function createTestImageFile() {
  // Create a simple test text file that mimics an image
  const testContent = `
TEST NATIONAL ID DOCUMENT
========================

Full Name: Muhammadd Tayyab Batch 21
ID Number: 12345-6789012-3
Date of Birth: 1990-01-01
Expiry Date: 2030-12-31
Issuing Authority: Government of Test Country

This is a test document for AI verification.
  `;
  
  fs.writeFileSync('test-id.txt', testContent);
  return 'test-id.txt';
}

async function testDocumentUpload() {
  try {
    console.log('\n📤 Testing document upload with Gemini AI...');
    
    // Create a test file
    const testFile = await createTestImageFile();
    
    const formData = new FormData();
    formData.append('document_type', 'national_id');
    formData.append('document_file', fs.createReadStream(testFile));
    
    const uploadResponse = await axios.post(
      `${API_BASE_URL}/auth/profile/documents/upload/`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    
    console.log('✅ Document upload successful!');
    console.log('📊 AI Verification result:', {
      status: uploadResponse.data.verification_result?.status,
      confidence: uploadResponse.data.verification_result?.confidence,
      reasoning: uploadResponse.data.verification_result?.reasoning,
      issues: uploadResponse.data.verification_result?.issues
    });
    
    // Clean up test file
    fs.unlinkSync(testFile);
    
    return true;
    
  } catch (error) {
    console.log('❌ Document upload failed:', error.response?.data || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing Gemini API Integration\n');
  
  // Prompt for password if needed
  const email = process.argv[2] || TEST_USER.email;
  const password = process.argv[3];
  
  if (!password) {
    console.log('❌ Please provide password as argument:');
    console.log(`node test-gemini-api.js "${email}" "your-password"`);
    console.log('\nOr use with any verified user:');
    console.log('node test-gemini-api.js "your-email@example.com" "your-password"');
    return;
  }
  
  // Test login
  const loginSuccess = await login(email, password);
  if (!loginSuccess) {
    console.log('\n❌ Cannot proceed without authentication');
    return;
  }
  
  // Test re-verification first (if existing documents)
  await testDocumentReverify();
  
  // Test new document upload
  await testDocumentUpload();
  
  console.log('\n🎉 Gemini API tests completed!');
  console.log('If you see AI verification results above, the integration is working correctly.');
}

// Handle command line arguments
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, login, testDocumentReverify, testDocumentUpload }; 