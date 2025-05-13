"use client"

import { useState } from "react";
import { Header, Footer } from "@/components/common";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  FileText, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="max-w-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h1 className="text-5xl font-bold mb-6 leading-tight">Let&apos;s Connect</h1>
              <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
                Whether you&apos;re a worker or client, we&apos;d love to hear from you.
              </p>
              <motion.div 
                className="relative aspect-[4/3] w-full rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src="/images/contact/connect-image.jpg" 
                  alt="People connecting"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
              <p className="text-zinc-600 mb-8">Fill out the form below and we&apos;ll get back to you.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full border-zinc-200 focus:ring-zinc-900"
                    required
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full border-zinc-200 focus:ring-zinc-900"
                    required
                  />
                </div>
                
                <div className="relative">
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent appearance-none bg-white"
                    required
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none w-4 h-4" />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full min-h-[120px] border-zinc-200 focus:ring-zinc-900"
                    required
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                    Send Message
                  </Button>
                </motion.div>
              </form>
              
              <p className="text-sm text-center text-zinc-500 mt-6">
                We usually reply within 24 hours
              </p>
            </motion.div>
          </div>
        </section>

        {/* Support Options */}
        <section className="w-full py-20 bg-zinc-50">
          <motion.div 
            className="container mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
                <p className="text-zinc-600 text-lg">Chat with an agent now</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Help Center</h3>
                <p className="text-zinc-600 text-lg">Browse common questions</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email Support</h3>
                <p className="text-zinc-600 text-lg">Drop us a message</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Contact Details and Map */}
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-10">Contact Details</h2>
              
              <motion.div 
                className="space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div 
                  className="flex items-start gap-6"
                  variants={fadeIn}
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">Email</h3>
                    <p className="text-zinc-600 text-lg">support@workconnect.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-6"
                  variants={fadeIn}
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">Phone</h3>
                    <p className="text-zinc-600 text-lg">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-6"
                  variants={fadeIn}
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">Address</h3>
                    <p className="text-zinc-600 text-lg">123 Service Street, City, State</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-10 flex gap-4"
                  variants={fadeIn}
                >
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5 text-zinc-900" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram className="w-5 h-5 text-zinc-900" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5 text-zinc-900" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative h-[450px] rounded-lg overflow-hidden border border-zinc-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Image 
                src="/images/contact/map.jpg" 
                alt="Office location map"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-zinc-50 text-center">
          <motion.div 
            className="container mx-auto px-4 max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-semibold mb-2.5">We&apos;re here to support every step</h2>
            <p className="text-lg text-zinc-500 mb-7">Don&apos;t hesitate to connect!</p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2 h-9 text-sm font-medium rounded">
                  Get in Touch
                </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 