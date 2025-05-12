"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/common";
import { Shield, Clock, HelpCircle, CircleCheckBig, Headphones, Lock, FileText, Users } from "lucide-react";

export default function PostJob() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-cover bg-center relative" style={{ backgroundColor: "#f5f5f5", backgroundImage: "url(/images/about/about-hero.png)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900">Need a Helping Hand? Post a Job Now!</h1>
              <p className="text-lg md:text-xl text-zinc-700 mt-2">
                Find reliable, local professionals for any task — fast and hassle-free
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button size="lg" className="bg-zinc-900 hover:bg-zinc-800">Post a Job</Button>
                <Button size="lg" variant="outline">Browse Workers</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Job Posting Overview Section */}
        <section className="w-full py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900">Post Your Job in 3 Simple Steps</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <span className="text-5xl font-light text-zinc-400">1</span>
                  </div>
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                  <FileText className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Fill Job Details</h3>
                  <p className="text-zinc-600">Specify category, budget, and location for your job</p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <span className="text-5xl font-light text-zinc-400">2</span>
                  </div>
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <Clock className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Review and Publish</h3>
                  <p className="text-zinc-600">Double-check your listing and make it live</p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <span className="text-5xl font-light text-zinc-400">3</span>
                  </div>
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                  <Users className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Receive Bids</h3>
                  <p className="text-zinc-600">Get competitive offers from local professionals</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-16 md:py-20 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900">Why Post with WorkConnect?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Benefit 1 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <Shield className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Verified Local Workers</h3>
                  <p className="text-zinc-600">Every professional is verified and background-checked for your peace of mind</p>
                </CardContent>
              </Card>

              {/* Benefit 2 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <Clock className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Quick Responses</h3>
                  <p className="text-zinc-600">Receive competitive bids from available workers within hours</p>
                </CardContent>
              </Card>

              {/* Benefit 3 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full">
                    <Lock className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Secure & Easy</h3>
                  <p className="text-zinc-600">Protected payments and simple communication system</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ready-to-Go CTA Strip */}
        <section className="w-full py-12 md:py-16 bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl font-bold text-white">It only takes a minute to post your job</h2>
              <Link href="/post-job/new">
                <Button size="lg" className="bg-zinc-50 text-zinc-900 hover:bg-zinc-100">Get Started</Button>
              </Link>
              <p className="text-zinc-300 text-sm">No hidden fees. Free to post.</p>
            </div>
          </div>
        </section>

        {/* Visual Mockup Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col">
                <Card className="border-zinc-200 shadow-sm">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-900">Plumbing Repair Needed</h3>
                          <p className="text-sm text-zinc-500">Posted 2 minutes ago</p>
                        </div>
                        <div className="flex items-center rounded-md border border-zinc-200 px-3 py-1">
                          <span className="font-medium text-zinc-900">$50-100</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-zinc-600 mb-4">Need a professional plumber to fix a leaking kitchen faucet...</p>
                      <div className="flex justify-between text-zinc-500 text-sm">
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="#71717A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 14C10.6667 11.3333 13.3333 8.94286 13.3333 6.66667C13.3333 4.39048 10.9428 2.66667 8 2.66667C5.05724 2.66667 2.66667 4.39048 2.66667 6.66667C2.66667 8.94286 5.33333 11.3333 8 14Z" stroke="#71717A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          San Francisco, CA
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="5.33333" r="2.66667" stroke="#71717A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3333 13.3333C13.3333 11.1242 10.9428 9.33333 8 9.33333C5.05724 9.33333 2.66667 11.1242 2.66667 13.3333" stroke="#71717A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          John D.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Your job listing will look like this</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="mt-1 p-2 rounded-full">
                      <CircleCheckBig className="w-6 h-6 text-zinc-900" />
                    </div>
                      <h4 className="font-medium text-zinc-900">Clear job title and description</h4>
                    <div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="mt-1 p-2 rounded-full">
                      <CircleCheckBig className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Your budget range</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="mt-1 p-2 rounded-full">
                      <CircleCheckBig className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Location information</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="mt-1 p-2 rounded-full">
                      <CircleCheckBig className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Contact details (shared only with accepted workers)</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support & FAQs Section */}
        <section className="w-full py-12 md:py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-zinc-900" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Need help?</h3>
              <p className="text-zinc-600 mb-5">Our support team is here to assist you</p>
              <Button variant="outline" className="gap-2 px-6">
                <HelpCircle className="w-4 h-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 