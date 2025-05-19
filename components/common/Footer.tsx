"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { 
  Phone, 
  Mail, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from "lucide-react";

// Mobile accordion component for footer sections
function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-zinc-100 md:border-none">
      <button 
        className="flex w-full items-center justify-between py-3 text-left md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-zinc-900">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
      </button>
      <div className={`pb-4 ${isOpen ? 'block' : 'hidden'} md:block md:pb-0`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-8 md:pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8 mb-8 md:mb-12">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Image src="/logo.svg" alt="WorkConnect" width={32} height={32} />
              <span className="font-bold text-xl">WorkConnect</span>
            </Link>
            <p className="text-sm text-zinc-600 max-w-xs">
              Empowering local workers and building stronger communities through technology.
            </p>
          </div>

          {/* Quick Links */}
          <FooterAccordion title="Quick Links">
            <ul className="space-y-3">
              <li>
                <Link href="/browse-jobs" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </FooterAccordion>
         
          {/* Contact */}
          <FooterAccordion title="Contact">
            <ul className="space-y-3">
              <li>
                <a href="tel:+15551234567" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:contact@workconnect.com" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@workconnect.com
                </a>
              </li>
            </ul>
          </FooterAccordion>

          {/* Newsletter */}
          <FooterAccordion title="Newsletter">
            <form className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm flex-1"
                />
                <Button className="bg-zinc-900 hover:bg-zinc-800">Subscribe</Button>
              </div>
              <div className="flex gap-4 mt-3">
                <a href="#" aria-label="Twitter">
                  <Twitter className="w-5 h-5 text-zinc-500 hover:text-zinc-900 transition-colors" />
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook className="w-5 h-5 text-zinc-500 hover:text-zinc-900 transition-colors" />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram className="w-5 h-5 text-zinc-500 hover:text-zinc-900 transition-colors" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 text-zinc-500 hover:text-zinc-900 transition-colors" />
                </a>
              </div>
            </form>
          </FooterAccordion>
        </div>

        <div className="border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} WorkConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 