import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.svg" alt="WorkConnect" width={32} height={32} />
              <span className="font-bold text-xl">WorkConnect</span>
            </div>
            <p className="text-sm text-zinc-600 max-w-xs">
              Empowering local workers and building stronger communities through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900 mb-4">Contact</h3>
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
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900 mb-4">Newsletter</h3>
            <form className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm flex-1"
                />
                <Button className="bg-zinc-900 hover:bg-zinc-800">Subscribe</Button>
              </div>
              <div className="flex gap-4">
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
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} WorkConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 