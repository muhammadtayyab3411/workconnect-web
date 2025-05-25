"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, DollarSign, MapPin, Plus, Eye, Edit, MoreHorizontal, Search, ChevronDown, Funnel, Loader2, AlertCircle, Copy, Trash, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jobAPI, ClientJob } from "@/lib/api";
import { RoleGuard } from "@/lib/role-guard";

type JobStatus = "active" | "under-review" | "completed";

export default function MyJobsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<JobStatus>("active");
  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await jobAPI.getMyJobs();
      setJobs(jobsData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs';
      setError(errorMessage);
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchValue: string) => {
    setSearchTerm(searchValue);
    if (searchValue.trim()) {
      try {
        const jobsData = await jobAPI.getMyJobs({ search: searchValue.trim() });
        setJobs(jobsData);
      } catch (err) {
        console.error('Error searching jobs:', err);
      }
    } else {
      loadJobs();
    }
  };

  const handleEdit = (jobId: string) => {
    router.push(`/dashboard/post-job?edit=${jobId}`);
  };

  const handleDuplicate = async (jobId: string) => {
    try {
      setActionLoading(jobId);
      const response = await jobAPI.duplicateJob(jobId);
      setNotification({ type: 'success', message: response.message });
      // Redirect to edit the duplicated job
      router.push(`/dashboard/post-job?edit=${response.job.id}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to duplicate job';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setActionLoading(null);
    }
  };

  const handleShare = async (jobId: string) => {
    try {
      const jobUrl = `${window.location.origin}/dashboard/client/my-jobs/${jobId}`;
      await navigator.clipboard.writeText(jobUrl);
      setNotification({ type: 'success', message: 'Job URL copied to clipboard!' });
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.log('Clipboard API failed, using fallback:', err);
      const jobUrl = `${window.location.origin}/dashboard/client/my-jobs/${jobId}`;
      const textArea = document.createElement('textarea');
      textArea.value = jobUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setNotification({ type: 'success', message: 'Job URL copied to clipboard!' });
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(jobId);
      await jobAPI.deleteJob(jobId);
      setNotification({ type: 'success', message: 'Job deleted successfully' });
      // Reload jobs to reflect changes
      await loadJobs();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete job';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredJobs = jobs.filter((job) => job.status === activeTab);
  const counts = {
    active: jobs.filter((job) => job.status === "active").length,
    "under-review": jobs.filter((job) => job.status === "under-review").length,
    completed: jobs.filter((job) => job.status === "completed").length,
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full mt-4 pb-10 flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-zinc-600" />
            <p className="text-zinc-600">Loading your jobs...</p>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="w-full mt-4 pb-10">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 font-medium">Error loading jobs: {error}</p>
              <Button onClick={loadJobs} variant="outline" size="sm" className="ml-4">
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <Alert className={`mb-6 ${notification.type === 'success' ? 'border-green-500/50 text-green-600 bg-green-50' : ''}`} variant={notification.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}

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
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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
          {filteredJobs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-500">No jobs found for the selected status.</p>
              {activeTab !== "active" && (
                <Button 
                  onClick={() => setActiveTab("active")} 
                  variant="outline" 
                  className="mt-4"
                >
                  View Active Jobs
                </Button>
              )}
            </div>
          ) : (
            filteredJobs.map((job) => (
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
                    onClick={() => handleEdit(job.id)}
                    disabled={actionLoading === job.id || job.status === 'completed'}
                  >
                    {actionLoading === job.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-200 text-zinc-900 flex items-center gap-1.5 ml-auto"
                        disabled={actionLoading === job.id}
                      >
                        {actionLoading === job.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDuplicate(job.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare(job.id)}>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(job.id)}
                        disabled={job.status === 'completed'}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </RoleGuard>
  );
}