import { useEffect, useRef, useState, useCallback } from 'react';
import { ChatMessage } from '../chat-api';

export interface UseWebSocketOptions {
  onMessage?: (message: ChatMessage) => void;
  onMessagesRead?: (messageIds: string[]) => void;
  onTyping?: (userId: number, userName: string, isTyping: boolean) => void;
  onError?: (error: string) => void;
  token?: string;
}

export interface UseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (content: string) => void;
  connect: (conversationId: string) => void;
  disconnect: () => void;
}

export const useWebSocket = (options: UseWebSocketOptions = {}): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const currentConversationId = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);

  // Stable callback refs to prevent infinite loops
  const onMessageRef = useRef(options.onMessage);
  const onMessagesReadRef = useRef(options.onMessagesRead);
  const onTypingRef = useRef(options.onTyping);
  const onErrorRef = useRef(options.onError);
  const tokenRef = useRef(options.token);

  // Update refs when options change
  useEffect(() => {
    onMessageRef.current = options.onMessage;
    onMessagesReadRef.current = options.onMessagesRead;
    onTypingRef.current = options.onTyping;
    onErrorRef.current = options.onError;
    tokenRef.current = options.token;
  }, [options.onMessage, options.onMessagesRead, options.onTyping, options.onError, options.token]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setIsConnected(false);
    isConnectingRef.current = false;
    currentConversationId.current = null;
  }, []);

  const connect = useCallback((conversationId: string) => {
    // Prevent multiple connections to the same conversation
    if (currentConversationId.current === conversationId && (isConnected || isConnectingRef.current)) {
      return;
    }

    // Disconnect existing connection
    disconnect();

    // Don't connect if no conversation ID
    if (!conversationId) {
      return;
    }

    // Don't connect if no token
    if (!tokenRef.current) {
      onErrorRef.current?.('No authentication token available');
      return;
    }

    isConnectingRef.current = true;
    currentConversationId.current = conversationId;

    try {
      // Create WebSocket connection with auth token in URL params
      // WebSocket server runs on port 8000 (Daphne), API server on port 8001
      const wsUrl = `ws://localhost:8000/ws/chat/${conversationId}/?token=${tokenRef.current}`;
      
      console.log('Connecting to WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        isConnectingRef.current = false;
        wsRef.current = ws;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'message_received':
              onMessageRef.current?.(data.message);
              break;
            case 'messages_read':
              onMessagesReadRef.current?.(data.message_ids);
              break;
            case 'typing_indicator':
              onTypingRef.current?.(data.user_id, data.user_name, data.is_typing);
              break;
            case 'error':
              onErrorRef.current?.(data.message || 'WebSocket error');
              break;
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        isConnectingRef.current = false;
        
        // Only attempt to reconnect if it wasn't a manual disconnect and we still have a token
        if (event.code !== 1000 && currentConversationId.current === conversationId && tokenRef.current) {
          // Exponential backoff for reconnection
          const delay = Math.min(1000 * Math.pow(2, 0), 10000); // Start with 1 second
          reconnectTimeoutRef.current = setTimeout(() => {
            if (currentConversationId.current === conversationId && tokenRef.current) {
              connect(conversationId);
            }
          }, delay);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onErrorRef.current?.('WebSocket connection error');
        setIsConnected(false);
        isConnectingRef.current = false;
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      onErrorRef.current?.('Failed to create WebSocket connection');
      isConnectingRef.current = false;
    }
  }, [disconnect]);

  const sendMessage = useCallback((content: string) => {
    if (wsRef.current && isConnected) {
      const message = {
        type: 'send_message',
        content: content
      };
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }, [isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    sendMessage,
    connect,
    disconnect
  };
};

export default useWebSocket; 