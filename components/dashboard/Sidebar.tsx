"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  FileText, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Briefcase,
  Star
} from "lucide-react";

interface SidebarProps {
  userName: string;
  userRole: "client" | "worker";
  userImage?: string;
}

export function Sidebar({ userName, userRole, userImage = "/images/avatar-placeholder.png" }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };
  
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: userRole === "worker" ? "Find Jobs" : "Find Workers",
      href: userRole === "worker" ? "/dashboard/find-jobs" : "/dashboard/find-workers",
      icon: <Search className="w-5 h-5" />,
      iconPath: "/images/dashboard/find-jobs-icon.svg"
    },
    {
      name: userRole === "client" ? "Post a Job" : "My Bids",
      href: userRole === "client" ? "/dashboard/post-job" : "/dashboard/my-bids",
      icon: <FileText className="w-5 h-5" />,
      iconPath: userRole === "client" ? "/images/dashboard/post-job-icon.svg" : null
    },
    ...(userRole === "client" ? [
      {
        name: "My Jobs",
        href: "/dashboard/client/my-jobs",
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        name: "Reviews",
        href: "/dashboard/client/reviews",
        icon: <Star className="w-5 h-5" />,
      }
    ] : []),
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="w-5 h-5" />,
      iconPath: "/images/dashboard/messages-action-icon.svg"
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
      iconPath: "/images/dashboard/profile-icon.svg" 
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
      iconPath: "/images/dashboard/settings-icon.svg"
    },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-zinc-200 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="WorkConnect" width={32} height={32} />
          <span className="font-bold text-xl text-zinc-900">WorkConnect</span>
        </Link>
      </div>
      
      <div className="px-4 py-6 border-t border-b border-zinc-200 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image 
            src={userImage} 
            alt={userName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-zinc-900">{userName}</p>
          <p className="text-sm text-zinc-500 capitalize">{userRole}</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href) 
                    ? "bg-zinc-100 text-zinc-900" 
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {item.iconPath ? (
                  <Image 
                    src={item.iconPath} 
                    alt="" 
                    width={20} 
                    height={20} 
                    className="text-zinc-700"
                  />
                ) : (
                  item.icon
                )}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t border-zinc-200">
        <Link 
          href="/auth/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
} 