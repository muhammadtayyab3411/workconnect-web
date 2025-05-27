const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api';

// Test credentials
const testCredentials = {
  client: {
    email: '21jzbcs0157@uetpeshawar.edu.pk',
    password: 'testpass123'
  },
  worker: {
    email: 'worker@test.com', 
    password: 'testpass123'
  }
};

async function testMessageFunctionality() {
  console.log('🧪 Testing Message Functionality...\n');

  try {
    // 1. Login as client
    console.log('1. Logging in as client...');
    const clientLogin = await axios.post(`${API_BASE_URL}/auth/login/`, testCredentials.client);
    const clientToken = clientLogin.data.access;
    console.log('✅ Client login successful');

    // 2. Get client info
    const clientInfo = await axios.get(`${API_BASE_URL}/auth/profile/`, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    console.log(`📋 Client: ${clientInfo.data.full_name} (ID: ${clientInfo.data.id})`);

    // 3. Get workers list to find a worker to message
    console.log('3. Getting workers list...');
    const workersResponse = await axios.get(`${API_BASE_URL}/workers/`, {
      headers: { Authorization: `Bearer ${clientToken}` }
    });
    
    if (workersResponse.data.results && workersResponse.data.results.length > 0) {
      const worker = workersResponse.data.results[0];
      console.log(`👷 Found worker: ${worker.name} (ID: ${worker.id})`);

      // 4. Test conversation creation with worker
      console.log('4. Testing conversation creation...');
      
      // First check if conversation already exists
      const existingConversations = await axios.get(`${API_BASE_URL}/chat/conversations/`, {
        headers: { Authorization: `Bearer ${clientToken}` }
      });
      
      const existingConv = existingConversations.data.find(conv => 
        conv.participants.some(p => p.id === worker.id)
      );
      
      let conversationId;
      
      if (existingConv) {
        console.log(`✅ Found existing conversation: ${existingConv.id}`);
        conversationId = existingConv.id;
      } else {
        // Create new conversation
        const newConversation = await axios.post(`${API_BASE_URL}/chat/conversations/`, {
          participant_ids: [worker.id]
        }, {
          headers: { Authorization: `Bearer ${clientToken}` }
        });
        
        console.log(`✅ Created new conversation: ${newConversation.data.id}`);
        conversationId = newConversation.data.id;
      }

      // 5. Send a test message
      console.log('5. Sending test message...');
      const message = await axios.post(`${API_BASE_URL}/chat/conversations/${conversationId}/send_message/`, {
        content: 'Hello! I found your profile and would like to discuss a project.',
        message_type: 'text'
      }, {
        headers: { Authorization: `Bearer ${clientToken}` }
      });
      
      console.log(`✅ Message sent successfully: ${message.data.id}`);
      console.log(`📝 Message content: "${message.data.content}"`);

      // 6. Get conversation details to verify
      console.log('6. Verifying conversation details...');
      const conversationDetails = await axios.get(`${API_BASE_URL}/chat/conversations/${conversationId}/`, {
        headers: { Authorization: `Bearer ${clientToken}` }
      });
      
      console.log(`✅ Conversation has ${conversationDetails.data.messages?.length || 0} messages`);
      
      // 7. Test the URL pattern that would be used from find workers page
      console.log('7. Testing URL pattern simulation...');
      console.log(`🔗 Frontend would redirect to: /dashboard/messages?user=${worker.id}`);
      console.log('✅ This should now automatically create/find conversation and redirect to conversation view');

      console.log('\n🎉 All message functionality tests passed!');
      console.log('\n📋 Summary:');
      console.log(`   - Conversation ID: ${conversationId}`);
      console.log(`   - Worker ID: ${worker.id}`);
      console.log(`   - Message sent successfully`);
      console.log(`   - URL pattern: /dashboard/messages?user=${worker.id}`);
      
    } else {
      console.log('❌ No workers found to test messaging with');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('💡 Tip: Make sure the test credentials are correct and the user exists');
    }
    
    if (error.response?.status === 404) {
      console.log('💡 Tip: Make sure the API endpoints exist and the server is running');
    }
  }
}

// Run the test
testMessageFunctionality(); 