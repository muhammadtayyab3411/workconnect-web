import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  Upload, 
  MessageSquare, 
  User,
  Briefcase,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">  
      <main className="max-w-7xl mx-auto py-8">
        <div>
          {/* Support Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-zinc-900">Support Center</h1>
            <p className="text-lg text-zinc-500 mt-2">How can we help you today?</p>
            
            {/* Search Bar */}
            <div className="mt-6 relative">
              <div className="relative">
                <Input 
                  placeholder="Search for your question or topic"
                  className="w-full pl-10 pr-4 py-3 h-12 border-zinc-200 focus:ring-0 focus:border-zinc-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* FAQ Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border border-zinc-200 rounded-md shadow-sm">
                    <AccordionTrigger className="px-5 py-4 text-base font-medium text-zinc-900">
                      How do I post a job?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0 text-zinc-600">
                      To post a job, navigate to your dashboard and click on the &quot;Post a Job&quot; button. Fill out the job details form including title, description, requirements, budget, and timeline. Once submitted, your job will be visible to workers in our marketplace. You can manage all your job postings from the &quot;My Jobs&quot; section in your dashboard.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border border-zinc-200 rounded-md shadow-sm">
                    <AccordionTrigger className="px-5 py-4 text-base font-medium text-zinc-900">
                      How do I apply for a job?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0 text-zinc-600">
                      Browse available jobs in the marketplace and click on any listing to view details. If you&apos;re interested, click the &quot;Apply&quot; button and submit your proposal including your approach, timeline, and price quote. You can track all your applications from the &quot;My Applications&quot; section in your dashboard.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border border-zinc-200 rounded-md shadow-sm">
                    <AccordionTrigger className="px-5 py-4 text-base font-medium text-zinc-900">
                      How can I update my profile?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0 text-zinc-600">
                      To update your profile, go to the &quot;Profile&quot; section in your dashboard. Click on the &quot;Edit Profile&quot; button to modify your personal information, professional skills, work experience, and portfolio. Don&apos;t forget to regularly update your profile to showcase your latest work and increase your chances of being hired.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border border-zinc-200 rounded-md shadow-sm">
                    <AccordionTrigger className="px-5 py-4 text-base font-medium text-zinc-900">
                      What is the payment process?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-0 text-zinc-600">
                      After a client accepts your work, payment is released from escrow to your account. The standard payment process includes project milestones where clients fund escrow accounts before work begins. Once work is completed and approved, funds are released automatically. You can withdraw funds to your bank account or other payment methods from the &quot;Finances&quot; section.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
              
              {/* Help Articles */}
              <section>
                <h2 className="text-2xl font-semibold mb-6">Help Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Setup */}
                  <Card className="border border-zinc-200 shadow-sm p-6">
                    <div className="mb-4">
                        <User className="w-8 h-8 text-zinc-900" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Account Setup</h3>
                    <p className="text-sm text-zinc-500 mb-0">
                      Learn how to create and manage your account settings
                    </p>
                  </Card>
                  
                  {/* Job Posting & Application */}
                  <Card className="border border-zinc-200 shadow-sm p-6">
                    <div className="mb-4">
                    <Briefcase className="w-8 h-8 text-zinc-900" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Job Posting & Application</h3>
                    <p className="text-sm text-zinc-500 mb-0">
                      Guidelines for posting jobs and submitting proposals
                    </p>
                  </Card>
                  
                  {/* Payments & Invoices */}
                  <Card className="border border-zinc-200 shadow-sm p-6">
                    <div className="mb-4">
                    <CreditCard className="w-8 h-8 text-zinc-900" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Payments & Invoices</h3>
                    <p className="text-sm text-zinc-500 mb-0">
                      Understanding payment processes and billing
                    </p>
                  </Card>
                  
                  {/* Security & Privacy */}
                  <Card className="border border-zinc-200 shadow-sm p-6">
                    <div className="mb-4">
                    <ShieldCheck className="w-8 h-8 text-zinc-900" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Security & Privacy</h3>
                    <p className="text-sm text-zinc-500 mb-0">
                      Learn about our security measures and privacy policies
                    </p>
                  </Card>
                </div>
              </section>
            </div>
            
            <div className="md:col-span-1">
              {/* Contact Support */}
              <Card className="border border-zinc-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
                <p className="text-sm text-zinc-500 mb-6">
                  Send us a message and we&apos;ll get back to you
                </p>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="w-full border-zinc-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border-zinc-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-900 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="w-full min-h-[120px] border-zinc-200"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                    
                    <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                      Send Message
                    </Button>
                  </div>
                </form>
              </Card>
              
              {/* Live Chat Support */}
              <Card className="border border-zinc-200 shadow-sm p-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                    <MessageSquare className="w-5 h-5 text-zinc-900" />
                  </div>
                  <h2 className="text-xl font-semibold">Live Chat Support</h2>
                </div>
                <p className="text-sm text-zinc-500 mb-4">
                  Get instant help from our support team
                </p>
                <p className="text-sm text-zinc-500 mb-6">
                  Our support team is available Monday to Friday, 9:00 AM - 6:00 PM EST. Average response time is under 5 minutes.
                </p>
                
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                  Start Chat
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 