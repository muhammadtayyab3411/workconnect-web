"use client";

import { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  MessageSquare,
  Star,
  Funnel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Types for our data
interface BaseJob {
  id: number;
  title: string;
  client: {
    name: string;
    avatar: string;
  };
}

interface InProgressJob extends BaseJob {
  status: "In Progress";
  dateRange: string;
  amount: string;
  location: string;
}

interface CompletedJob extends BaseJob {
  status: "Completed";
  completionDate: string;
  amount: string;
  rating: number;
}

// Mock data for jobs
const MOCK_JOBS: {
  inProgress: InProgressJob[];
  completed: CompletedJob[];
} = {
  inProgress: [
    {
      id: 1,
      title: "Website Redesign Project",
      client: {
        name: "Sarah Johnson",
        avatar: "/images/avatars/sarah_johnson.png",
      },
      status: "In Progress",
      dateRange: "Oct 15, 2023 - Dec 15, 2023",
      amount: "$4,500",
      location: "Remote",
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: {
        name: "Michael Chen",
        avatar: "/images/avatars/michael_chen.png",
      },
      status: "In Progress",
      dateRange: "Sep 1, 2023 - Nov 30, 2023",
      amount: "$8,000",
      location: "San Francisco, CA",
    },
    {
      id: 3,
      title: "E-commerce Integration",
      client: {
        name: "Emily Davis",
        avatar: "/images/avatars/emily_davis.png",
      },
      status: "In Progress",
      dateRange: "Oct 1, 2023 - Nov 15, 2023",
      amount: "$3,200",
      location: "Remote",
    },
  ],
  completed: [
    {
      id: 4,
      title: "Brand Identity Design",
      client: {
        name: "David Wilson",
        avatar: "/images/avatars/david_wilson.png",
      },
      status: "Completed",
      completionDate: "Sep 30, 2023",
      amount: "$2,800",
      rating: 5,
    },
    {
      id: 5,
      title: "Marketing Campaign",
      client: {
        name: "Lisa Anderson",
        avatar: "/images/avatars/lisa_anderson.png",
      },
      status: "Completed",
      completionDate: "Aug 15, 2023",
      amount: "$5,500",
      rating: 4,
    },
  ],
};

export default function JobContractsPage() {
  const [activeTab, setActiveTab] = useState<"inProgress" | "completed">("inProgress");
  const [searchQuery, setSearchQuery] = useState("");

  // Render star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-zinc-200"}`} />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="py-6">
      {/* Header Section */}
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-2">Job Contracts</h1>
        <p className="text-zinc-500">
          {MOCK_JOBS.inProgress.length + MOCK_JOBS.completed.length} Total Jobs • {MOCK_JOBS.inProgress.length} In Progress • {MOCK_JOBS.completed.length} Completed
        </p>
      </div>

      {/* Divider */}
      <hr className="border-zinc-200 mb-6" />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border border-zinc-200"
            />
          </div>
          <Button
            variant="outline"
            size="default"
            className="border-zinc-200 bg-white"
          >
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex">
          <Button
            onClick={() => setActiveTab("inProgress")}
            variant={activeTab === "inProgress" ? "default" : "outline"}
            size="default"
            className={`rounded-r-none ${
              activeTab === "inProgress"
                ? "bg-zinc-900 hover:bg-zinc-800"
                : "border-zinc-200 bg-white"
            }`}
          >
            In Progress
          </Button>
          <Button
            onClick={() => setActiveTab("completed")}
            variant={activeTab === "completed" ? "default" : "outline"}
            size="default"
            className={`rounded-l-none ${
              activeTab === "completed"
                ? "bg-zinc-900 hover:bg-zinc-800"
                : "border-zinc-200 bg-white"
            }`}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* In Progress Jobs Section */}
      <h2 className="text-xl font-semibold text-zinc-800 mb-4">
        In Progress Jobs
      </h2>

      <div className="mb-8">
        {MOCK_JOBS.inProgress.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">No in-progress jobs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_JOBS.inProgress.map((job) => (
              <div
                key={job.id}
                className="border border-zinc-200 rounded-lg shadow-sm bg-white overflow-hidden"
              >
                {/* Job Title and Client */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-zinc-900 mb-3">{job.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={job.client.avatar}
                        alt={job.client.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-zinc-500">{job.client.name}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-100 h-2 rounded-full mb-5">
                    <div 
                      className="bg-zinc-900 h-2 rounded-full" 
                      style={{ width: "60%" }} 
                    ></div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-zinc-500" />
                      <span className="text-sm text-zinc-500">{job.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-zinc-500" />
                      <span className="text-sm text-zinc-500">{job.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-zinc-500" />
                      <span className="text-sm text-zinc-500">{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-zinc-200" />
                
                {/* Action Buttons */}
                <div className="p-5 flex gap-3">
                  <Button 
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-zinc-200 hover:bg-zinc-50"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Jobs Section */}
      <h2 className="text-xl font-semibold text-zinc-800 mb-4">
        Completed Jobs
      </h2>

      <div className="mb-6">
        {MOCK_JOBS.completed.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">No completed jobs found.</p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Completion Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Total Pay
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {MOCK_JOBS.completed.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-zinc-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 relative">
                          <Image
                            src={job.client.avatar}
                            alt={job.client.name}
                            fill
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-zinc-900">{job.client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-zinc-900">{job.completionDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-zinc-900">{job.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStarRating(job.rating)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">
          Showing {MOCK_JOBS.inProgress.length + MOCK_JOBS.completed.length} of {MOCK_JOBS.inProgress.length + MOCK_JOBS.completed.length} jobs
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-9 px-3">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-3">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}