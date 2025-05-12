import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b border-zinc-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="WorkConnect" width={32} height={32} />
          <Link href="/" className="font-bold text-xl">WorkConnect</Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="/#how-it-works" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">How It Works</Link>
          <Link href="/#services" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">Services</Link>
          <Link href="/about-us" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">About Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            <Link href="/find-work">Find Work</Link>
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800">
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 