import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Briefcase, Clock, DollarSign, Filter, Search } from "lucide-react";

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: "Plumbing Repair for Bathroom",
    client: {
      name: "John Smith",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4.8
    },
    location: "Los Angeles, CA",
    jobType: "One-time",
    postedDate: "2 days ago",
    budget: "$150-$300",
    description: "Need an experienced plumber to fix a leaking faucet and replace the shower head in my master bathroom. Looking for someone who can start next week."
  },
  {
    id: 2,
    title: "Electrical Wiring Installation",
    client: {
      name: "Sarah Wilson",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4.5
    },
    location: "San Francisco, CA",
    jobType: "One-time",
    postedDate: "1 day ago",
    budget: "$200-$400",
    description: "Looking for an electrician to install new wiring for kitchen remodel. Must be licensed and insured. The project will take approximately 2-3 days."
  },
  {
    id: 3,
    title: "Recurring House Cleaning",
    client: {
      name: "Mike Brown",
      avatar: "/images/avatar-placeholder.svg",
      rating: 5.0
    },
    location: "New York, NY",
    jobType: "Recurring",
    postedDate: "5 hours ago",
    budget: "$80-$120 per visit",
    description: "Need a professional cleaner for bi-weekly house cleaning services for a 3-bedroom house. Must have experience and provide own cleaning supplies."
  },
  {
    id: 4,
    title: "Garden Landscaping Project",
    client: {
      name: "Emily Davis",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4.2
    },
    location: "Seattle, WA",
    jobType: "One-time",
    postedDate: "3 days ago",
    budget: "$500-$1000",
    description: "Looking for a landscaper to redesign my front garden. Need help with plant selection, soil preparation, and installation. Approximate area is 400 sq ft."
  }
];

export default function FindJobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Find Jobs</h1>
        <p className="text-zinc-500 mt-1">Browse available jobs that match your skills</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search for jobs..." 
              className="pl-10" 
            />
          </div>
          <div className="relative w-full md:w-48">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Location" 
              className="pl-10" 
            />
          </div>
          <Button className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
      
      {/* Job Listings */}
      <div className="space-y-4">
        {jobListings.map((job) => (
          <div key={job.id} className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                  <Link href={`/dashboard/find-jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                    {job.title}
                  </Link>
                </h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image 
                        src={job.client.avatar} 
                        alt={job.client.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-zinc-600">{job.client.name}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="text-zinc-700 ml-1">{job.client.rating}</span>
                  </div>
                </div>
                
                <p className="text-zinc-600 mb-4">{job.description}</p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-1 text-zinc-600">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1 text-zinc-600">
                    <Briefcase className="h-4 w-4" />
                    {job.jobType}
                  </div>
                  <div className="flex items-center gap-1 text-zinc-600">
                    <Clock className="h-4 w-4" />
                    {job.postedDate}
                  </div>
                  <div className="flex items-center gap-1 text-zinc-600">
                    <DollarSign className="h-4 w-4" />
                    {job.budget}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:flex-col gap-2 justify-end">
                <Button>Apply Now</Button>
                <Button variant="outline">Save Job</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 