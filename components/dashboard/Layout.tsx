import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userName: string;
  userRole: "client" | "worker";
  userImage?: string;
  notificationCount?: number;
}

export function DashboardLayout({
  children,
  userName,
  userRole,
  userImage,
  notificationCount
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Sidebar 
        userName={userName} 
        userRole={userRole} 
        userImage={userImage} 
      />
      
      <div className="ml-64">
        <Header 
          userName={userName} 
          userImage={userImage} 
          notificationCount={notificationCount} 
        />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 