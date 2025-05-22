'use client'

import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Grid, 
  List, 
  ChevronDown,
  Wrench,
  Truck,
  Zap,
  Hammer,
  PaintBucket,
  X,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";



// Mock job data
const featuredJobs = [
  {
    id: 1,
    title: "Emergency Plumbing Repair",
    description: "Need immediate assistance with a burst pipe in residential building. Experience with emergency repairs required.",
    location: "Brooklyn, NY",
    pay: "$150-200/hr",
    postedAt: "2 hours ago",
    category: "Plumbing",
    categoryIcon: <Wrench className="w-5 h-5" />,
    tags: ["Urgent", "Featured"],
  },
  {
    id: 2,
    title: "Moving Truck Driver Needed",
    description: "Looking for experienced truck driver for local moves. Must have valid CDL and clean driving record.",
    location: "Manhattan, NY",
    pay: "$35/hr",
    postedAt: "5 hours ago",
    category: "Driving",
    categoryIcon: <Truck className="w-5 h-5" />,
    tags: ["High Pay", "Long Term"],
  },
  {
    id: 3,
    title: "Commercial Electrician",
    description: "Commercial building needs electrical system upgrade. Must be licensed and insured.",
    location: "Queens, NY",
    pay: "$175-250/hr",
    postedAt: "1 day ago",
    category: "Electrical",
    categoryIcon: <Zap className="w-5 h-5" />,
    tags: ["Featured", "High Pay"],
  },
];

const availableJobs = [
  {
    id: 4,
    title: "House Painting Project",
    description: "Interior painting for 3-bedroom house. Materials provided. Need professional painter with attention to detail.",
    location: "Staten Island, NY",
    pay: "$45/hr",
    postedAt: "2 days ago",
    category: "Painting",
    categoryIcon: <PaintBucket className="w-5 h-5" />,
    tags: ["Residential"],
  },
  {
    id: 5,
    title: "Kitchen Renovation",
    description: "Complete kitchen renovation project including cabinet installation and countertop fitting.",
    location: "Bronx, NY",
    pay: "$2000-2500",
    postedAt: "3 days ago",
    category: "Construction",
    categoryIcon: <Hammer className="w-5 h-5" />,
    tags: ["Project Based"],
  },
  {
    id: 6,
    title: "Emergency Plumbing Service",
    description: "On-call plumber needed for emergency residential plumbing issues. Must be available 24/7.",
    location: "Brooklyn, NY",
    pay: "$120-150/hr",
    postedAt: "4 days ago",
    category: "Plumbing",
    categoryIcon: <Wrench className="w-5 h-5" />,
    tags: ["On Call"],
  },
];

// Categories
const categories = ["Plumbing", "Electrical", "Driving", "Construction", "Painting"];

// Job durations
const jobDurations = ["All", "Short-term", "Long-term"];

export default function BrowseJobsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-30 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 w-80 md:w-72 bg-white h-screen md:min-h-screen border-r border-zinc-200 p-6 overflow-y-auto transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center md:hidden mb-6">
            <h2 className="font-semibold text-lg">Filters</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-semibold text-base mb-3">Search Jobs</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jobs e.g. plumber, driv..."
                  className="w-full border border-zinc-200 rounded-md py-2 px-3 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-300"
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              </div>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="font-medium text-base mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm text-zinc-900 font-medium"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div>
              <h3 className="font-medium text-base mb-3">Location</h3>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full border border-zinc-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-300"
                  />
                </div>
                <button className="flex items-center w-full border border-zinc-200 rounded-md py-2 px-3 text-sm text-zinc-900">
                  <MapPin className="h-4 w-4 mr-2 text-zinc-700" />
                  Use Current Location
                </button>
              </div>
            </div>
            
            {/* Job Duration */}
            <div>
              <h3 className="font-medium text-base mb-3">Job Duration</h3>
              <div className="space-y-2">
                {jobDurations.map((duration, index) => (
                  <div key={duration} className="flex items-center">
                    <input
                      type="radio"
                      id={`duration-${duration}`}
                      name="job-duration"
                      defaultChecked={index === 0}
                      className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                    />
                    <label
                      htmlFor={`duration-${duration}`}
                      className="ml-2 text-sm text-zinc-900 font-medium"
                    >
                      {duration}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <h3 className="font-medium text-base mb-3">Price Range</h3>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-zinc-500">$0</span>
                  <span className="text-sm text-zinc-500">$200/hr</span>
                </div>
                <div className="relative w-full">
                  <div className="h-2 bg-zinc-200 rounded-full w-full absolute top-0 left-0"></div>
                  <div className="h-2 bg-zinc-900 rounded-full absolute top-0 left-0" style={{width: '50%'}}></div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                  <div className="w-4 h-4 bg-white border border-zinc-300 rounded-full absolute top-[-3px] shadow-md" style={{left: 'calc(50% - 8px)'}}></div>
                </div>
              </div>
            </div>
            
            {/* Verified Clients */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-900">
                Verified Clients Only
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-900"></div>
              </label>
            </div>

            {/* Apply Filters button - Mobile only */}
            <div className="md:hidden pt-4">
              <Button 
                onClick={() => setSidebarOpen(false)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="fixed bottom-4 right-4 md:hidden z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-zinc-900 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          >
            <Filter className="h-5 w-5" />
            <span className="ml-2 font-medium">Filters</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 ">
          {/* Featured Jobs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">Featured Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredJobs.map((job) => (
                <div key={job.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-zinc-100 p-2 rounded-md">
                        {job.categoryIcon}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              tag === "Urgent" 
                                ? "bg-red-100 text-red-500" 
                                : "bg-zinc-100 text-zinc-800"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold text-zinc-950 mb-2">
                      <Link href={`/dashboard/worker/jobs/${job.id}`} className="hover:text-zinc-600 transition-colors">
                        {job.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2 mb-4">
                      <div className="flex items-center text-sm text-zinc-950">
                        <MapPin className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-zinc-950">
                        <DollarSign className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                        {job.pay}
                      </div>
                      <div className="flex items-center text-sm text-zinc-950">
                        <Clock className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                        {job.postedAt}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white" asChild>
                      <Link href={`/dashboard/worker/jobs/${job.id}`}>
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Available Jobs */}
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-xl font-semibold mr-4">Available Jobs</h2>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <div className="flex items-center mr-4">
                  <button className="flex items-center text-sm border border-zinc-200 rounded-md py-1.5 px-3">
                    <span className="text-zinc-500">Sort by: Latest</span>
                    <ChevronDown className="ml-2 h-4 w-4 text-zinc-500" />
                  </button>
                </div>
                
                <div className="flex gap-1">
                  <button className="p-1.5 border border-zinc-200 rounded-md text-zinc-700">
                    <Grid className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 border border-zinc-200 rounded-md text-zinc-700">
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {availableJobs.map((job) => (
                <div key={job.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-zinc-100 p-2 rounded-md">
                        {job.categoryIcon}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="bg-zinc-100 text-zinc-800 text-xs font-semibold px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold text-zinc-950 mb-2">
                      <Link href={`/dashboard/worker/jobs/${job.id}`} className="hover:text-zinc-600 transition-colors">
                        {job.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2 mb-4">
                      <div className="flex items-center text-sm text-zinc-950">
                        <MapPin className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-zinc-950">
                        <DollarSign className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                        {job.pay}
                      </div>
                      <div className="flex items-center text-sm text-zinc-950">
                        <Clock className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                        {job.postedAt}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full border-zinc-200 text-zinc-950 hover:bg-zinc-50" asChild>
                      <Link href={`/dashboard/worker/jobs/${job.id}`}>
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 