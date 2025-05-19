import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paperclip, Send, MessageSquare, CheckCircle } from "lucide-react";
import Image from "next/image";

// Mock conversation data
const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    message: "I can start the electrical work next Monday if that works for you.",
    time: "2h ago",
    image: "/images/avatars/sarah-wilson.jpg",
    isOnline: true,
    isActive: true,
    unread: true
  },
  {
    id: 2,
    name: "Michael Chen",
    message: "The plumbing estimate has been updated. Please check.",
    time: "5h ago",
    image: "/images/avatars/michael-chen.jpg",
    isOnline: false,
    isActive: false,
    unread: false
  },
  {
    id: 3,
    name: "Emma Davis",
    message: "Thanks for choosing me for the painting job!",
    time: "1d ago",
    image: "/images/avatars/emma-davis.jpg",
    isOnline: false,
    isActive: false,
    unread: false
  }
];

// Mock messages data for the selected conversation
const messages = [
  {
    id: 1,
    sender: "Sarah Wilson",
    content: "Hi! I saw your job posting for electrical work. I'm available this week for an initial consultation.",
    time: "10:30 AM",
    isSender: true
  },
  {
    id: 2,
    sender: "You",
    content: "Hello Sarah! Thanks for reaching out. Could you tell me more about your experience with similar projects?",
    time: "10:32 AM",
    isSender: false
  },
  {
    id: 3,
    sender: "Sarah Wilson",
    content: "I've been a licensed electrician for 8 years, specializing in residential work. I've completed over 200 kitchen rewiring projects.",
    time: "10:35 AM",
    isSender: true
  },
  {
    id: 4,
    sender: "You",
    content: "That's impressive! What would be your availability for next week?",
    time: "10:36 AM",
    isSender: false
  },
  {
    id: 5,
    sender: "Sarah Wilson",
    content: "I can start the electrical work next Monday if that works for you. The project should take about 2-3 days to complete.",
    time: "10:38 AM",
    isSender: true
  }
];

// Job details
const jobDetails = {
  title: "Kitchen Rewiring Project",
  status: "In Progress",
  description: "Complete rewiring of kitchen including new circuits for appliances, lighting, and GFCI outlets. Work includes upgrading electrical panel and installing new fixtures.",
  budget: "$2,500",
  timeline: "2-3 days"
};

export default function MessagesPage() {
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
            />
          </div>
          
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 px-4 py-1 h-8 rounded-md text-sm whitespace-nowrap font-medium"
            >
              All Messages
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-zinc-50 text-zinc-900 border border-zinc-200 hover:bg-zinc-100 px-4 py-1 h-8 rounded-md text-sm whitespace-nowrap font-medium"
            >
              Unread
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 px-4 py-1 h-8 rounded-md text-sm whitespace-nowrap font-medium"
            >
              Active Jobs
            </Button>
          </div>
        </div>
        
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-4 border-b border-zinc-100 flex items-start gap-3 hover:bg-zinc-50 transition-colors cursor-pointer ${conversation.isActive ? 'bg-zinc-50' : ''}`}
            >
              {/* Avatar with online indicator */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={conversation.image} 
                    alt={conversation.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h3 className={`font-medium text-base truncate ${conversation.unread ? 'text-zinc-900' : 'text-zinc-600'}`}>
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-zinc-500 ml-auto">{conversation.time}</span>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-zinc-600 truncate">
                    {conversation.message}
                  </p>
                  
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto flex-shrink-0"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile View Notice - Only visible on small screens when main chat is hidden */}
      <div className="flex-1 flex-col items-center justify-center flex sm:hidden">
        <div className="text-center p-6">
          <div className="bg-zinc-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-medium text-zinc-900 mb-2">Select a conversation</h3>
          <p className="text-zinc-500 text-sm">Choose a conversation from the list to start chatting</p>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="hidden sm:flex flex-col flex-1 h-full bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image 
                  src="/images/avatars/sarah-wilson-large.jpg" 
                  alt="Sarah Wilson"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium text-zinc-900">Sarah Wilson</h2>
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span className="px-2 py-0.5 bg-white border border-green-500 rounded-full text-green-700 text-xs font-semibold">
                  Online
                </span>
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">
                Electrical Repair - Kitchen Rewiring
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-50 h-9 px-4 rounded-md font-medium"
            >
              View Profile
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-zinc-900 hover:bg-zinc-800 text-white h-9 px-4 rounded-md font-medium"
            >
              Hire Now
            </Button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.isSender ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${message.isSender ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white'} rounded-lg p-3`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isSender ? 'text-zinc-500' : 'text-zinc-300'} opacity-70`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="p-4 border-t border-zinc-200 bg-white">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-md border border-zinc-200 h-10 w-10"
            >
              <Paperclip className="h-5 w-5 text-zinc-700" />
            </Button>
            
            <Input 
              placeholder="Type your message..." 
              className="border-zinc-200 text-zinc-600 focus-visible:ring-zinc-400 h-10"
            />
            
            <Button
              variant="default"
              size="icon"
              className="rounded-md bg-zinc-900 hover:bg-zinc-800 h-10 w-10"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar (Job Details) */}
      <div className="hidden lg:block w-80 border-l border-zinc-200 h-full bg-white">
        <div className="p-4">
          <div className="rounded-lg border border-zinc-200 shadow-sm p-4">
            <div className="mb-4">
              <h3 className="font-medium text-zinc-900">{jobDetails.title}</h3>
              <div className="mt-1">
                <span className="inline-block px-2 py-0.5 bg-black rounded-full text-white text-xs font-semibold">
                  {jobDetails.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="pt-1">
                <h4 className="text-sm font-medium text-zinc-900 mb-1">Description</h4>
                <p className="text-sm text-zinc-500">{jobDetails.description}</p>
              </div>
              
              <div className="border-t border-zinc-100 pt-3">
                <h4 className="text-sm font-medium text-zinc-900 mb-1">Budget</h4>
                <p className="text-lg font-medium text-zinc-900">{jobDetails.budget}</p>
              </div>
              
              <div className="border-t border-zinc-100 pt-3">
                <h4 className="text-sm font-medium text-zinc-900 mb-1">Timeline</h4>
                <p className="text-sm text-zinc-500">{jobDetails.timeline}</p>
              </div>
              
              <div className="border-t border-zinc-100 pt-3 flex flex-col gap-2">
                <Button
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-9 font-medium"
                >
                  View Full Job Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-900 h-9 font-medium"
                >
                  Report an Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 