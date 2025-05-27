"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paperclip, Send, MessageSquare, CheckCircle, Download, FileText } from "lucide-react";
import Image from "next/image";
import { chatAPI, Conversation, ConversationDetail, ChatMessage } from "@/lib/chat-api";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { useGlobalNotifications, GlobalNotification } from "@/lib/hooks/useGlobalNotifications";
import { useGlobalMessages } from "@/lib/hooks/useGlobalMessages";
import { useAuth } from "@/lib/auth-context";

export default function MessagesPage() {
  const { user } = useAuth();
  const { refreshUnreadCount } = useGlobalMessages();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationDetail | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "active">("all");
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [onlineUsers, setOnlineUsers] = useState<Set<number>>(new Set()); // Track online users
  const [creatingConversation, setCreatingConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Presence WebSocket for real-time online status
  const presenceWs = useRef<WebSocket | null>(null);

  // Get current user ID from auth context
  const currentUserId = user?.id || null;

  // Get auth token when component mounts or user changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      console.log('Setting auth token:', token ? 'Token found' : 'No token');
      setAuthToken(token || undefined);
    }
  }, [user]);

  // WebSocket integration
  const { isConnected, sendMessage, connect, disconnect } = useWebSocket({
    token: authToken, // Use the state token
    onMessage: (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    },
    onMessagesRead: (messageIds: string[]) => {
      setMessages(prev => 
        prev.map(msg => 
          messageIds.includes(msg.id) ? { ...msg, is_read: true } : msg
        )
      );
    },
    onTyping: (userId: number, userName: string, isTyping: boolean) => {
      // Handle typing indicators if needed
      console.log(`${userName} is ${isTyping ? 'typing' : 'stopped typing'}`);
    },
    onError: (error: string) => {
      console.error('WebSocket error:', error);
    }
  });

  // Global notifications for messages in other conversations
  const { connect: connectGlobalNotifications, disconnect: disconnectGlobalNotifications } = useGlobalNotifications({
    token: authToken,
    onNewMessage: (notification: GlobalNotification) => {
      console.log('Received global notification:', notification);
      
      // Update the conversation list to show new message
      setConversations(prev => 
        prev.map(conv => {
          if (conv.id === notification.conversation_id) {
            return {
              ...conv,
              last_message: {
                id: notification.message.id,
                content: notification.message.content,
                message_type: 'text',
                sender: {
                  id: 0, // We don't have full sender info in notification
                  name: notification.sender_name,
                  avatar: null,
                  role: 'worker' as const // Default, will be updated when conversation is loaded
                },
                file_url: null,
                is_read: false,
                created_at: notification.message.created_at,
                updated_at: notification.message.created_at
              },
              unread_count: conv.unread_count + 1
            };
          }
          return conv;
        })
      );
      
      // Refresh global unread count
      refreshUnreadCount();
    }
  });

  // Connect to presence WebSocket when user is authenticated
  useEffect(() => {
    if (authToken && user) {
      // WebSocket server runs on port 8000 (Daphne), API server on port 8001
      const presenceUrl = `ws://localhost:8000/ws/presence/?token=${authToken}`;
      
      console.log('Connecting to presence WebSocket:', presenceUrl);
      const ws = new WebSocket(presenceUrl);
      
      ws.onopen = () => {
        console.log('Presence WebSocket connected');
        presenceWs.current = ws;
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'user_status_change') {
            setOnlineUsers(prev => {
              const newSet = new Set(prev);
              if (data.is_online) {
                newSet.add(data.user_id);
              } else {
                newSet.delete(data.user_id);
              }
              return newSet;
            });
          } else if (data.type === 'initial_presence') {
            // Handle initial presence data if backend sends it
            if (data.online_users) {
              setOnlineUsers(new Set(data.online_users));
            }
          }
        } catch (error) {
          console.error('Error parsing presence message:', error);
        }
      };
      
      ws.onclose = () => {
        console.log('Presence WebSocket disconnected');
        presenceWs.current = null;
      };
      
      return () => {
        if (presenceWs.current) {
          presenceWs.current.close();
          presenceWs.current = null;
        }
      };
    }
  }, [authToken, user]);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const selectConversation = async (conversationId: string) => {
    try {
      const conversation = await chatAPI.getConversation(conversationId);
      setSelectedConversation(conversation);
      setMessages(conversation.messages || []);
      
      // Mark messages as read
      if (conversation.messages?.length > 0) {
        await chatAPI.markAsRead(conversationId);
        // Refresh global unread count after marking as read
        refreshUnreadCount();
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  // Function to handle the 'user' URL parameter
  const handleUserParameter = useCallback(async (targetUserId: number, currentConversations: Conversation[]) => {
    console.log('🔧 handleUserParameter called with:', targetUserId, 'current user:', user?.id);
    
    if (!user || targetUserId === user.id) {
      console.log('❌ Skipping - no user or same user');
      return;
    }
    
    console.log('🔄 Setting creatingConversation to true');
    setCreatingConversation(true);
    
    try {
      // First, check if a conversation already exists with this user
      const existingConversation = currentConversations.find(conv => 
        conv.participants.some(p => p.id === targetUserId)
      );
      
      console.log('🔍 Existing conversation check:', existingConversation ? existingConversation.id : 'none found');
      
      if (existingConversation) {
        // Select existing conversation
        console.log('✅ Selecting existing conversation:', existingConversation.id);
        await selectConversation(existingConversation.id);
        // Update URL to reflect the conversation
        router.replace(`/dashboard/messages?conversation=${existingConversation.id}`);
      } else {
        // Create new conversation
        console.log('🆕 Creating new conversation with user:', targetUserId);
        
        try {
          const newConversation = await chatAPI.createConversation({
            participant_ids: [targetUserId]
          });
          
          console.log('✅ New conversation created:', newConversation.id);
          
          // Reload conversations to include the new one
          console.log('🔄 Reloading conversations...');
          await loadConversations();
          
          // Select the new conversation
          console.log('📞 Selecting new conversation:', newConversation.id);
          await selectConversation(newConversation.id);
          
          // Update URL to reflect the conversation
          router.replace(`/dashboard/messages?conversation=${newConversation.id}`);
          
        } catch (apiError) {
          console.error('❌ API Error creating conversation:', apiError);
          if (apiError instanceof Error) {
            console.error('Error message:', apiError.message);
          }
          // Try to get more details from the error response
          if (apiError && typeof apiError === 'object' && 'response' in apiError) {
            const errorResponse = apiError as { response?: { data?: unknown; status?: number } };
            console.error('API Response:', errorResponse.response?.data);
            console.error('API Status:', errorResponse.response?.status);
          }
        }
      }
    } catch (error) {
      console.error('❌ General error in handleUserParameter:', error);
    } finally {
      console.log('🔄 Setting creatingConversation to false');
      setCreatingConversation(false);
    }
  }, [user, router]);

  // Handle URL parameters for auto-selecting conversations or creating new ones
  useEffect(() => {
    const conversationId = searchParams.get('conversation');
    const userId = searchParams.get('user');
    
    console.log('🔍 URL Parameters Effect Running:', { 
      conversationId, 
      userId, 
      conversationsLength: conversations.length, 
      userExists: !!user,
      currentUserId: user?.id, 
      creatingConversation,
      searchParamsString: searchParams.toString()
    });
    
    // Handle conversation ID parameter
    if (conversationId && conversations.length > 0) {
      console.log('📞 Selecting conversation by ID:', conversationId);
      selectConversation(conversationId);
      return;
    }
    
    // Handle user ID parameter
    if (userId && conversations.length > 0 && user && !creatingConversation) {
      console.log('👤 Handling user parameter:', userId);
      const targetUserId = parseInt(userId);
      if (!isNaN(targetUserId)) {
        handleUserParameter(targetUserId, conversations);
      } else {
        console.error('❌ Invalid user ID:', userId);
      }
      return;
    }
    
    // Log why no action was taken
    if (!userId && !conversationId) {
      console.log('ℹ️ No URL parameters to handle');
    } else if (!conversations.length) {
      console.log('⏳ Waiting for conversations to load...');
    } else if (!user) {
      console.log('⏳ Waiting for user authentication...');
    } else if (creatingConversation) {
      console.log('🔄 Already creating conversation...');
    }
  }, [searchParams, conversations, user, creatingConversation, handleUserParameter]);

  // Additional effect to handle URL parameters when both user and conversations are ready
  useEffect(() => {
    const userId = searchParams.get('user');
    
    console.log('🚀 Secondary URL parameter handler check:', {
      hasUserId: !!userId,
      hasUser: !!user,
      userLoaded: !!user?.id,
      conversationsLoaded: conversations.length > 0,
      notCreating: !creatingConversation,
      noSelectedConversation: !selectedConversation,
      loading
    });
    
    // Only run this effect if we have a user parameter and both user and conversations are loaded
    if (userId && user?.id && conversations.length > 0 && !creatingConversation && !selectedConversation && !loading) {
      console.log('🚀 All conditions met - executing handleUserParameter');
      const targetUserId = parseInt(userId);
      if (!isNaN(targetUserId) && targetUserId !== user.id) {
        console.log('🎯 Calling handleUserParameter with:', targetUserId);
        handleUserParameter(targetUserId, conversations);
      } else {
        console.log('❌ Invalid user ID or same as current user:', { targetUserId, currentUserId: user.id });
      }
    } else {
      console.log('⏳ Waiting for conditions to be met...');
    }
  }, [user, conversations, searchParams, creatingConversation, selectedConversation, handleUserParameter, loading]);

  // Connect to WebSocket when conversation is selected
  useEffect(() => {
    if (selectedConversation?.id && authToken) {
      console.log('Connecting to WebSocket for conversation:', selectedConversation.id);
      connect(selectedConversation.id);
      
      return () => {
        console.log('Disconnecting WebSocket');
        disconnect();
      };
    }
  }, [selectedConversation?.id, authToken]); // Depend on both conversation ID and auth token

  // Connect to global notifications when user is authenticated
  useEffect(() => {
    if (authToken && user) {
      console.log('Connecting to global notifications');
      connectGlobalNotifications();
      
      return () => {
        console.log('Disconnecting global notifications');
        disconnectGlobalNotifications();
      };
    }
  }, [authToken, user, connectGlobalNotifications, disconnectGlobalNotifications]);

  // Auto-scroll to bottom when new messages arrive or conversation loads
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Small delay to ensure DOM is updated
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]); // Scroll when messages change or conversation changes

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await chatAPI.getConversations();
      setConversations(data);
      
      // Auto-select first conversation if available
      if (data.length > 0 && !selectedConversation) {
        await selectConversation(data[0].id);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      if (isConnected) {
        // Use WebSocket for real-time messaging
        sendMessage(messageContent);
      } else {
        // Fallback to REST API if WebSocket is not connected
        await chatAPI.sendMessage(selectedConversation.id, {
          content: messageContent,
          message_type: 'text'
        });
        
        // Note: Don't manually add message to state - WebSocket will broadcast it
        console.log('✅ Text message sent via REST API - will appear via WebSocket');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore message on error
      setNewMessage(messageContent);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv => {
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesParticipant = conv.participants.some(p => 
        p.name.toLowerCase().includes(searchLower)
      );
      const matchesJob = conv.job_title?.toLowerCase().includes(searchLower);
      const matchesMessage = conv.last_message?.content.toLowerCase().includes(searchLower);
      
      if (!matchesParticipant && !matchesJob && !matchesMessage) {
        return false;
      }
    }

    // Apply status filter
    switch (filter) {
      case "unread":
        return conv.unread_count > 0;
      case "active":
        return conv.job !== null;
      default:
        return true;
    }
  });

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const getOtherParticipant = (conversation: Conversation | ConversationDetail) => {
    return conversation.participants.find(p => p.id !== currentUserId);
  };

  // Utility function to trim long names
  const trimName = (name: string, maxLength: number = 20) => {
    if (!name) return 'Unknown User';
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  // Navigation functions
  const handleViewProfile = () => {
    const otherParticipant = getOtherParticipant(selectedConversation!);
    if (otherParticipant) {
      if (otherParticipant.role === 'worker') {
        router.push(`/dashboard/worker/${otherParticipant.id}`);
      } else {
        // For clients, redirect to their own profile since we don't have client profile pages
        router.push(`/dashboard/profile`);
      }
    } else {
      console.error('No participant found to view profile');
    }
  };

  const handleViewJob = () => {
    if (selectedConversation?.job) {
      // Check user role to determine the correct job view path
      if (user?.role === 'worker') {
        router.push(`/dashboard/worker/jobs/${selectedConversation.job}`);
      } else {
        router.push(`/dashboard/client/my-jobs/${selectedConversation.job}`);
      }
    } else {
      console.error('No job associated with this conversation');
    }
  };

  const handleViewFullJobDetails = () => {
    if (selectedConversation?.job) {
      // Check user role to determine the correct job view path
      if (user?.role === 'worker') {
        router.push(`/dashboard/worker/jobs/${selectedConversation.job}`);
      } else {
        router.push(`/dashboard/client/my-jobs/${selectedConversation.job}`);
      }
    } else {
      console.error('No job associated with this conversation');
    }
  };

  const handleReportIssue = () => {
    // You can implement a report issue modal or redirect to a support page
    console.log('Report issue functionality - to be implemented');
    // For now, redirect to support page if it exists
    router.push('/dashboard/support');
  };

  const handleAttachment = () => {
    if (!selectedConversation) {
      console.error('No conversation selected');
      return;
    }

    // Create a file input element and trigger click
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await handleFileUpload(file);
      }
    };
    fileInput.click();
  };

  const handleFileUpload = async (file: File) => {
    if (!selectedConversation) return;

    // File size validation (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size too large. Maximum size is 10MB.');
      return;
    }

    // File type validation
    const allowedTypes = [
      // Images
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      // Documents
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // Text files
      'text/plain', 'text/csv',
      // Archives
      'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Allowed types: images, PDF, Word, Excel, PowerPoint, text files, and archives.');
      return;
    }

    console.log('📎 Uploading file:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2) + 'MB');
    setUploadingFile(true);

    try {
      // Determine message type based on file type
      let messageType: 'image' | 'file' = 'file';
      if (file.type.startsWith('image/')) {
        messageType = 'image';
      }

      // Create a message with file attachment
      const messageData = {
        content: `📎 ${file.name}`, // Show filename as content
        message_type: messageType,
        file_attachment: file
      };

      if (isConnected) {
        // For WebSocket, we need to use the REST API fallback for file uploads
        // since WebSocket doesn't handle file uploads directly
        console.log('🔄 Using REST API for file upload (WebSocket doesn\'t support files)');
        await chatAPI.sendMessage(selectedConversation.id, messageData);
        
        // Note: Don't manually add message to state - WebSocket will broadcast it
        console.log('✅ File uploaded successfully - message will appear via WebSocket');
      } else {
        // Use REST API
        await chatAPI.sendMessage(selectedConversation.id, messageData);
        
        // Note: Don't manually add message to state - WebSocket will broadcast it
        console.log('✅ File uploaded successfully - message will appear via WebSocket');
      }

    } catch (error) {
      console.error('❌ Error uploading file:', error);
      
      // Show user-friendly error message
      let errorMessage = 'Failed to upload file. Please try again.';
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: { error?: string; file_attachment?: string[] } } };
        if (errorResponse.response?.data?.error) {
          errorMessage = errorResponse.response.data.error;
        } else if (errorResponse.response?.data?.file_attachment) {
          errorMessage = errorResponse.response.data.file_attachment[0];
        }
      }
      
      alert(errorMessage);
    } finally {
      setUploadingFile(false);
    }
  };

  // Helper function to render message content based on type
  const renderMessageContent = (message: ChatMessage, isCurrentUser: boolean) => {
    const baseClasses = `max-w-[80%] ${isCurrentUser ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-900'} rounded-lg p-3`;
    
    if (message.message_type === 'image' && message.file_url) {
      return (
        <div className={baseClasses}>
          <div className="mb-2">
            <Image
              src={message.file_url}
              alt="Shared image"
              width={300}
              height={200}
              className="rounded-lg max-w-full h-auto"
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
          </div>
          {message.content && (
            <p className="text-sm">{message.content}</p>
          )}
          <p className={`text-xs mt-1 ${isCurrentUser ? 'text-zinc-300' : 'text-zinc-500'} opacity-70`}>
            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      );
    }
    
    if (message.message_type === 'file' && message.file_url) {
      const fileName = message.content.replace('📎 ', '') || 'Download file';
      
      return (
        <div className={baseClasses}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isCurrentUser ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
              <FileText className={`h-5 w-5 ${isCurrentUser ? 'text-zinc-300' : 'text-zinc-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <a
                href={message.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-xs ${
                  isCurrentUser ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                } hover:underline`}
              >
                <Download className="h-3 w-3" />
                Download
              </a>
            </div>
          </div>
          <p className={`text-xs mt-1 ${isCurrentUser ? 'text-zinc-300' : 'text-zinc-500'} opacity-70`}>
            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      );
    }
    
    // Default text message
    return (
      <div className={baseClasses}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-zinc-300' : 'text-zinc-500'} opacity-70`}>
          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto mb-4"></div>
          <p className="text-zinc-500">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar (Conversations) */}
      <div className="w-full sm:w-80 md:w-96 border-r border-zinc-200 flex flex-col h-full bg-white">
        {/* Search and Filters */}
        <div className="p-4 border-b border-zinc-200">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10 border-zinc-200 text-zinc-600 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            <Button
              variant="ghost"
              size="sm"
              className={`${filter === 'all' ? 'bg-zinc-50' : 'bg-white'} text-zinc-900 border border-zinc-200 hover:bg-zinc-50 px-4 py-1 h-8 rounded-md text-sm whitespace-nowrap font-medium`}
              onClick={() => setFilter('all')}
            >
              All Messages
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${filter === 'unread' ? 'bg-zinc-50' : 'bg-white'} text-zinc-900 border border-zinc-200 hover:bg-zinc-100 px-4 py-1 h-8 rounded-md text-sm whitespace-nowrap font-medium`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${filter === 'active' ? 'bg-zinc-50' : 'bg-white'} text-zinc-900 border border-zinc-200 hover:bg-zinc-50 px-4 py-1 h-8 rounded-md text-sm whitespace-nowrap font-medium`}
              onClick={() => setFilter('active')}
            >
              Active Jobs
            </Button>
          </div>
        </div>
        
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-zinc-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-zinc-400" />
              <p className="text-sm">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);
              const isActive = selectedConversation?.id === conversation.id;
              
              return (
                <div 
                  key={conversation.id}
                  className={`p-4 border-b border-zinc-100 flex items-start gap-3 hover:bg-zinc-50 transition-colors cursor-pointer ${isActive ? 'bg-zinc-50' : ''}`}
                  onClick={() => selectConversation(conversation.id)}
                >
                  {/* Avatar with online indicator */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
                      {otherParticipant?.avatar ? (
                        <Image 
                          src={otherParticipant.avatar} 
                          alt={otherParticipant.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-zinc-500 font-medium">
                          {otherParticipant?.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      )}
                    </div>
                    {/* Online indicator - now using real-time presence */}
                    <div className={`absolute bottom-0 right-0 w-3 h-3 ${onlineUsers.has(otherParticipant?.id || 0) ? 'bg-green-500' : 'bg-zinc-400'} rounded-full border-2 border-white`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h3 className={`font-medium text-base truncate ${conversation.unread_count > 0 ? 'text-zinc-900' : 'text-zinc-600'}`}>
                        {trimName(otherParticipant?.name || 'Unknown User')}
                      </h3>
                      <span className="text-xs text-zinc-500 ml-auto">
                        {conversation.last_message ? formatTime(conversation.last_message.created_at) : ''}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-zinc-600 truncate">
                        {conversation.job_title && (
                          <span className="text-zinc-500">Re: {conversation.job_title} - </span>
                        )}
                        {conversation.last_message?.content || 'No messages yet'}
                      </p>
                      
                      {conversation.unread_count > 0 && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Mobile View Notice - Only visible on small screens when main chat is hidden */}
      {!selectedConversation && (
        <div className="flex-1 flex-col items-center justify-center flex sm:hidden">
          <div className="text-center p-6">
            <div className="bg-zinc-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 mb-2">Select a conversation</h3>
            <p className="text-zinc-500 text-sm">Choose a conversation from the list to start chatting</p>
          </div>
        </div>
      )}
      
      {/* Main Chat Area */}
      {selectedConversation && (
        <div className="hidden sm:flex flex-col flex-1 h-full bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
                  {getOtherParticipant(selectedConversation)?.avatar ? (
                    <Image 
                      src={getOtherParticipant(selectedConversation)!.avatar!} 
                      alt={getOtherParticipant(selectedConversation)!.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-zinc-500 font-medium text-lg">
                      {getOtherParticipant(selectedConversation)?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  )}
                </div>
                {/* Online indicator - now using real-time presence */}
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${onlineUsers.has(getOtherParticipant(selectedConversation)?.id || 0) ? 'bg-green-500' : 'bg-zinc-400'} rounded-full border-2 border-white`}></div>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-zinc-900">
                    {trimName(getOtherParticipant(selectedConversation)?.name || 'Unknown User')}
                  </h2>
                  {getOtherParticipant(selectedConversation)?.role === 'worker' && (
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  )}
                  <span className={`px-2 py-0.5 border rounded-full text-xs font-semibold ${
                    onlineUsers.has(getOtherParticipant(selectedConversation)?.id || 0) 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-zinc-50 border-zinc-300 text-zinc-600'
                  }`}>
                    {onlineUsers.has(getOtherParticipant(selectedConversation)?.id || 0) ? 'Online' : 'Offline'}
                  </span>
                </div>
                {selectedConversation.job_title && (
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {selectedConversation.job_title}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-50 h-9 px-4 rounded-md font-medium"
                onClick={handleViewProfile}
              >
                View Profile
              </Button>
              {selectedConversation.job && (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white h-9 px-4 rounded-md font-medium"
                  onClick={handleViewJob}
                >
                  View Job
                </Button>
              )}
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.length === 0 ? (
              <div className="text-center text-zinc-500 mt-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-zinc-400" />
                <p className="text-sm">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => {
                const isCurrentUser = message.sender.id === currentUserId;
                return (
                  <div 
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {renderMessageContent(message, isCurrentUser)}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-zinc-200 bg-white">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-md border border-zinc-200 h-10 w-10"
                onClick={handleAttachment}
                disabled={uploadingFile}
              >
                <Paperclip className="h-5 w-5 text-zinc-700" />
              </Button>
              
              <Input 
                placeholder="Type your message..." 
                className="border-zinc-200 text-zinc-600 focus-visible:ring-zinc-400 h-10"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              
              <Button
                variant="default"
                size="icon"
                className="rounded-md bg-zinc-900 hover:bg-zinc-800 h-10 w-10"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Right Sidebar (Job Details) */}
      {selectedConversation?.job && (
        <div className="hidden lg:block w-80 border-l border-zinc-200 h-full bg-white">
          <div className="p-4">
            <div className="rounded-lg border border-zinc-200 shadow-sm p-4">
              <div className="mb-4">
                <h3 className="font-medium text-zinc-900">{selectedConversation.job_title}</h3>
                <div className="mt-1">
                  <span className="inline-block px-2 py-0.5 bg-black rounded-full text-white text-xs font-semibold">
                    Active
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="pt-1">
                  <h4 className="text-sm font-medium text-zinc-900 mb-1">Job Details</h4>
                  <p className="text-sm text-zinc-500">View full job details and requirements.</p>
                </div>
                
                <div className="border-t border-zinc-100 pt-3 flex flex-col gap-2">
                  <Button
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-9 font-medium"
                    onClick={handleViewFullJobDetails}
                  >
                    View Full Job Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-900 h-9 font-medium"
                    onClick={handleReportIssue}
                  >
                    Report an Issue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 