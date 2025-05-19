import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";

interface HeaderProps {
  userName: string;
  userImage?: string;
  notificationCount?: number;
}

export function Header({ userName, userImage = "/images/user2.jpg", notificationCount = 0 }: HeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-2xl font-bold">
            WorkConnect
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Link href="/dashboard/notifications">
              <Bell className="w-5 h-5 text-zinc-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Link>
          </div>
          
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src={userImage} 
                alt={userName} 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{userName}</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 