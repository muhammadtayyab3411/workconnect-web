"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full border-b border-zinc-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="WorkConnect" width={32} height={32} />
            <span className="font-bold text-xl">WorkConnect</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link 
            href="/how-it-works" 
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="/services" 
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            About Us
          </Link>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/find-work">
            <Button variant="outline">Find Work</Button>
          </Link>
          <Link href="/post-job">
            <Button className="bg-zinc-900 hover:bg-zinc-800">Post a Job</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-white border-t border-zinc-100">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/how-it-works" 
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/services" 
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-zinc-100">
              <Link href="/find-work" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Find Work</Button>
              </Link>
              <Link href="/post-job" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800">Post a Job</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 