import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '@/lib/chat-api';
import { useAuth } from '@/lib/auth-context';

interface GlobalMessageState {
  totalUnreadCount: number;
  isLoading: boolean;
  error: string | null;
}

interface UseGlobalMessagesReturn extends GlobalMessageState {
  refreshUnreadCount: () => Promise<void>;
  markConversationAsRead: (conversationId: string) => void;
  incrementUnreadCount: (count?: number) => void;
}

export function useGlobalMessages(): UseGlobalMessagesReturn {
  const { user } = useAuth();
  const [state, setState] = useState<GlobalMessageState>({
    totalUnreadCount: 0,
    isLoading: false,
    error: null
  });
  
  const wsRef = useRef<WebSocket | null>(null);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  // Get auth token when component mounts or user changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAuthToken(token || undefined);
    }
  }, [user]);

  // Function to fetch total unread count from API
  const refreshUnreadCount = async () => {
    if (!user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const conversations = await chatAPI.getConversations();
      const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread_count, 0);
      
      setState(prev => ({
        ...prev,
        totalUnreadCount: totalUnread,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error fetching unread count:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch unread count',
        isLoading: false
      }));
    }
  };

  // Function to mark a conversation as read (decreases count)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const markConversationAsRead = (conversationId: string) => {
    // This would typically be called when user opens a conversation
    // For now, we'll refresh the count from the server
    refreshUnreadCount();
  };

  // Function to increment unread count (when new message arrives)
  const incrementUnreadCount = (count: number = 1) => {
    setState(prev => ({
      ...prev,
      totalUnreadCount: prev.totalUnreadCount + count
    }));
  };

  // Connect to global notifications WebSocket when user is authenticated
  useEffect(() => {
    if (authToken && user) {
      // WebSocket server runs on port 8000 (Daphne), API server on port 8001
      const globalNotificationsUrl = `ws://localhost:8000/ws/notifications/?token=${authToken}`;
      
      console.log('Connecting to global notifications WebSocket for message counts:', globalNotificationsUrl);
      const ws = new WebSocket(globalNotificationsUrl);
      
      ws.onopen = () => {
        console.log('Global notifications WebSocket connected for message counts');
        wsRef.current = ws;
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'new_message_notification') {
            // Increment unread count when new message arrives
            incrementUnreadCount(1);
          }
        } catch (error) {
          console.error('Error parsing global notification message:', error);
        }
      };
      
      ws.onclose = () => {
        console.log('Global notifications WebSocket disconnected');
        wsRef.current = null;
      };
      
      ws.onerror = (error) => {
        console.error('Global notifications WebSocket error:', error);
      };
      
      return () => {
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
      };
    }
  }, [authToken, user]);

  // Load initial unread count when user is authenticated
  useEffect(() => {
    if (user) {
      refreshUnreadCount();
    }
  }, [user]);

  return {
    ...state,
    refreshUnreadCount,
    markConversationAsRead,
    incrementUnreadCount
  };
} 