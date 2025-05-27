import { useEffect, useRef, useState, useCallback } from 'react';

export interface GlobalNotification {
  type: 'new_message_notification';
  conversation_id: string;
  message: {
    id: string;
    content: string;
    sender_name: string;
    created_at: string;
  };
  sender_name: string;
}

export interface UseGlobalNotificationsOptions {
  onNewMessage?: (notification: GlobalNotification) => void;
  token?: string;
}

export interface UseGlobalNotificationsReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useGlobalNotifications = (options: UseGlobalNotificationsOptions = {}): UseGlobalNotificationsReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);

  // Stable callback refs to prevent infinite loops
  const onNewMessageRef = useRef(options.onNewMessage);
  const tokenRef = useRef(options.token);

  // Update refs when options change
  useEffect(() => {
    onNewMessageRef.current = options.onNewMessage;
    tokenRef.current = options.token;
  }, [options.onNewMessage, options.token]);

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
  }, []);

  const connect = useCallback(() => {
    // Prevent multiple connections
    if (isConnected || isConnectingRef.current) {
      return;
    }

    // Don't connect if no token
    if (!tokenRef.current) {
      console.warn('No authentication token available for global notifications');
      return;
    }

    isConnectingRef.current = true;

    try {
      // Create WebSocket connection with auth token in URL params
      // WebSocket server runs on port 8000 (Daphne), API server on port 8001
      const wsUrl = `ws://localhost:8000/ws/notifications/?token=${tokenRef.current}`;
      
      console.log('Connecting to Global Notifications WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('Global Notifications WebSocket connected');
        setIsConnected(true);
        isConnectingRef.current = false;
        wsRef.current = ws;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'new_message_notification') {
            onNewMessageRef.current?.(data);
          } else {
            console.log('Unknown global notification type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing global notification message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('Global Notifications WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        isConnectingRef.current = false;
        
        // Only attempt to reconnect if it wasn't a manual disconnect and we still have a token
        if (event.code !== 1000 && tokenRef.current) {
          // Exponential backoff for reconnection
          const delay = Math.min(1000 * Math.pow(2, 0), 10000); // Start with 1 second
          reconnectTimeoutRef.current = setTimeout(() => {
            if (tokenRef.current) {
              connect();
            }
          }, delay);
        }
      };

      ws.onerror = (error) => {
        console.error('Global Notifications WebSocket error:', error);
        setIsConnected(false);
        isConnectingRef.current = false;
      };

    } catch (error) {
      console.error('Error creating Global Notifications WebSocket connection:', error);
      isConnectingRef.current = false;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    connect,
    disconnect
  };
};

export default useGlobalNotifications; 