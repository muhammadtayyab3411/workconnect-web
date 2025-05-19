"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Pencil, 
  X, 
  Copy, 
  Trash,
  ChevronRight,
  Download,
  DollarSign,
  MapPin,
  Users,
  FileText,
  Clock,
  Check,
  Briefcase,
  Star,
  Calendar
} from "lucide-react";
import { use } from "react";

// Mock job data
const job = {
  id: "1",
  title: "Need an Electrician for Office Wiring",
  category: "Electrical Services",
  status: "active",
  location: "San Francisco, CA",
  budget: "$2,500",
  postedDate: "March 15, 2024",
  description: "We are looking for a qualified electrician to handle the complete rewiring of our new office space. The project involves installing new electrical panels, lighting fixtures, and ensuring all work meets local building codes.",
  requiredSkills: [
    "Licensed Electrician",
    "Commercial Wiring Experience",
    "Building Code Knowledge",
    "Project Management"
  ],
  timeline: "2-3 weeks",
  attachments: [
    { name: "Floor Plan.pdf", size: "2.4 MB", type: "pdf" },
    { name: "Electrical Requirements.docx", size: "1.1 MB", type: "docx" },
    { name: "Safety Guidelines.pdf", size: "890 KB", type: "pdf" },
    { name: "Previous Installation Photos.zip", size: "5.2 MB", type: "zip" }
  ],
  applications: {
    total: 12,
    reviewed: 4
  },
  topApplicants: [
    {
      id: "a1",
      name: "John Anderson",
      avatar: "/images/pricing/profiles/sarah-profile.jpg",
      rating: 4.9,
      bid: "$2,300",
      description: "Licensed electrician with 10+ years of commercial experience"
    },
    {
      id: "a2",
      name: "Sarah Williams",
      avatar: "/images/user2.jpg",
      rating: 4.8,
      bid: "$2,450",
      description: "Certified master electrician specializing in office buildings"
    },
    {
      id: "a3",
      name: "Michael Chen",
      avatar: "/images/pricing/profiles/emily-profile.jpg",
      rating: 4.7,
      bid: "$2,600",
      description: "15 years experience in commercial electrical installations"
    }
  ],
  activityTimeline: [
    {
      id: "t1",
      title: "Job Posted",
      date: "Mar 15, 2024",
      description: "Job listing went live on the platform"
    },
    {
      id: "t2",
      title: "First Application",
      date: "Mar 15, 2024",
      description: "Received first qualified applicant"
    },
    {
      id: "t3",
      title: "Multiple Applications",
      date: "Mar 16, 2024",
      description: "10+ qualified electricians applied"
    }
  ]
};

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // The job ID can be accessed via params.id
  // For this implementation, we'll use the mock data above
  // In a real application, we would fetch the job data using params.id
  const { id } = use(params);
    console.log(`Job ID: ${id}`);

  return (
    <div className="w-full mt-4 pb-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/dashboard" className="text-zinc-500 hover:text-zinc-700">
          Dashboard
        </Link>
        <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
        <Link href="/dashboard/client/my-jobs" className="text-zinc-500 hover:text-zinc-700">
          My Jobs
        </Link>
        <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
        <span className="text-zinc-900 font-medium">Job Details</span>
      </div>

      {/* Job Title and Status */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-semibold text-zinc-900">{job.title}</h1>
        </div>
      </div>

      {/* Main Content and Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Job Summary Card */}
          <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="mt-0.5">
                <Briefcase className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-sm text-zinc-500">Category</h3>
                  <p className="text-base font-medium text-zinc-900">{job.category}</p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3">
                <div className="mt-0.5">
                  <DollarSign className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-sm text-zinc-500">Budget</h3>
                  <p className="text-base font-medium text-zinc-900">{job.budget}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="mt-0.5">
                  <MapPin className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-sm text-zinc-500">Location</h3>
                  <p className="text-base font-medium text-zinc-900">{job.location}</p>
                </div>
              </div>

              {/* Applications */}
              <div className="flex items-center gap-3">
                <div className="mt-0.5">
                  <Users className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-sm text-zinc-500">Applications</h3>
                  <p className="text-base font-medium text-zinc-900">{job.applications.total} received</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-200 my-6"></div>

            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-zinc-900 hover:bg-zinc-800 text-white"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
              <Button 
                variant="outline" 
                className="border-zinc-200 text-zinc-900"
              >
                <X className="h-4 w-4 mr-2" />
                Close Job
              </Button>
              <Button 
                variant="outline"
                className="border-zinc-200 text-zinc-900"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button 
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Job Description Card */}
          <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Job Description</h2>
            <p className="text-zinc-500 mb-6">
              {job.description}
            </p>

            <h3 className="text-lg font-medium text-zinc-900 mb-2">Required Skills</h3>
            <ul className="mb-6">
              {job.requiredSkills.map((skill, index) => (
                <li key={index} className="flex items-start mb-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-700 mt-2 mr-2"></span>
                  <span className="text-zinc-500">{skill}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-medium text-zinc-900 mb-2">Project Timeline</h3>
            <p className="text-zinc-500">{job.timeline}</p>
          </div>

          {/* Attachments Card */}
          <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Attachments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.attachments.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border border-zinc-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <FileText className="h-6 w-6 text-zinc-700" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-zinc-900">{file.name}</h4>
                      <p className="text-sm text-zinc-500">{file.size}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-zinc-200 text-zinc-900"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Applicants Card */}
          <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-zinc-900">Top Applicants</h2>
              <Button
                variant="outline"
                className="border-zinc-200 text-zinc-900 text-sm"
                asChild
              >
                <Link href={`/dashboard/client/my-jobs/${id}/bids`}>
                  View All ({job.applications.total})
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {job.topApplicants.map((applicant) => (
                <div 
                  key={applicant.id}
                  className="border border-zinc-200 rounded-lg p-4"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden mr-3">
                      {applicant.avatar ? (
                        <Image
                          src={applicant.avatar}
                          alt={applicant.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-zinc-300 flex items-center justify-center text-zinc-800 font-medium">
                          {applicant.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-base font-medium text-zinc-900">{applicant.name}</h3>
                        <div className="flex items-center ml-2">
                          <span className="flex items-center text-sm font-medium text-zinc-900">
                            {/* make the start icon gold */}
                          <Star className="h-4 w-4 text-yellow-500 mr-1" /> {applicant.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">{applicant.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-medium text-zinc-900">{applicant.bid}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-zinc-200 text-zinc-900 text-xs"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Activity Timeline</h2>
            
            <div className="space-y-6">
              {job.activityTimeline.map((activity, index) => (
                <div key={activity.id} className="flex">
                  <div className="mr-4 relative">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-zinc-500" />
                    </div>
                    {index < job.activityTimeline.length - 1 && (
                      <div className="absolute top-8 left-1/2 bottom-0 w-px bg-zinc-200 -translate-x-1/2"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-zinc-900">{activity.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1">{activity.date}</p>
                    <p className="text-sm text-zinc-500 mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Job Status</h2>
            
            <div className="space-y-6">
              {/* Application Progress */}
              <div>
                <p className="text-sm text-zinc-500 mb-1">Application Progress</p>
                <p className="text-sm text-zinc-500">{job.applications.reviewed} of {job.applications.total} applications reviewed</p>
                <div className="mt-2 w-full bg-zinc-100 rounded-full h-2">
                  <div 
                    className="bg-zinc-900 h-2 rounded-full" 
                    style={{ width: `${(job.applications.reviewed / job.applications.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Time Remaining */}
              <div>
                <p className="text-sm text-zinc-500 mb-1">Time Remaining</p>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-zinc-700 mr-2" />
                  <p className="text-base text-zinc-900">5 days left</p>
                </div>
              </div>

              {/* Budget Status */}
              <div>
                <p className="text-sm text-zinc-500 mb-1">Budget Status</p>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-zinc-700 mr-2" />
                  <p className="text-base text-zinc-900">Budget: {job.budget}</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 my-2"></div>

              <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                <Check className="h-5 w-5 mr-2" />
                Mark as Completed
              </Button>

              <Button variant="outline" className="w-full border-zinc-200 text-zinc-900">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 