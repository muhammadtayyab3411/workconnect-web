"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Bell, User, Settings, LogOut, HelpCircle, Menu, Home } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogoutDialog } from "./LogoutDialog";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  userName: string;
  userImage?: string;
  notificationCount?: number;
}

export function DashboardHeader({ 
  userName, 
  userImage = "/images/user2.jpg", 
  notificationCount = 0 
}: DashboardHeaderProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell, count: notificationCount },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  ];

  return (
    <header className="h-16 border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <div className="md:hidden mr-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">WorkConnect</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-6">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link 
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 text-zinc-900 hover:text-zinc-700",
                          isActive && "font-semibold text-black"
                        )}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {item.icon && (
                          <div className="relative">
                            <item.icon className={cn("w-5 h-5", isActive && "text-black")} />
                            {item.count && item.count > 0 && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
                                {item.count > 9 ? '9+' : item.count}
                              </span>
                            )}
                          </div>
                        )}
                        <span className="text-base font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                  <button 
                    className="flex items-center gap-3 text-red-600 hover:text-red-700"
                    onClick={() => {
                      setIsSheetOpen(false);
                      setShowLogoutDialog(true);
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-base font-medium">Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/dashboard" className="text-xl font-bold">
            WorkConnect
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.slice(0, 3).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-2 text-zinc-900 hover:text-zinc-700",
                  isActive && "font-semibold text-black"
                )}
              >
                {item.name === "Dashboard" ? (
                  <span className="flex items-center justify-center w-5 h-5">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={isActive ? "stroke-black stroke-2" : "stroke-current stroke-2"}
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                ) : (
                  <div className="relative">
                    <item.icon className={cn("w-5 h-5", isActive && "text-black")} />
                    {item.count && item.count > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
                        {item.count > 9 ? '9+' : item.count}
                      </span>
                    )}
                  </div>
                )}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image 
                  src={userImage} 
                  alt={userName} 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium hidden md:inline-block">{userName}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-zinc-500 truncate">user@example.com</p>
            </div>
            <DropdownMenuSeparator />
            {navItems.slice(3).map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link 
                    href={item.href} 
                    className={cn(
                      "cursor-pointer flex items-center",
                      isActive && "font-semibold"
                    )}
                  >
                    <item.icon className={cn("mr-2 h-4 w-4", isActive && "text-black")} />
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </header>
  );
} 