"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, 
  Star, 
  Briefcase, 
  Calendar, 
  Check,
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  Eye,
  Users
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { RoleGuard } from "@/lib/role-guard";
import { jobAPI, bidAPI, Job, JobListItem, Bid } from "@/lib/api";
import JobLocationMap from "@/components/maps/JobLocationMap";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<JobListItem[]>([]);
  const [userBid, setUserBid] = useState<Bid | null>(null);
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobData();
  }, [id]);

  const loadJobData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load job details, similar jobs, and user's bid status in parallel
      const [jobData, allJobs, userBidsData] = await Promise.all([
        jobAPI.getJob(id),
        jobAPI.getJobs(),
        bidAPI.getMyBids().catch(() => []) // Don't fail if user has no bids
      ]);
      
      setJob(jobData);
      setUserBids(userBidsData);
      
      // Check if user has already applied to this job
      const existingBid = userBidsData.find((bid: Bid) => bid.job === id);
      setUserBid(existingBid || null);
      
      // Filter similar jobs (same category, exclude current job)
      const similar = allJobs
        .filter(j => j.id !== id && j.category_name === jobData.category_name)
        .slice(0, 4);
      setSimilarJobs(similar);
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load job details';
      setError(errorMessage);
      console.error('Error loading job data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['worker']}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-600">Loading job details...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </RoleGuard>
    );
  }

  if (error || !job) {
    return (
      <RoleGuard allowedRoles={['worker']}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
              <div className="flex items-center">
                <Link href="/dashboard/worker/jobs" className="text-zinc-600 hover:text-zinc-900 flex items-center text-sm font-medium">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Jobs
                </Link>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mt-6">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-medium">Error loading job details</p>
                <p className="text-red-600 text-sm mt-1">{error || 'Job not found'}</p>
                <div className="mt-4 space-x-3">
                  <Button onClick={loadJobData} variant="outline">
                    Try Again
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/dashboard/worker/jobs">
                      Back to Jobs
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </RoleGuard>
    );
  }

  // Parse special requirements into list if it contains line breaks or bullet points
  const getRequirementsList = (requirements: string) => {
    if (!requirements) return [];
    
    // Split by newlines or common list separators
    const items = requirements
      .split(/[\n\r]|•|・|\d+\.|\-/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    return items.length > 1 ? items : [requirements];
  };

  const requirementsList = getRequirementsList(job.special_requirements || '');

  return (
    <RoleGuard allowedRoles={['worker']}>
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
                {userBid ? (
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white" 
                      disabled
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Applied
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-zinc-600">
                        Status: <span className="font-medium capitalize">{userBid.status_display}</span>
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Applied {new Date(userBid.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/worker/jobs/${id}/bid`}>
                      Submit Proposal
                    </Link>
                  </Button>
                )}
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
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">{job.title}</h1>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                      {job.category_name}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                      {job.city}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                      {job.budget_display}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full border border-transparent">
                      {job.job_type_display}
                    </span>
                    {job.urgent && (
                      <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full border border-transparent">
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-zinc-500">
                    Posted by {job.client_name} • {job.posted_time_ago}
                  </p>
                </div>
                
                {/* Job description */}
                <Card className="p-4 sm:p-6">
                  <div className="space-y-5 sm:space-y-6">
                    {/* Overview */}
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-xl font-semibold text-zinc-900">Job Overview</h2>
                      <p className="text-zinc-600 whitespace-pre-wrap">{job.description}</p>
                    </div>
                    
                    <hr className="border-zinc-200" />
                    
                    {/* Job Stats */}
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-xl font-semibold text-zinc-900">Job Statistics</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-zinc-500" />
                          <span className="text-zinc-600">{job.views_count} views</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-zinc-500" />
                          <span className="text-zinc-600">{job.applications_count} applications</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-zinc-500" />
                          <span className="text-zinc-600">Posted {job.posted_time_ago}</span>
                        </div>
                      </div>
                    </div>
                    
                    {requirementsList.length > 0 && (
                      <>
                        <hr className="border-zinc-200" />
                        
                        {/* Requirements */}
                        <div className="space-y-2 sm:space-y-3">
                          <h2 className="text-xl font-semibold text-zinc-900">Requirements</h2>
                          <ul className="space-y-2">
                            {requirementsList.map((item, index) => (
                              <li key={index} className="flex">
                                <span className="w-2 h-2 mt-2 mr-2 flex-shrink-0 bg-zinc-600 rounded-full" />
                                <p className="text-zinc-600">{item}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
                
                {/* Similar Jobs */}
                {similarJobs.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-xl font-semibold text-zinc-900">Similar Jobs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {similarJobs.map((similarJob) => (
                        <Card key={similarJob.id} className="p-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-zinc-900">{similarJob.title}</h3>
                            <p className="text-sm text-zinc-500">{similarJob.client_name} • {similarJob.city}</p>
                            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
                              <span className="px-3 py-1 text-xs font-semibold bg-zinc-100 text-zinc-900 rounded-full">
                                {similarJob.budget_display}
                              </span>
                              {(() => {
                                const similarJobBid = userBids.find((bid: Bid) => bid.job === similarJob.id);
                                return similarJobBid ? (
                                  <Button 
                                    className="h-8 text-sm w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white" 
                                    disabled
                                  >
                                    <Check className="w-4 h-4 mr-1" />
                                    Applied
                                  </Button>
                                ) : (
                                  <Button className="h-8 text-sm w-full sm:w-auto" asChild>
                                    <Link href={`/dashboard/worker/jobs/${similarJob.id}`}>
                                      Quick Apply
                                    </Link>
                                  </Button>
                                );
                              })()}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sidebar - hidden on mobile until specific sections */}
              <div className="space-y-6">
                {/* Apply card - hidden on mobile since we show it at the top */}
                <Card className="hidden lg:block p-6">
                  <div className="space-y-4">
                    {userBid ? (
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white" 
                          disabled
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Applied
                        </Button>
                        <div className="text-center">
                          <p className="text-sm text-zinc-600">
                            Status: <span className="font-medium capitalize">{userBid.status_display}</span>
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">
                            Applied {new Date(userBid.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Button className="w-full" asChild>
                        <Link href={`/dashboard/worker/jobs/${id}/bid`}>
                          Submit Proposal
                        </Link>
                      </Button>
                    )}
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-zinc-600">Budget Range</p>
                        <p className="text-zinc-900 font-semibold">{job.budget_display}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-zinc-600">Duration</p>
                        <p className="text-zinc-900">{job.duration_display || 'Not specified'}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-zinc-600">Posted</p>
                        <p className="text-zinc-900">{job.posted_time_ago}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-zinc-600">Applications</p>
                        <p className="text-zinc-900">{job.applications_count} submitted</p>
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
                        <p className="text-sm font-medium">{job.budget_display}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-zinc-500">Duration</p>
                        <p className="text-sm font-medium">{job.duration_display || 'Not specified'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-zinc-500">Posted</p>
                        <p className="text-sm font-medium">{job.posted_time_ago}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-zinc-500">Applications</p>
                        <p className="text-sm font-medium">{job.applications_count} submitted</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Client info */}
                <Card className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold">About the Client</h2>
                    
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-zinc-600">
                          {job.client_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">{job.client_name}</p>
                        <div className="flex items-center text-sm text-zinc-500">
                          <span>Verified Client</span>
                          <Check className="ml-1 w-4 h-4 text-zinc-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-zinc-900" />
                      <p className="text-sm sm:text-base text-zinc-900">4.8/5 (12 reviews)</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-zinc-900" />
                      <p className="text-sm sm:text-base text-zinc-900">8 jobs posted</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-zinc-900" />
                      <p className="text-sm sm:text-base text-zinc-900">Member since Jan 2024</p>
                    </div>
                  </div>
                </Card>
                
                {/* Location */}
                <Card className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Location</h2>
                    
                    {(() => {
                      // Check if we have valid coordinates (not null, not undefined, not 0)
                      const hasValidCoords = job.latitude && job.longitude && 
                                           Number(job.latitude) !== 0 && Number(job.longitude) !== 0;
                      
                      return hasValidCoords ? (
                        <JobLocationMap
                          latitude={Number(job.latitude)}
                          longitude={Number(job.longitude)}
                          address={job.address}
                          className="h-32 sm:h-40 w-full rounded-md"
                        />
                      ) : (
                        <div className="relative h-32 sm:h-40 w-full rounded-md overflow-hidden bg-zinc-100 flex items-center justify-center">
                          <div className="text-center text-zinc-500">
                            <MapPin className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Map unavailable</p>
                            <p className="text-xs mt-1">
                              {!job.latitude || !job.longitude ? 'No coordinates' : 'Invalid coordinates'}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 mt-1 text-zinc-500 flex-shrink-0" />
                      <div>
                        <p className="text-zinc-600">{job.address}</p>
                        <p className="text-xs sm:text-sm text-zinc-500">{job.city}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RoleGuard>
  );
} 