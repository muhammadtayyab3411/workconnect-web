const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api';

// Test credentials (you can update these with actual test user credentials)
const testCredentials = {
  client: {
    email: 'client@test.com',
    password: 'testpass123'
  },
  worker: {
    email: 'worker@test.com', 
    password: 'testpass123'
  }
};

async function testChatIntegration() {
  console.log('🧪 Testing Chat System Integration...\n');

  try {
    // 1. Login as client
    console.log('1. Logging in as client...');
    const clientLogin = await axios.post(`${API_BASE_URL}/auth/login/`, testCredentials.client);
    const clientToken = clientLogin.data.access;
    console.log('✅ Client login successful');

    // 2. Login as worker
    console.log('2. Logging in as worker...');
    const workerLogin = await axios.post(`${API_BASE_URL}/auth/login/`, testCredentials.worker);
    const workerToken = workerLogin.data.access;
    console.log('✅ Worker login successful');

    // 3. Get client and worker user info
    const clientInfo = await axios.get(`${API_BASE_URL}/auth/profile/`, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    const workerInfo = await axios.get(`${API_BASE_URL}/auth/profile/`, {
      headers: { Authorization: `Bearer ${workerToken}` }
    });

    console.log(`📋 Client: ${clientInfo.data.full_name} (ID: ${clientInfo.data.id})`);
    console.log(`👷 Worker: ${workerInfo.data.full_name} (ID: ${workerInfo.data.id})`);

    // 4. Test chat API endpoints
    console.log('\n📡 Testing Chat API Endpoints...');

    // Get conversations (should be empty initially)
    console.log('4. Getting conversations...');
    const conversations = await axios.get(`${API_BASE_URL}/chat/conversations/`, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    console.log(`✅ Conversations retrieved: ${conversations.data.length || 0} found`);

    // Create a conversation
    console.log('5. Creating conversation...');
    const newConversation = await axios.post(`${API_BASE_URL}/chat/conversations/`, {
      participant_ids: [workerInfo.data.id]
    }, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    console.log(`✅ Conversation created: ${newConversation.data.id}`);

    // Send a message
    console.log('6. Sending message...');
    const message = await axios.post(`${API_BASE_URL}/chat/conversations/${newConversation.data.id}/send_message/`, {
      content: 'Hello! I saw your bid and would like to discuss the project.',
      message_type: 'text'
    }, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    console.log(`✅ Message sent: ${message.data.id}`);

    // Get conversation details
    console.log('7. Getting conversation details...');
    const conversationDetails = await axios.get(`${API_BASE_URL}/chat/conversations/${newConversation.data.id}/`, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    console.log(`✅ Conversation details retrieved with ${conversationDetails.data.messages?.length || 0} messages`);

    // Test as worker - get conversations
    console.log('8. Testing worker access...');
    const workerConversations = await axios.get(`${API_BASE_URL}/chat/conversations/`, {
      headers: { Authorization: `Bearer ${workerToken}` }
    });
    console.log(`✅ Worker can see ${workerConversations.data.length || 0} conversations`);

    // Worker sends reply
    console.log('9. Worker sending reply...');
    const workerReply = await axios.post(`${API_BASE_URL}/chat/conversations/${newConversation.data.id}/send_message/`, {
      content: 'Hi! Thank you for reaching out. I\'d be happy to discuss the project details with you.',
      message_type: 'text'
    }, {
      headers: { Authorization: `Bearer ${workerToken}` }
    });
    console.log(`✅ Worker reply sent: ${workerReply.data.id}`);

    // Test user presence
    console.log('10. Testing user presence...');
    const presence = await axios.get(`${API_BASE_URL}/chat/presence/`, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    console.log(`✅ Presence data retrieved for ${presence.data.length || 0} users`);

    console.log('\n🎉 All chat integration tests passed!');
    console.log('\n📋 Test Summary:');
    console.log(`- Conversation ID: ${newConversation.data.id}`);
    console.log(`- Messages exchanged: 2`);
    console.log(`- Participants: Client & Worker`);
    console.log(`- API endpoints tested: 6`);

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      console.log('\n💡 Tip: Make sure the Django server is running and chat app is properly configured');
    }
    
    if (error.response?.status === 401) {
      console.log('\n💡 Tip: Check if the test user credentials are correct');
    }
  }
}

// Run the test
testChatIntegration(); 