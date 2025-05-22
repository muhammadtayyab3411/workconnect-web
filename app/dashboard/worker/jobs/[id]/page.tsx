"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, 
  Star, 
  Briefcase, 
  Calendar, 
  Check
} from "lucide-react";
import { use } from "react";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock data
  const jobData = {
    id: id,
    title: "Senior Frontend Developer",
    client: {
      name: "Sarah M.",
      avatar: "/images/job-detail/client-avatar.jpg",
      isVerified: true,
      rating: 4.8,
      reviewCount: 48,
      jobsPosted: 12,
      memberSince: "Jan 2023"
    },
    category: "Technology",
    location: "San Francisco, CA",
    distanceFromUser: "2.5 miles from your location",
    budget: "$80-100/hr",
    jobType: "Contract",
    duration: "3-6 months",
    posted: "2 days ago",
    proposalsCount: 12,
    overview: "We are seeking an experienced Frontend Developer to join our dynamic team. You will be responsible for building and maintaining high-quality web applications using modern technologies.",
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance"
    ],
    requirements: [
      "5+ years of experience with React.js",
      "Strong proficiency in JavaScript, HTML, and CSS",
      "Experience with responsive design",
      "Familiarity with RESTful APIs"
    ]
  };

  const similarJobs = Array(4).fill(null).map((_, index) => ({
    id: `sim-${index}`,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    budget: "$70-90/hr"
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          {/* Mobile view - Action buttons visible at top on mobile */}
          <div className="lg:hidden mb-6 space-y-4">
            <div className="flex items-center">
              <Link href="/dashboard/worker/jobs" className="text-zinc-600 hover:text-zinc-900 flex items-center text-sm font-medium">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Jobs
              </Link>
            </div>
            
            <Card className="p-4 sm:p-6">
              <Button className="w-full" asChild>
                <Link href={`/dashboard/worker/jobs/${id}/bid`}>
                  Submit Proposal
                </Link>
              </Button>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              {/* Back link - only visible on desktop */}
              <div className="hidden lg:flex items-center">
                <Link href="/dashboard/worker/jobs" className="text-zinc-600 hover:text-zinc-900 flex items-center text-sm font-medium">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Jobs
                </Link>
              </div>
              
              {/* Job header */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">{jobData.title}</h1>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                    {jobData.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                    {jobData.location}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                    {jobData.budget}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                    {jobData.jobType}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-500">
                  Posted by {jobData.client.name} • {jobData.posted}
                </p>
              </div>
              
              {/* Job description */}
              <Card className="p-4 sm:p-6">
                <div className="space-y-5 sm:space-y-6">
                  {/* Overview */}
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-xl font-semibold text-zinc-900">Job Overview</h2>
                    <p className="text-zinc-600">{jobData.overview}</p>
                  </div>
                  
                  <hr className="border-zinc-200" />
                  
                  {/* Responsibilities */}
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-xl font-semibold text-zinc-900">Responsibilities</h2>
                    <ul className="space-y-2">
                      {jobData.responsibilities.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="w-2 h-2 mt-2 mr-2 flex-shrink-0 bg-zinc-600 rounded-full" />
                          <p className="text-zinc-600">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <hr className="border-zinc-200" />
                  
                  {/* Requirements */}
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-xl font-semibold text-zinc-900">Requirements</h2>
                    <ul className="space-y-2">
                      {jobData.requirements.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="w-2 h-2 mt-2 mr-2 flex-shrink-0 bg-zinc-600 rounded-full" />
                          <p className="text-zinc-600">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
              
              {/* Similar Jobs */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl font-semibold text-zinc-900">Similar Jobs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarJobs.map((job) => (
                    <Card key={job.id} className="p-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-zinc-900">{job.title}</h3>
                        <p className="text-sm text-zinc-500">{job.company} • {job.location}</p>
                        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
                          <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full">
                            {job.budget}
                          </span>
                          <Button className="h-8 text-sm w-full sm:w-auto" asChild>
                            <Link href={`/dashboard/worker/jobs/${job.id}`}>
                              Quick Apply
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar - hidden on mobile until specific sections */}
            <div className="space-y-6">
              {/* Apply card - hidden on mobile since we show it at the top */}
              <Card className="hidden lg:block p-6">
                <div className="space-y-4">
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/worker/jobs/${id}/bid`}>
                      Submit Proposal
                    </Link>
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-zinc-600">Budget Range</p>
                      <p className="text-zinc-900 font-semibold">{jobData.budget}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-zinc-600">Duration</p>
                      <p className="text-zinc-900">{jobData.duration}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-zinc-600">Posted</p>
                      <p className="text-zinc-900">{jobData.posted}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-zinc-600">Proposals</p>
                      <p className="text-zinc-900">{jobData.proposalsCount} submitted</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Mobile view - Job details summary card */}
              <Card className="lg:hidden p-4 sm:p-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Job Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500">Budget Range</p>
                      <p className="text-sm font-medium">{jobData.budget}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500">Duration</p>
                      <p className="text-sm font-medium">{jobData.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500">Posted</p>
                      <p className="text-sm font-medium">{jobData.posted}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500">Proposals</p>
                      <p className="text-sm font-medium">{jobData.proposalsCount} submitted</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Client info */}
              <Card className="p-4 sm:p-6">
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold">About the Client</h2>
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                      <Image
                        src={jobData.client.avatar}
                        alt={jobData.client.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900">{jobData.client.name}</p>
                      <div className="flex items-center text-sm text-zinc-500">
                        <span>Verified Client</span>
                        {jobData.client.isVerified && <Check className="ml-1 w-4 h-4 text-zinc-600" />}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-zinc-900" />
                    <p className="text-sm sm:text-base text-zinc-900">{jobData.client.rating}/5 ({jobData.client.reviewCount} reviews)</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-zinc-900" />
                    <p className="text-sm sm:text-base text-zinc-900">{jobData.client.jobsPosted} jobs posted</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-zinc-900" />
                    <p className="text-sm sm:text-base text-zinc-900">Member since {jobData.client.memberSince}</p>
                  </div>
                </div>
              </Card>
              
              {/* Location */}
              <Card className="p-4 sm:p-6">
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Location</h2>
                  
                  <div className="relative h-32 sm:h-40 w-full rounded-md overflow-hidden">
                    <Image
                      src="/images/job-detail/map-image.jpg"
                      alt="Job location map"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="mt-1 flex-shrink-0">
                      <Image 
                        src="/images/job-detail/location-icon.svg" 
                        alt="Location" 
                        width={16} 
                        height={16} 
                      />
                    </div>
                    <div>
                      <p className="text-zinc-600">{jobData.location}</p>
                      <p className="text-xs sm:text-sm text-zinc-500">{jobData.distanceFromUser}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 