"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/dashboard/Header";
import { use } from "react";

export default function BidSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col min-h-screen">
      <Header userName="John Doe" />
      
      <main className="flex-1 pb-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-zinc-900 mb-3">Bid Submitted Successfully!</h1>
            <p className="text-zinc-600 mb-8">
              Your bid has been received and is now under review. We&apos;ll notify you when the client responds.
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/dashboard/worker/jobs">
                  Browse More Jobs
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href={`/dashboard/worker/jobs/${id}`}>
                  View Job Details
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      
      <footer className="border-t border-zinc-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-500 text-sm">
            © 2024 WorkPlace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 