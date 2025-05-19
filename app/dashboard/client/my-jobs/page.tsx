"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, DollarSign, MapPin, Plus, Eye, Edit, MoreHorizontal, Search, ChevronDown, Funnel } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type JobStatus = "active" | "under-review" | "completed";

interface Job {
  id: string;
  title: string;
  category: string;
  status: JobStatus;
  location: string;
  budget: string;
  postedDate: string;
}

export default function MyJobsPage() {
  const [activeTab, setActiveTab] = useState<JobStatus>("active");

  // Mock data for jobs
  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      category: "Development",
      status: "active",
      location: "San Francisco, CA",
      budget: "$80-100/hr",
      postedDate: "Posted Oct 15, 2023",
    },
    {
      id: "2",
      title: "UI/UX Designer",
      category: "Design",
      status: "under-review",
      location: "Remote",
      budget: "$70-90/hr",
      postedDate: "Posted Oct 14, 2023",
    },
    {
      id: "3",
      title: "Product Manager",
      category: "Management",
      status: "completed",
      location: "New York, NY",
      budget: "$90-110/hr",
      postedDate: "Posted Oct 10, 2023",
    },
    {
      id: "4",
      title: "Frontend Developer",
      category: "Development",
      status: "active",
      location: "Austin, TX",
      budget: "$60-80/hr",
      postedDate: "Posted Oct 13, 2023",
    },
    {
      id: "5",
      title: "Marketing Specialist",
      category: "Marketing",
      status: "under-review",
      location: "Chicago, IL",
      budget: "$50-70/hr",
      postedDate: "Posted Oct 12, 2023",
    },
    {
      id: "6",
      title: "Data Analyst",
      category: "Analytics",
      status: "completed",
      location: "Seattle, WA",
      budget: "$65-85/hr",
      postedDate: "Posted Oct 8, 2023",
    },
  ];

  const filteredJobs = jobs.filter((job) => job.status === activeTab);
  const counts = {
    active: jobs.filter((job) => job.status === "active").length,
    "under-review": jobs.filter((job) => job.status === "under-review").length,
    completed: jobs.filter((job) => job.status === "completed").length,
  };

  return (
    <div className="w-full mt-4 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">My Jobs</h1>
          <p className="text-zinc-500 mt-1">
            Track and manage your job listings in one place
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            asChild
            className="bg-zinc-900 hover:bg-zinc-800 text-white flex items-center gap-2"
          >
            <Link href="/dashboard/post-job">
              <Plus className="h-4 w-4" />
              Post a New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 border-zinc-200 w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <div className="relative border border-zinc-200 rounded-md flex items-center px-3 py-2">
            <span className="text-zinc-500 text-sm">Sort by: Newest</span>
            <ChevronDown className="ml-2 text-zinc-500 w-5 h-5" />
          </div>
          <Button
            variant="outline"
            className="border-zinc-200 flex items-center gap-2"
          >
            <Funnel className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-6 border-b border-zinc-200 mb-6">
        <button
          className={`pb-4 relative ${
            activeTab === "active"
              ? "font-medium text-zinc-900 border-b-2 border-zinc-900"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Jobs
          <span className="ml-2 bg-zinc-100 text-zinc-900 text-xs font-semibold px-2 py-0.5 rounded-full">
            {counts.active}
          </span>
        </button>
        <button
          className={`pb-4 relative ${
            activeTab === "under-review"
              ? "font-medium text-zinc-900 border-b-2 border-zinc-900"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
          onClick={() => setActiveTab("under-review")}
        >
          Under Review
          <span className="ml-2 bg-zinc-100 text-zinc-900 text-xs font-semibold px-2 py-0.5 rounded-full">
            {counts["under-review"]}
          </span>
        </button>
        <button
          className={`pb-4 relative ${
            activeTab === "completed"
              ? "font-medium text-zinc-900 border-b-2 border-zinc-900"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
          <span className="ml-2 bg-zinc-100 text-zinc-900 text-xs font-semibold px-2 py-0.5 rounded-full">
            {counts.completed}
          </span>
        </button>
      </div>

      {/* Job Cards - 3 per row grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5"
          >
            <div className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-zinc-900">
                    {job.title}
                  </h2>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="bg-zinc-100 px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-900">
                      {job.category}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0
                  ${
                    job.status === "active"
                      ? "bg-zinc-900 text-white"
                      : job.status === "under-review"
                      ? "bg-zinc-100 text-zinc-900"
                      : "bg-black text-white"
                  }`}
                >
                  {job.status === "active"
                    ? "Active"
                    : job.status === "under-review"
                    ? "Under Review"
                    : "Completed"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-zinc-900 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-zinc-900">
                    Location
                  </h4>
                  <p className="text-sm text-zinc-500">{job.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 text-zinc-900 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-zinc-900">Budget</h4>
                  <p className="text-sm text-zinc-500">{job.budget}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarIcon className="h-4 w-4 text-zinc-900 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-zinc-900">Posted</h4>
                  <p className="text-sm text-zinc-500">{job.postedDate}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-200 my-5"></div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-200 text-zinc-900 flex items-center gap-1.5"
                asChild
              >
                <Link href={`/dashboard/client/my-jobs/${job.id}`}>
                  <Eye className="h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-200 text-zinc-900 flex items-center gap-1.5"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-200 text-zinc-900 flex items-center gap-1.5 ml-auto"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 