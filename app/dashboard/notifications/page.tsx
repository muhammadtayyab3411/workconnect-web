import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock notification data
const notifications = [
  {
    id: 1,
    type: "job",
    title: "New Job Match",
    description: "A client is looking for an electrician in your area",
    time: "2 hours ago",
    isUnread: true,
    actionText: "View Job",
    actionLink: "/dashboard/jobs/1",
    icon: "/icons/notifications/document-icon.svg"
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    description: "Client John D. sent you a message about the plumbing job",
    time: "3 hours ago",
    isUnread: true,
    actionText: "Reply",
    actionLink: "/dashboard/messages/1",
    icon: "/icons/notifications/message-icon.svg"
  },
  {
    id: 3,
    type: "verification",
    title: "Profile Verification",
    description: "Your identity verification is pending review",
    time: "5 hours ago",
    isUnread: false,
    actionText: "Complete",
    actionLink: "/dashboard/profile",
    icon: "/icons/notifications/verification-icon.svg"
  },
  {
    id: 4,
    type: "bid",
    title: "Bid Accepted",
    description: "Your bid for House Painting job was accepted",
    time: "1 day ago",
    isUnread: false,
    actionText: "View Details",
    actionLink: "/dashboard/jobs/2",
    icon: "/icons/notifications/bid-icon.svg"
  },
  {
    id: 5,
    type: "system",
    title: "System Maintenance",
    description: "Platform maintenance scheduled for tomorrow at 2 AM EST",
    time: "1 day ago",
    isUnread: false,
    actionText: "Learn More",
    actionLink: "#",
    icon: "/icons/notifications/system-icon.svg"
  }
];

export default function NotificationsPage() {
  return (
    <div className="py-6">
      {/* Notifications Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#09090B]">Notifications Center</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-zinc-200 text-zinc-900 hover:bg-zinc-50"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
          <Button 
            variant="default"
            className="flex items-center gap-2 bg-[#18181B] hover:bg-zinc-800 text-white"
          >
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-zinc-200">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <Button 
            variant="ghost" 
            className="text-[#09090B] font-medium text-sm hover:text-zinc-900 hover:bg-zinc-100 px-3 py-2 h-auto rounded-md bg-zinc-100"
          >
            All
          </Button>
          <Button 
            variant="ghost" 
            className="text-[#71717A] font-medium text-sm hover:text-zinc-900 hover:bg-zinc-100 px-3 py-2 h-auto rounded-md"
          >
            Unread
          </Button>
          <Button 
            variant="ghost" 
            className="text-[#71717A] font-medium text-sm hover:text-zinc-900 hover:bg-zinc-100 px-3 py-2 h-auto rounded-md"
          >
            Job Updates
          </Button>
          <Button 
            variant="ghost" 
            className="text-[#71717A] font-medium text-sm hover:text-zinc-900 hover:bg-zinc-100 px-3 py-2 h-auto rounded-md"
          >
            System Alerts
          </Button>
          <Button 
            variant="ghost" 
            className="text-[#71717A] font-medium text-sm hover:text-zinc-900 hover:bg-zinc-100 px-3 py-2 h-auto rounded-md"
          >
            Messages
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className="border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
                    <Image
                      src={notification.icon}
                      alt={notification.type}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-base text-[#09090B]">{notification.title}</h3>
                    {notification.isUnread && (
                      <div className="w-2 h-2 rounded-full bg-[#18181B] border border-zinc-100"></div>
                    )}
                  </div>
                  <p className="text-[#71717A] text-sm mb-4">{notification.description}</p>
                </div>
                
                {/* Timestamp and Action */}
                <div className="flex flex-col sm:items-end gap-2 sm:min-w-[120px] mt-2 sm:mt-0">
                  <span className="text-[#71717A] text-sm">{notification.time}</span>
                  <Link href={notification.actionLink}>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-[#18181B] font-medium text-sm hover:text-zinc-700"
                    >
                      {notification.actionText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 