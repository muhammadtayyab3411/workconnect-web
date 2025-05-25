"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Calendar,
  Loader2,
  AlertCircle
} from "lucide-react";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jobAPI, ClientJobDetail } from "@/lib/api";
import { RoleGuard } from "@/lib/role-guard";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [job, setJob] = useState<ClientJobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadJobDetail();
  }, [id]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobData = await jobAPI.getMyJobDetail(id);
      setJob(jobData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load job details';
      setError(errorMessage);
      console.error('Error loading job details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    if (!job) return;
    
    try {
      setActionLoading('complete');
      const response = await jobAPI.markJobCompleted(job.id);
      setJob(response.job);
      setNotification({ type: 'success', message: response.message });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark job as completed';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setActionLoading(null);
    }
  };

  const handleCloseJob = async () => {
    if (!job) return;
    
    try {
      setActionLoading('close');
      await jobAPI.closeJob(job.id);
      setNotification({ type: 'success', message: 'Job closed successfully' });
      // Reload job data to reflect changes
      await loadJobDetail();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to close job';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicate = async () => {
    if (!job) return;
    
    try {
      setActionLoading('duplicate');
      const response = await jobAPI.duplicateJob(job.id);
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

  const handleDelete = async () => {
    if (!job) return;
    
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }
    
    try {
      setActionLoading('delete');
      await jobAPI.deleteJob(job.id);
      setNotification({ type: 'success', message: 'Job deleted successfully' });
      // Redirect to my jobs page
      router.push('/dashboard/client/my-jobs');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete job';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownloadReport = async () => {
    if (!job) return;
    
    try {
      setActionLoading('download');
      const response = await jobAPI.downloadJobReport(job.id);
      
      // Create and download the report as JSON file
      const dataStr = JSON.stringify(response.report, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `job-report-${job.id}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setNotification({ type: 'success', message: 'Report downloaded successfully' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download report';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = () => {
    if (!job) return;
    router.push(`/dashboard/post-job?edit=${job.id}`);
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full mt-4 pb-10 flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-zinc-600" />
            <p className="text-zinc-600">Loading job details...</p>
          </div>
        </div>
      </RoleGuard>
    );
  }

  if (error || !job) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full mt-4 pb-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 font-medium">Error loading job details: {error}</p>
              <Button onClick={loadJobDetail} variant="outline" size="sm" className="ml-4">
                Retry
              </Button>
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="w-full mt-4 pb-10">
        {notification && (
          <Alert className={`mb-6 ${notification.type === 'success' ? 'border-green-500/50 text-green-600 bg-green-50' : ''}`} variant={notification.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}

        {/* Job Completion Notice */}
        {job.status === 'completed' && (
          <Alert className="mb-6 border-green-500/50 text-green-600 bg-green-50">
            <Check className="h-4 w-4" />
            <AlertDescription>
              <strong>Job Completed!</strong> This job has been marked as completed. All pending applications have been automatically rejected.
            </AlertDescription>
          </Alert>
        )}

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
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold text-zinc-900">{job.title}</h1>
              {/* Status Badge */}
              <div className="flex items-center">
                {job.status === 'completed' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    <Check className="h-4 w-4 mr-1" />
                    Completed
                  </span>
                )}
                {job.status === 'active' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <Clock className="h-4 w-4 mr-1" />
                    Active
                  </span>
                )}
                {job.status === 'under-review' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    <Clock className="h-4 w-4 mr-1" />
                    Under Review
                  </span>
                )}
              </div>
            </div>
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
                  onClick={handleEdit}
                  disabled={actionLoading !== null || job.status === 'completed'}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Job
                </Button>
                {job.status !== 'completed' ? (
                  <Button 
                    variant="outline" 
                    className="border-zinc-200 text-zinc-900"
                    onClick={handleCloseJob}
                    disabled={actionLoading !== null}
                  >
                    {actionLoading === 'close' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <X className="h-4 w-4 mr-2" />}
                    Close Job
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-700 bg-green-50"
                    disabled
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Job Closed
                  </Button>
                )}
                <Button 
                  variant="outline"
                  className="border-zinc-200 text-zinc-900"
                  onClick={handleDuplicate}
                  disabled={actionLoading !== null}
                >
                  {actionLoading === 'duplicate' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Copy className="h-4 w-4 mr-2" />}
                  Duplicate
                </Button>
                <Button 
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDelete}
                  disabled={actionLoading !== null || job.status === 'completed'}
                >
                  {actionLoading === 'delete' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash className="h-4 w-4 mr-2" />}
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
              
              {job.attachments.length > 0 ? (
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
                          <h4 className="text-base font-medium text-zinc-900">{file.caption || `Image ${index + 1}`}</h4>
                          <p className="text-sm text-zinc-500">Image file</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-zinc-200 text-zinc-900"
                        onClick={() => window.open(file.image_url, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-center py-4">No attachments uploaded for this job.</p>
              )}
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
                      className={`h-2 rounded-full ${job.status === 'completed' ? 'bg-green-600' : 'bg-zinc-900'}`}
                      style={{ width: `${job.status === 'completed' ? 100 : (job.applications.reviewed / job.applications.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Time Remaining */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">
                    {job.status === 'completed' ? 'Status' : 'Time Remaining'}
                  </p>
                  <div className="flex items-center">
                    {job.status === 'completed' ? (
                      <>
                        <Check className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-base text-green-600 font-medium">Job Completed</p>
                      </>
                    ) : (
                      <>
                        <Clock className="h-5 w-5 text-zinc-700 mr-2" />
                        <p className="text-base text-zinc-900">{job.timeRemaining}</p>
                      </>
                    )}
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

                {job.status !== 'completed' ? (
                  <Button 
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white" 
                    onClick={handleMarkCompleted}
                    disabled={actionLoading !== null}
                  >
                    {actionLoading === 'complete' ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Check className="h-5 w-5 mr-2" />}
                    Mark as Completed
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-600 text-white cursor-default" 
                    disabled
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Completed
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="w-full border-zinc-200 text-zinc-900" 
                  onClick={handleDownloadReport}
                  disabled={actionLoading !== null}
                >
                  {actionLoading === 'download' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
} 