"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/common";
import { ChevronDown, Search, Home, Users, CircleDollarSign, Shield, MessageSquare, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// FAQ data for different categories
const faqData = {
  general: [
    { id: "general-1", question: "What is WorkConnect?", answer: "WorkConnect is a platform that connects clients with skilled workers for various tasks. Our goal is to make it easy for you to find the right talent for your projects." },
    { id: "general-2", question: "How does WorkConnect work?", answer: "Simply sign up, post your job or browse available gigs, connect with clients/workers, and complete projects through our secure platform." },
    { id: "general-3", question: "Is WorkConnect available in my area?", answer: "WorkConnect is available in most major cities across the country. You can check availability in your specific location by entering your zip code during registration." },
    { id: "general-4", question: "Can I use WorkConnect on my mobile device?", answer: "Yes, WorkConnect is fully optimized for mobile devices. You can download our app from the App Store or Google Play Store." },
    { id: "general-5", question: "What support does WorkConnect provide?", answer: "We offer 24/7 customer support via chat, email, and phone. Our support team is always ready to assist with any questions or issues." },
    { id: "general-6", question: "How do I contact WorkConnect?", answer: "You can reach us through our Contact page, email at support@workconnect.com, or call our customer service at (555) 123-4567." }
  ],
  clients: [
    { id: "clients-1", question: "How do I hire a worker?", answer: "Post your job with detailed requirements, review proposals from qualified workers, and select the best match for your needs. You can message them directly through our platform." },
    { id: "clients-2", question: "What if I'm not satisfied with the work?", answer: "We offer a satisfaction guarantee. If you're not happy with the work, you can raise a dispute and our support team will help resolve the issue promptly." },
    { id: "clients-3", question: "How much does it cost to hire someone?", answer: "Costs vary depending on the worker's rates and the complexity of your job. You can set your budget when posting a job, and workers will bid accordingly." },
    { id: "clients-4", question: "Can I hire someone for recurring work?", answer: "Yes, you can establish long-term relationships with workers for recurring projects. Many clients find reliable workers they can trust for ongoing needs." },
    { id: "clients-5", question: "How do I know if a worker is qualified?", answer: "Each worker has a profile with ratings, reviews, and verified skills. You can also request samples of previous work or conduct interviews before hiring." },
    { id: "clients-6", question: "What types of jobs can I post?", answer: "You can post jobs across various categories including home services, professional services, creative work, technical tasks, and more." }
  ],
  workers: [
    { id: "workers-1", question: "How do I find jobs on WorkConnect?", answer: "Browse available jobs in your area of expertise, submit proposals for projects that match your skills, and communicate with potential clients through our platform." },
    { id: "workers-2", question: "How and when do I get paid?", answer: "Payment is released once the client approves your completed work. Funds are transferred to your account and can be withdrawn via various payment methods." },
    { id: "workers-3", question: "How do I create an effective profile?", answer: "Highlight your skills, experience, and previous work samples. Complete all verification steps and maintain good ratings to attract more clients." },
    { id: "workers-4", question: "What fees does WorkConnect charge?", answer: "WorkConnect charges a service fee of 5-15% depending on your total earnings with each client. The fee decreases the more you work with the same client." },
    { id: "workers-5", question: "Can I work full-time on WorkConnect?", answer: "Yes, many workers use our platform as their primary source of income. You can take on as many jobs as you can handle professionally." },
    { id: "workers-6", question: "How do I improve my ranking in search results?", answer: "Complete your profile, obtain positive reviews, maintain a high response rate, and regularly update your skills and portfolio to improve visibility." }
  ],
  payments: [
    { id: "payments-1", question: "What payment methods are accepted?", answer: "We accept all major credit cards, debit cards, and digital wallets. Payments are securely processed and held in escrow until the job is completed." },
    { id: "payments-2", question: "Is there a minimum payment amount?", answer: "The minimum payment amount is $5 for most services. Some specialized services may have higher minimum requirements." },
    { id: "payments-3", question: "How does the escrow system work?", answer: "Client funds are held securely in escrow until the work is completed and approved. This protects both parties and ensures fair payment for completed work." },
    { id: "payments-4", question: "Can I get a refund if needed?", answer: "Refunds are available in certain circumstances, such as if work wasn't completed or doesn't meet the agreed-upon requirements. Our dispute resolution team handles these cases." },
    { id: "payments-5", question: "Are there any hidden fees?", answer: "No, all fees are transparently disclosed before any transaction. Clients see the total cost upfront, and workers see exactly what they'll earn." },
    { id: "payments-6", question: "How do international payments work?", answer: "We handle currency conversion automatically. Workers can receive payments in their local currency, with competitive exchange rates." }
  ],
  safety: [
    { id: "safety-1", question: "Are the workers verified?", answer: "Yes, all workers undergo a thorough verification process including identity checks, skills assessment, and background screening where applicable." },
    { id: "safety-2", question: "How does WorkConnect ensure quality?", answer: "We maintain quality through our rating system, verification processes, and dispute resolution. Poor performers are removed from the platform." },
    { id: "safety-3", question: "Is my personal information secure?", answer: "Yes, we use industry-standard encryption and security measures to protect all personal and payment information on our platform." },
    { id: "safety-4", question: "What safety measures are in place for in-person work?", answer: "We offer safety guidelines, verified identity checks, and a reporting system. For in-person work, we recommend meeting in public places initially." },
    { id: "safety-5", question: "How are disputes handled?", answer: "Our dedicated dispute resolution team reviews each case carefully, examining communication history and work delivered to reach a fair resolution." },
    { id: "safety-6", question: "Can I report inappropriate behavior?", answer: "Yes, we have a zero-tolerance policy for inappropriate behavior. You can report concerns through our platform, and they will be addressed promptly." }
  ]
};

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      } 
    },
    exit: { 
      y: -10, 
      opacity: 0,
      transition: { 
        duration: 0.15 
      } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Got Questions? We&apos;ve Got Answers.</h1>
                <p className="text-lg text-zinc-600 mb-8">
                  Explore some of the most common questions about how our platform works.
                </p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input 
                    type="text" 
                    placeholder="Search for answers..." 
                    className="pl-10 border-zinc-200 rounded-md"
                  />
                </div>
              </div>
              <div className="hidden lg:block relative h-80">
                <Image
                  src="/images/about/about-hero.png"
                  alt="People working together"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="w-full border-t border-zinc-100 bg-zinc-100/50 py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 rounded-lg bg-zinc-100/80 p-1.5 gap-1">
              <button 
                className={`flex justify-center items-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeCategory === "general" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}
                onClick={() => setActiveCategory("general")}
              >
                <Home className="w-4 h-4" />
                <span>General</span>
              </button>
              <button 
                className={`flex justify-center items-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeCategory === "clients" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}
                onClick={() => setActiveCategory("clients")}
              >
                <Users className="w-4 h-4" />
                <span>For Clients</span>
              </button>
              <button 
                className={`flex justify-center items-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeCategory === "workers" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}
                onClick={() => setActiveCategory("workers")}
              >
                <Users className="w-4 h-4" />
                <span>For Workers</span>
              </button>
              <button 
                className={`flex justify-center items-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeCategory === "payments" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}
                onClick={() => setActiveCategory("payments")}
              >
                <CircleDollarSign className="w-4 h-4" />
                <span>Payments</span>
              </button>
              <button 
                className={`flex justify-center items-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeCategory === "safety" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}
                onClick={() => setActiveCategory("safety")}
              >
                <Shield className="w-4 h-4" />
                <span>Safety</span>
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div 
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {faqData[activeCategory as keyof typeof faqData].map((faq) => (
                  <motion.div key={faq.id} variants={itemVariants} layoutId={faq.id}>
                    <Card className="border-zinc-200 shadow-sm overflow-hidden">
                      <CardContent className="p-0">
                        <button 
                          className="flex justify-between items-center w-full p-6"
                          onClick={() => toggleQuestion(faq.id)}
                        >
                          <h3 className="text-lg font-semibold text-zinc-900 text-left">{faq.question}</h3>
                          <motion.div
                            animate={{ rotate: openQuestions[faq.id] ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <ChevronDown className="w-5 h-5 text-zinc-500" />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {openQuestions[faq.id] && (
                            <motion.div 
                              key={`content-${faq.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                ease: [0.25, 1, 0.5, 1],
                                opacity: { duration: 0.25 }
                              }}
                              style={{ overflow: "hidden" }}
                              className="px-6 pb-6 pt-0"
                            >
                              <p className="text-zinc-600">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 bg-zinc-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/faqs/how-it-works/post-job.jpg" 
                    alt="Post Your Job" 
                    width={640} 
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Post Your Job</h3>
                <p className="text-zinc-600 text-center">Describe your needs and set your budget</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/faqs/how-it-works/choose-worker.jpg" 
                    alt="Choose a Worker" 
                    width={640} 
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Choose a Worker</h3>
                <p className="text-zinc-600 text-center">Review profiles and select the best match</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/faqs/how-it-works/complete-pay.jpg" 
                    alt="Complete & Pay" 
                    width={640} 
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Complete & Pay</h3>
                <p className="text-zinc-600 text-center">Approve the work and release payment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions? Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-zinc-600 mb-8">Our support team is here to help</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-zinc-900 hover:bg-zinc-800 gap-2 px-6">
                  <MessageSquare className="w-4 h-4" />
                  Contact Support
                </Button>
                <Button variant="outline" className="gap-2 px-6">
                  <ExternalLink className="w-4 h-4" />
                  Browse Help Center
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