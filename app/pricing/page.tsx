"use client"

import { useState } from "react";
import { Header, Footer } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, 
  ChevronDown, 
  TrendingUp, 
  Bell, 
  MessageSquare, 
  BadgeCheck, 
  Headphones,
  StarIcon
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("clients");
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    if (activeFaq === id) {
      setActiveFaq(null);
    } else {
      setActiveFaq(id);
    }
  };

  // Pricing plan data for clients and workers
  const pricingData = {
    clients: {
      basic: {
        title: "Basic",
        description: "Perfect for getting started",
        price: "₨0",
        period: undefined,
        features: [
          "Basic profile listing",
          "Browse service providers",
          "Direct messaging",
          "Basic support"
        ],
        cta: "Get Started",
        ctaVariant: "outline" as const
      },
      pro: {
        title: "Pro",
        description: "Most popular for growing needs",
        price: "₨999",
        period: "/month",
        features: [
          "Priority listing",
          "Advanced search filters",
          "Instant messaging",
          "24/7 priority support",
          "Verified badge",
          "Analytics dashboard"
        ],
        cta: "Upgrade to Pro",
        ctaVariant: "default" as const,
        popular: true
      },
      enterprise: {
        title: "Enterprise",
        description: "For large organizations",
        price: "Custom",
        period: undefined,
        features: [
          "Custom solutions",
          "Dedicated account manager",
          "API access",
          "Custom integrations",
          "Advanced analytics",
          "SLA support"
        ],
        cta: "Contact Sales",
        ctaVariant: "outline" as const
      }
    },
    workers: {
      basic: {
        title: "Basic",
        description: "For individuals getting started",
        price: "₨0",
        period: undefined,
        features: [
          "Basic profile creation",
          "Apply to 5 jobs per month",
          "Limited message threads",
          "Email support"
        ],
        cta: "Get Started",
        ctaVariant: "outline" as const
      },
      pro: {
        title: "Pro",
        description: "Recommended for professionals",
        price: "₨799",
        period: "/month",
        features: [
          "Featured profile position",
          "Unlimited job applications",
          "Priority in search results",
          "Skill endorsements",
          "In-app notifications",
          "Performance analytics"
        ],
        cta: "Go Pro",
        ctaVariant: "default" as const,
        popular: true
      },
      enterprise: {
        title: "Team",
        description: "For professional teams",
        price: "₨1999",
        period: "/month",
        features: [
          "Team management dashboard",
          "Multi-user accounts",
          "Client relationship tools",
          "Team analytics",
          "Dedicated support",
          "Custom branding"
        ],
        cta: "Start Team Plan",
        ctaVariant: "outline" as const
      }
    }
  };

  // Get current active pricing data based on tab
  const activePricingData = pricingData[activeTab as keyof typeof pricingData];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple Plans, Real Value</h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
              Upgrade to unlock more visibility, features, and opportunities — whether you&apos;re a client or a worker.
            </p>
            <div className="inline-flex p-1 bg-zinc-100 rounded-md mb-12">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "clients" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                }`}
                onClick={() => setActiveTab("clients")}
              >
                For Clients
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "workers" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                }`}
                onClick={() => setActiveTab("workers")}
              >
                For Workers
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <Card className="border-zinc-200 shadow-sm relative flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex flex-col h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + "basic-title"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-2xl font-bold mb-2">{activePricingData.basic.title}</h3>
                        <p className="text-sm text-zinc-500 mb-6">{activePricingData.basic.description}</p>
                        <div className="text-4xl font-bold mb-8">{activePricingData.basic.price}</div>
                      </motion.div>
                    </AnimatePresence>

                    <ul className="space-y-4 mb-8 flex-grow">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab + "basic-features"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, staggerChildren: 0.1 }}
                          className="space-y-4"
                        >
                          {activePricingData.basic.features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="flex items-start"
                            >
                              <span className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5">
                                <Check className="w-5 h-5 text-zinc-900" />
                              </span>
                              <span className="text-zinc-600">{feature}</span>
                            </motion.li>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </ul>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + "basic-cta"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-auto"
                      >
                        <Button variant={activePricingData.basic.ctaVariant} className="w-full py-6 text-base">
                          {activePricingData.basic.cta}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-zinc-800 shadow-lg relative flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                  <div className="flex flex-col h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + "pro-title"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-2xl font-bold mb-2">{activePricingData.pro.title}</h3>
                        <p className="text-sm text-zinc-500 mb-6">{activePricingData.pro.description}</p>
                        <div className="text-4xl font-bold mb-8">
                          {activePricingData.pro.price}
                          {activePricingData.pro.period && (
                            <span className="text-base font-normal text-zinc-500">{activePricingData.pro.period}</span>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <ul className="space-y-4 mb-8 flex-grow">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab + "pro-features"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, staggerChildren: 0.1 }}
                          className="space-y-4"
                        >
                          {activePricingData.pro.features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="flex items-start"
                            >
                              <span className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5">
                                <Check className="w-5 h-5 text-zinc-900" />
                              </span>
                              <span className="text-zinc-600">{feature}</span>
                            </motion.li>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </ul>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + "pro-cta"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-auto"
                      >
                        <Button className="w-full py-6 text-base bg-zinc-900 hover:bg-zinc-800">
                          {activePricingData.pro.cta}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-zinc-200 shadow-sm relative flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex flex-col h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + "enterprise-title"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-2xl font-bold mb-2">{activePricingData.enterprise.title}</h3>
                        <p className="text-sm text-zinc-500 mb-6">{activePricingData.enterprise.description}</p>
                        <div className="text-4xl font-bold mb-8">
                          {activePricingData.enterprise.price}
                          {activePricingData.enterprise.period && (
                            <span className="text-base font-normal text-zinc-500">{activePricingData.enterprise.period}</span>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <ul className="space-y-4 mb-8 flex-grow">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab + "enterprise-features"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, staggerChildren: 0.1 }}
                          className="space-y-4"
                        >
                          {activePricingData.enterprise.features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="flex items-start"
                            >
                              <span className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5">
                                <Check className="w-5 h-5 text-zinc-900" />
                              </span>
                              <span className="text-zinc-600">{feature}</span>
                            </motion.li>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </ul>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + "enterprise-cta"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-auto"
                      >
                        <Button variant={activePricingData.enterprise.ctaVariant} className="w-full py-6 text-base">
                          {activePricingData.enterprise.cta}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Premium */}
        <section className="w-full py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Premium Plans?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-100 mb-6">
                    <TrendingUp className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Priority Listing</h3>
                  <p className="text-zinc-600">
                    Appear at the top of search results and get more visibility
                  </p>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-100 mb-6">
                    <Bell className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
                  <p className="text-zinc-600">
                    Never miss an opportunity with real-time job alerts
                  </p>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-100 mb-6">
                    <MessageSquare className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
                  <p className="text-zinc-600">
                    Connect instantly with clients through our messaging system
                  </p>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-100 mb-6">
                    <BadgeCheck className="w-6 h-6 text-zinc-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verified Status</h3>
                  <p className="text-zinc-600">
                    Build trust with a verified badge on your profile
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-zinc-900 fill-transparent" />
                    ))}
                  </div>
                  <p className="text-zinc-600 mb-6">
                    Since upgrading to Pro, my business has grown exponentially. I get 3x more leads!
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                      <Image 
                        src="/images/pricing/profiles/sarah-profile.jpg" 
                        alt="Sarah Johnson"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">Sarah Johnson</h4>
                      <p className="text-sm text-zinc-500">Professional Plumber</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-zinc-900 fill-transparent" />
                    ))}
                  </div>
                  <p className="text-zinc-600 mb-6">
                    The premium features have made managing my service requests so much easier.
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                      <Image 
                        src="/images/pricing/profiles/michael-profile.jpg" 
                        alt="Michael Chen"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">Michael Chen</h4>
                      <p className="text-sm text-zinc-500">Electrician</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-zinc-900 fill-transparent" />
                    ))}
                  </div>
                  <p className="text-zinc-600 mb-6">
                    Best investment for my business. The verified badge really helps build trust.
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                      <Image 
                        src="/images/pricing/profiles/emily-profile.jpg" 
                        alt="Emily Rodriguez"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">Emily Rodriguez</h4>
                      <p className="text-sm text-zinc-500">House Cleaner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="w-full py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div
                className="border-b border-zinc-200 overflow-hidden"
                onClick={() => toggleFaq("faq1")}
              >
                <div className="flex justify-between items-center py-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">How do I upgrade my plan?</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === "faq1" ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-900" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeFaq === "faq1" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-zinc-600">
                          You can upgrade your plan by going to your account settings and selecting the &quot;Subscription&quot; tab. From there, you can choose the plan that best fits your needs and complete the payment process.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="border-b border-zinc-200 overflow-hidden"
                onClick={() => toggleFaq("faq2")}
              >
                <div className="flex justify-between items-center py-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">Can I cancel my subscription?</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === "faq2" ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-900" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeFaq === "faq2" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-zinc-600">
                          Yes, you can cancel your subscription at any time. Go to your account settings, select &quot;Subscription&quot;, and click on &quot;Cancel Subscription&quot;. Your premium features will remain active until the end of your billing period.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="border-b border-zinc-200 overflow-hidden"
                onClick={() => toggleFaq("faq3")}
              >
                <div className="flex justify-between items-center py-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">Is there a contract or commitment?</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === "faq3" ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-900" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeFaq === "faq3" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-zinc-600">
                          No, we don&apos;t require any long-term contracts. All our premium plans are monthly subscriptions that you can cancel anytime. There are no cancellation fees or hidden charges.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="border-b border-zinc-200 overflow-hidden"
                onClick={() => toggleFaq("faq4")}
              >
                <div className="flex justify-between items-center py-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === "faq4" ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-900" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeFaq === "faq4" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-zinc-600">
                          We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal. For Enterprise plans, we also support wire transfers and invoicing options.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="border-b border-zinc-200 overflow-hidden"
                onClick={() => toggleFaq("faq5")}
              >
                <div className="flex justify-between items-center py-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">Do you offer refunds?</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === "faq5" ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-900" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeFaq === "faq5" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-zinc-600">
                          We offer a 7-day money-back guarantee for first-time subscribers to our Pro plan. If you&apos;re not satisfied with the service, contact our support team within 7 days of your initial purchase for a full refund.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-8 h-8 text-zinc-900" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Need help choosing a plan?</h2>
              <p className="text-lg text-zinc-600 mb-8">
                Our team is here to help you find the perfect plan for your needs. Let&apos;s talk!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-zinc-900 hover:bg-zinc-800 gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat with Us
                </Button>
                <Button variant="outline" className="gap-2">
                  <Headphones className="w-4 h-4" />
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