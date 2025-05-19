"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full border-b border-zinc-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="WorkConnect" width={32} height={32} />
          <Link href="/" className="font-bold text-xl">WorkConnect</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "text-sm font-medium hover:text-zinc-900 transition-colors",
                  isActive ? "text-zinc-900 font-semibold" : "text-zinc-700"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">
            <Link href="/find-work">Find Work</Link>
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800">
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Button className="bg-zinc-900 hover:bg-zinc-800 h-9 px-3">
            <Link href="/post-job" className="text-sm">Post a Job</Link>
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left flex items-center gap-2">
                  <Image src="/logo.svg" alt="WorkConnect" width={24} height={24} />
                  <span>WorkConnect</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base font-medium hover:text-zinc-900 transition-colors",
                        isActive ? "text-zinc-900 font-semibold" : "text-zinc-700"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="border-t border-zinc-200 my-2 pt-4">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                    <Link href="/find-work" className="w-full">Find Work</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 