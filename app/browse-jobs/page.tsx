"use client";

import { Button } from "@/components/ui/button";
import { Header, Footer } from "@/components/common";
import { useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  ChevronDown
} from "lucide-react";

export default function BrowseJobsPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  
  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Experienced Plumber Needed",
      category: "Plumbing",
      location: "Gulberg, Lahore",
      price: "PKR 1,500/hr",
      type: "One-time",
      postedTime: "2 hours ago",
      urgent: true
    },
    {
      id: 2,
      title: "House Cleaning Service",
      category: "Cleaning",
      location: "DHA Phase 5, Lahore",
      price: "PKR 2,000",
      type: "Recurring",
      postedTime: "3 hours ago",
      urgent: false
    },
    {
      id: 3,
      title: "Electrician for Office Setup",
      category: "Electrical",
      location: "Johar Town, Lahore",
      price: "PKR 2,500/hr",
      type: "One-time",
      postedTime: "5 hours ago",
      urgent: true
    },
    {
      id: 4,
      title: "Moving Help Needed",
      category: "Moving",
      location: "Bahria Town, Lahore",
      price: "PKR 3,000",
      type: "One-time",
      postedTime: "6 hours ago",
      urgent: false
    },
    {
      id: 5,
      title: "Garden Maintenance",
      category: "Gardening",
      location: "Model Town, Lahore",
      price: "PKR 1,800/hr",
      type: "Recurring",
      postedTime: "8 hours ago",
      urgent: false
    },
    {
      id: 6,
      title: "AC Repair and Service",
      category: "HVAC",
      location: "Valencia, Lahore",
      price: "PKR 2,200",
      type: "One-time",
      postedTime: "10 hours ago",
      urgent: true
    }
  ];

  // Mock worker data
  const workers = [
    {
      id: 1,
      name: "Ahmed Khan",
      occupation: "Plumber",
      rating: 4.8,
      location: "Gulberg, Lahore",
      price: "PKR 1,200/hr",
      availableNow: true,
      image: "/images/user1.jpg"
    },
    {
      id: 2,
      name: "Fatima Ali",
      occupation: "House Cleaner",
      rating: 4.9,
      location: "DHA Phase 5, Lahore",
      price: "PKR 1,000/hr",
      availableNow: true,
      image: "/images/user2.jpg"
    },
    {
      id: 3,
      name: "Usman Ahmed",
      occupation: "Electrician",
      rating: 4.7,
      location: "Johar Town, Lahore",
      price: "PKR 1,500/hr",
      availableNow: false,
      image: "/images/user3.jpg"
    },
    {
      id: 4,
      name: "Saad Malik",
      occupation: "Mover",
      rating: 4.6,
      location: "Bahria Town, Lahore",
      price: "PKR 1,000/hr",
      availableNow: true,
      image: "/images/user4.jpg"
    },
    {
      id: 5,
      name: "Ayesha Khan",
      occupation: "Gardener",
      rating: 4.9,
      location: "Model Town, Lahore",
      price: "PKR 1,100/hr",
      availableNow: false,
      image: "/images/user1.jpg"
    },
    {
      id: 6,
      name: "Zain Ahmad",
      occupation: "HVAC Technician",
      rating: 4.8,
      location: "Valencia, Lahore",
      price: "PKR 1,800/hr",
      availableNow: true,
      image: "/images/user2.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-zinc-200/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8 mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-900">
                Find Local Talent & Opportunities
              </h1>
              <p className="text-lg text-zinc-600">
                Connect with skilled professionals or discover jobs in your area
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search jobs or keywords"
                    className="w-full py-3 px-4 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                </div>
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white h-[50px] w-[120px] cursor-pointer">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tab Selector Section - Moved outside hero */}
        <section className="py-6 border-b border-zinc-200">
          <div className="container mx-auto px-4 py-4 text-center">
            <div className="inline-flex bg-zinc-100/80 p-1 rounded-lg">
              <button
                className={`py-2 px-6 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "jobs"
                    ? "bg-white text-black"
                    : "bg-transparent text-zinc-800 hover:bg-zinc-200"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Browse Jobs
              </button>
              <button
                className={`py-2 px-6 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "workers"
                    ? "bg-white text-black"
                    : "bg-transparent text-zinc-800 hover:bg-zinc-200"
                }`}
                onClick={() => setActiveTab("workers")}
              >
                Browse Workers
              </button>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative">
                <select defaultValue="default" className="w-full appearance-none py-3 px-4 pr-10 border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500">
                  <option value="default" disabled>Category</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="moving">Moving</option>
                  <option value="gardening">Gardening</option>
                  <option value="hvac">HVAC</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              </div>
              <div className="relative">
                <select defaultValue="default" className="w-full appearance-none py-3 px-4 pr-10 border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500">
                  <option value="default" disabled>Location</option>
                  <option value="gulberg">Gulberg</option>
                  <option value="dha">DHA</option>
                  <option value="johar">Johar Town</option>
                  <option value="bahria">Bahria Town</option>
                  <option value="model">Model Town</option>
                  <option value="valencia">Valencia</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              </div>
              <div className="relative">
                <select defaultValue="default" className="w-full appearance-none py-3 px-4 pr-10 border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500">
                  <option value="default" disabled>Price Range</option>
                  <option value="1000-2000">PKR 1,000 - 2,000</option>
                  <option value="2000-3000">PKR 2,000 - 3,000</option>
                  <option value="3000-5000">PKR 3,000 - 5,000</option>
                  <option value="5000+">PKR 5,000+</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              </div>
              <div className="relative">
                <select defaultValue="default" className="w-full appearance-none py-3 px-4 pr-10 border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500">
                  <option value="default" disabled>Availability</option>
                  <option value="any">Any time</option>
                  <option value="immediate">Immediate</option>
                  <option value="today">Today</option>
                  <option value="this-week">This week</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {activeTab === "jobs" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-zinc-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-zinc-900">{job.title}</h3>
                        {job.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white inline-block bg-zinc-100 px-2 py-1 rounded-full mb-4">
                        <span className="text-zinc-900 font-medium">{job.category}</span>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-zinc-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center text-zinc-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span className="text-sm">{job.price}</span>
                        </div>
                        <div className="flex items-center text-zinc-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                        <div className="flex items-center text-zinc-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{job.postedTime}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workers.map((worker) => (
                  <div key={worker.id} className="border border-zinc-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative w-14 h-14 mr-3 rounded-full overflow-hidden">
                          <Image 
                            src={worker.image} 
                            alt={worker.name} 
                            width={56}
                            height={56}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900">{worker.name}</h3>
                          <p className="text-sm text-zinc-600">{worker.occupation}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(worker.rating) ? 'currentColor' : 'none'} stroke="currentColor" className={`w-4 h-4 ${i < Math.floor(worker.rating) ? 'text-yellow-400' : 'text-zinc-300'}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-zinc-700">{worker.rating}</span>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-zinc-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{worker.location}</span>
                        </div>
                        <div className="flex items-center text-zinc-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span className="text-sm">{worker.price}</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            worker.availableNow
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {worker.availableNow ? "Available Now" : "Not Available"}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-zinc-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">Ready to get started?</h2>
            <p className="text-lg text-zinc-600 mb-8">
              Join thousands of professionals finding opportunities every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                Create Worker Profile
              </Button>
              <Button variant="outline" className="border-zinc-200 hover:bg-zinc-50">
                Post a Job
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 