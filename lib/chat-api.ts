import axios from 'axios';

// Get the base API instance from the main api file
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

// Helper function to get auth token
const getAuthHeader = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Create an axios instance for chat API
const chatApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
chatApi.interceptors.request.use(
  (config) => {
    const token = getAuthHeader();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Chat system interfaces
export interface ChatUser {
  id: number;
  name: string;
  avatar: string | null;
  role: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'voice';
  sender: ChatUser;
  file_url: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  participants: ChatUser[];
  job: string | null;
  job_title: string | null;
  last_message: ChatMessage | null;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail {
  id: string;
  participants: ChatUser[];
  job: string | null;
  job_title: string | null;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ConversationCreateData {
  participant_ids: number[];
  job?: string;
}

export interface MessageCreateData {
  content: string;
  message_type?: 'text' | 'image' | 'file' | 'voice';
  file_attachment?: File;
}

export interface UserPresence {
  user: ChatUser;
  is_online: boolean;
  last_seen: string;
  last_activity: string;
}

export interface WebSocketMessage {
  type: 'message_received' | 'messages_read' | 'typing_indicator' | 'user_status_change' | 'error';
  message?: ChatMessage;
  message_ids?: string[];
  reader_id?: number;
  user_id?: number;
  user_name?: string;
  is_typing?: boolean;
  is_online?: boolean;
  error?: string;
}

// Chat API
export const chatAPI = {
  // Conversations
  getConversations: async (): Promise<Conversation[]> => {
    const response = await chatApi.get('/chat/conversations/');
    return response.data.results || response.data;
  },

  getConversation: async (id: string): Promise<ConversationDetail> => {
    const response = await chatApi.get(`/chat/conversations/${id}/`);
    return response.data;
  },

  createConversation: async (data: ConversationCreateData): Promise<ConversationDetail> => {
    const response = await chatApi.post('/chat/conversations/', data);
    return response.data;
  },

  // Messages
  getMessages: async (conversationId: string, page: number = 1, pageSize: number = 50) => {
    const response = await chatApi.get(`/chat/conversations/${conversationId}/messages/`, {
      params: { page, page_size: pageSize }
    });
    return response.data;
  },

  sendMessage: async (conversationId: string, data: MessageCreateData): Promise<ChatMessage> => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('message_type', data.message_type || 'text');
    
    if (data.file_attachment) {
      formData.append('file_attachment', data.file_attachment);
    }

    const response = await chatApi.post(`/chat/conversations/${conversationId}/send_message/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  markAsRead: async (conversationId: string) => {
    const response = await chatApi.patch(`/chat/conversations/${conversationId}/mark_as_read/`);
    return response.data;
  },

  searchConversations: async (query: string): Promise<Conversation[]> => {
    const response = await chatApi.get('/chat/conversations/search/', {
      params: { q: query }
    });
    return response.data.results;
  },

  searchMessages: async (query: string, conversationId?: string): Promise<ChatMessage[]> => {
    const response = await chatApi.get('/chat/messages/search/', {
      params: { q: query, conversation_id: conversationId }
    });
    return response.data.results;
  },

  // User presence
  getUserPresence: async (): Promise<UserPresence[]> => {
    const response = await chatApi.get('/chat/presence/');
    return response.data.results || response.data;
  },

  getOnlineUsers: async (): Promise<UserPresence[]> => {
    const response = await chatApi.get('/chat/presence/online_users/');
    return response.data.results;
  },
};

export default chatAPI; 