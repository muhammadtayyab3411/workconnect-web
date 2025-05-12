"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/common";
import { Shield, Clock, CreditCard, HelpCircle } from "lucide-react";

export default function PostJob() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-cover bg-center relative" style={{ backgroundColor: "#f5f5f5", backgroundImage: "url(/images/post-job/hero.svg)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/90"></div>
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
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <span className="text-5xl font-light text-zinc-900">1</span>
                  </div>
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 6.66667H10C8.15905 6.66667 6.66667 8.15905 6.66667 10V30C6.66667 31.841 8.15905 33.3333 10 33.3333H30C31.841 33.3333 33.3333 31.841 33.3333 30V10C33.3333 8.15905 31.841 6.66667 30 6.66667Z" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 13.3333H26.6666" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 20H26.6666" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 26.6667H20" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Fill Job Details</h3>
                  <p className="text-zinc-600">Specify category, budget, and location for your job</p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <span className="text-5xl font-light text-zinc-900">2</span>
                  </div>
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="13.3333" stroke="#18181B" strokeWidth="2.67"/>
                      <path d="M16.6667 20L18.3333 21.6667L23.3333 16.6667" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Review and Publish</h3>
                  <p className="text-zinc-600">Double-check your listing and make it live</p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <span className="text-5xl font-light text-zinc-900">3</span>
                  </div>
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 11.6667H8.33333C7.41286 11.6667 6.66667 12.4129 6.66667 13.3334V31.6667C6.66667 32.5872 7.41286 33.3334 8.33333 33.3334H31.6667C32.5871 33.3334 33.3333 32.5872 33.3333 31.6667V13.3334C33.3333 12.4129 32.5871 11.6667 31.6667 11.6667H23.3333" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 21.6667V5.00002" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.1667 10.8333L20 5L25.8333 10.8333" stroke="#18181B" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <Shield className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Verified Local Workers</h3>
                  <p className="text-zinc-600">Every professional is verified and background-checked for your peace of mind</p>
                </CardContent>
              </Card>

              {/* Benefit 2 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <Clock className="w-8 h-8 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Quick Responses</h3>
                  <p className="text-zinc-600">Receive competitive bids from available workers within hours</p>
                </CardContent>
              </Card>

              {/* Benefit 3 */}
              <Card className="border-zinc-100 shadow-sm">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-zinc-100">
                    <CreditCard className="w-8 h-8 text-zinc-900" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col order-2 md:order-1">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Your job listing will look like this</h2>
                <Card className="border-zinc-200 shadow-sm mb-8">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-zinc-100">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-semibold text-zinc-900">Plumbing Repair Needed</h3>
                        <p className="text-sm text-zinc-500">Posted 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex justify-between p-4 items-center">
                      <div className="flex items-center rounded-md border border-zinc-200 px-3 py-1">
                        <span className="font-medium text-zinc-900">$50-100</span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-zinc-100">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-zinc-100 p-2 rounded-full">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Clear job title and description</h4>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-zinc-100 p-2 rounded-full">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 16.6667V15" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 8.33333V3.33333" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.3333 11.6667C13.3333 13.5076 11.8409 15.0001 10 15.0001C8.15905 15.0001 6.66666 13.5076 6.66666 11.6667C6.66666 9.82575 8.15905 8.33337 10 8.33337C11.8409 8.33337 13.3333 9.82575 13.3333 11.6667Z" stroke="#18181B" strokeWidth="1.67"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Your budget range</h4>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-zinc-100 p-2 rounded-full">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 17.5C13.3333 14.1667 16.6667 11.1786 16.6667 8.33333C16.6667 5.48809 13.6786 3.33333 10 3.33333C6.32141 3.33333 3.33334 5.48809 3.33334 8.33333C3.33334 11.1786 6.66667 14.1667 10 17.5Z" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Location information</h4>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-zinc-100 p-2 rounded-full">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 8.33333C13.3333 10.1743 11.8409 11.6667 10 11.6667C8.15905 11.6667 6.66666 10.1743 6.66666 8.33333C6.66666 6.49238 8.15905 5 10 5C11.8409 5 13.3333 6.49238 13.3333 8.33333Z" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11.6667V15" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.33334 16.6667H16.6667" stroke="#18181B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-900">Contact details (shared only with accepted workers)</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative max-w-sm w-full h-[400px] md:h-[500px]">
                  <Image 
                    src="/images/post-job/preview.svg" 
                    alt="Job listing preview" 
                    fill
                    className="object-contain object-center rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support & FAQs Section */}
        <section className="w-full py-12 md:py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-zinc-100">
                  <HelpCircle className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Need help?</h3>
                <p className="text-zinc-600 mb-4">Our support team is here to assist you</p>
                <Button variant="outline" className="gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.33333" stroke="black" strokeWidth="1.33"/>
                    <path d="M9.75555 6.24444C9.75555 5.54444 9.22222 5 8.44444 5C7.66667 5 7.11111 5.54444 7.11111 6.24444M8.44444 9.11111H8.45M6 12H11.7778" stroke="black" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 