import { DashboardHeader } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | WorkConnect",
  description: "WorkConnect dashboard for workers and clients",
};

// This is a mock of user data that would normally come from an authenticated session
const userData = {
  name: "Alex Thompson",
  role: "client" as const, // Changed from "worker" to "client"
  image: "/images/user2.jpg",
  notificationCount: 5
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader 
        userName={userData.name} 
        userImage={userData.image} 
        notificationCount={userData.notificationCount} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
} 