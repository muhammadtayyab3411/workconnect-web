'use client'

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/common";
import { 
  FileText, 
  MessagesSquare, 
  Shield, 
  UserCheck, 
  Headphones, 
  ThumbsUp, 
  ChevronDown,
  ChevronUp,
  Briefcase,
  Search,
  CreditCard
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("clients");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How do payments work?",
      answer: "Payments are processed securely through our platform. Clients deposit funds when hiring a professional, but money is only released when the job is completed satisfactorily. This ensures protection for both parties."
    },
    {
      question: "Is there a fee?",
      answer: "Yes, WorkConnect charges a small service fee of 5% for clients and 10% for professionals. This helps us maintain the platform, provide customer support, and ensure secure transactions."
    },
    {
      question: "How are workers verified?",
      answer: "All professionals undergo a thorough verification process that includes ID verification, skills assessment, background checks, and client reviews. This ensures only qualified and trustworthy individuals are on our platform."
    },
    {
      question: "What if I am not satisfied?",
      answer: "We offer a satisfaction guarantee. If you are not happy with the work performed, you can dispute the payment within 7 days of job completion. Our support team will review the case and help resolve the issue fairly."
    }
  ];

  const clientSteps = [
    {
      number: 1,
      icon: <FileText className="w-8 h-8 text-zinc-900" />,
      title: "Post a Job",
      description: "Briefly describe what you need",
      image: "/images/how-it-works/step1-image.png",
      alt: "Post a job"
    },
    {
      number: 2,
      icon: <MessagesSquare className="w-8 h-8 text-zinc-900" />,
      title: "Receive Bids",
      description: "Get offers from verified local workers",
      image: "/images/how-it-works/step2-image.png",
      alt: "Receive bids"
    },
    {
      number: 3,
      icon: <Shield className="w-8 h-8 text-zinc-900" />,
      title: "Hire & Pay Securely",
      description: "Choose, chat, and pay through the platform",
      image: "/images/how-it-works/step3-image.png",
      alt: "Hire and pay securely"
    }
  ];

  const workerSteps = [
    {
      number: 1,
      icon: <Briefcase className="w-8 h-8 text-zinc-900" />,
      title: "Create Profile",
      description: "Add your skills and experience",
      image: "/images/how-it-works/step1-image.png",
      alt: "Create profile"
    },
    {
      number: 2,
      icon: <Search className="w-8 h-8 text-zinc-900" />,
      title: "Browse & Bid",
      description: "Find jobs that match your expertise",
      image: "/images/how-it-works/step2-image.png",
      alt: "Browse and bid"
    },
    {
      number: 3,
      icon: <CreditCard className="w-8 h-8 text-zinc-900" />,
      title: "Get Hired & Paid",
      description: "Do the job, earn money securely",
      image: "/images/how-it-works/step3-image.png",
      alt: "Get hired and paid"
    }
  ];

  const currentSteps = activeTab === "clients" ? clientSteps : workerSteps;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-10">
              <h1 className="text-3xl md:text-5xl font-semibold text-zinc-900">
                How It Works — A Simple 3-Step Process
              </h1>
              <p className="text-lg text-zinc-600">
                Whether you&apos;re hiring or looking for work, it only takes a few minutes to get started.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button className="bg-zinc-900 hover:bg-zinc-800">
                  <Link href="/post-job" className="flex items-center gap-2">
                    Post a Job
                  </Link>
                </Button>
                <Button variant="outline" className="border-zinc-200 text-zinc-900 hover:bg-zinc-100">
                  <Link href="/find-work" className="flex items-center gap-2">
                    Find Work
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden mx-auto max-w-4xl h-[300px] md:h-[400px]">
              <Image 
                src="/images/how-it-works/hero-image.png" 
                alt="High-five between business professionals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-12">
              <div className="bg-zinc-100 rounded-full p-2">
                <div className="flex relative">
                  <button 
                    className={`py-2 px-6 cursor-pointer rounded-full transition-all duration-300 relative z-10 ${activeTab === "clients" ? "text-zinc-900" : "text-zinc-600"}`}
                    onClick={() => setActiveTab("clients")}
                  >
                    For Clients
                  </button>
                  <button 
                    className={`py-2 px-6 cursor-pointer rounded-full transition-all duration-300 relative z-10 ${activeTab === "workers" ? "text-zinc-900" : "text-zinc-600"}`}
                    onClick={() => setActiveTab("workers")}
                  >
                    For Workers
                  </button>
                  <div 
                    className="absolute top-0 left-0 bg-white rounded-full shadow-sm transition-all duration-300 h-full"
                    style={{ 
                      width: "50%", 
                      transform: activeTab === "workers" ? "translateX(100%)" : "translateX(0)" 
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                {currentSteps.map((step, index) => (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm"
                  >
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full text-3xl font-normal text-zinc-900">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex items-center justify-center h-16">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-medium text-zinc-900">{step.title}</h3>
                      <p className="text-zinc-600">
                        {step.description}
                      </p>
                      <div className="relative h-36 w-full rounded-md overflow-hidden">
                        <Image 
                          src={step.image}
                          alt={step.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Platform Benefits Section */}
        <section className="py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-zinc-900">
              Why Choose Our Platform
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {/* Benefit 1 */}
              <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full">
                    <UserCheck className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900">Verified Professionals</h3>
                  <p className="text-zinc-600 text-sm">
                    All workers are thoroughly vetted
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Shield className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900">Secure Payments</h3>
                  <p className="text-zinc-600 text-sm">
                    Your money is protected until job completion
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full">
                    <Headphones className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900">24/7 Support</h3>
                  <p className="text-zinc-600 text-sm">
                    We&apos;re here to help anytime
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full">
                    <ThumbsUp className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900">Satisfaction Guarantee</h3>
                  <p className="text-zinc-600 text-sm">
                    Love the work or get your money back
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-zinc-900">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-zinc-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="p-6 w-full focus:outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-zinc-900">{faq.question}</h3>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-zinc-700 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-700 transition-transform duration-300" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-zinc-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900">Ready to Get Started?</h2>
              <p className="text-zinc-600">
                Join thousands of satisfied clients and skilled professionals on our platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button className="bg-zinc-900 hover:bg-zinc-800">
                  <Link href="/post-job" className="flex items-center gap-2">
                    Post Your First Job
                  </Link>
                </Button>
                <Button variant="outline" className="border-zinc-200 text-zinc-900 hover:bg-zinc-100">
                  <Link href="/find-work" className="flex items-center gap-2">
                    Start Finding Work
                  </Link>
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