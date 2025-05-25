'use client'

import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Grid, 
  List, 
  Wrench,
  Truck,
  Zap,
  Hammer,
  PaintBucket,
  X,
  Filter,
  Loader2,
  AlertCircle,
  Briefcase,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { RoleGuard } from "@/lib/role-guard";
import { jobAPI, bidAPI, JobListItem, JobCategory, Bid } from "@/lib/api";

// Category icons mapping
const getCategoryIcon = (categoryName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Plumbing': <Wrench className="w-5 h-5" />,
    'Electrical': <Zap className="w-5 h-5" />,
    'Moving': <Truck className="w-5 h-5" />,
    'Carpentry': <Hammer className="w-5 h-5" />,
    'Painting': <PaintBucket className="w-5 h-5" />,
    'Landscaping': <Wrench className="w-5 h-5" />,
    'Cleaning': <Briefcase className="w-5 h-5" />,
    'HVAC': <Zap className="w-5 h-5" />,
    'Handyman': <Hammer className="w-5 h-5" />,
    'Other': <Briefcase className="w-5 h-5" />
  };
  return iconMap[categoryName] || <Briefcase className="w-5 h-5" />;
};

// Job durations for filter
const jobDurations = ["All", "Short-term", "Long-term"];

export default function BrowseJobsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListItem[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobListItem[]>([]);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [priceRange, setPriceRange] = useState(100);
  const [verifiedClientsOnly, setVerifiedClientsOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    loadInitialData();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job => selectedCategories.includes(job.category_name));
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.city.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Duration filter
    if (selectedDuration !== "All") {
      if (selectedDuration === "Short-term") {
        filtered = filtered.filter(job => job.job_type === "one-time");
      } else if (selectedDuration === "Long-term") {
        filtered = filtered.filter(job => job.job_type === "recurring");
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Latest':
          return new Date(b.posted_time_ago).getTime() - new Date(a.posted_time_ago).getTime();
        case 'Highest Pay':
          return parseFloat(b.budget_display.replace(/[^\d.-]/g, '')) - parseFloat(a.budget_display.replace(/[^\d.-]/g, ''));
        case 'Lowest Pay':
          return parseFloat(a.budget_display.replace(/[^\d.-]/g, '')) - parseFloat(b.budget_display.replace(/[^\d.-]/g, ''));
        default:
          return 0;
      }
    });

    // Separate featured (urgent) jobs
    const featured = filtered.filter(job => job.urgent);
    const regular = filtered.filter(job => !job.urgent);
    
    setFeaturedJobs(featured);
    setFilteredJobs(regular);
  }, [jobs, searchTerm, selectedCategories, locationFilter, selectedDuration, priceRange, verifiedClientsOnly, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load categories, jobs, and user bids in parallel
      const [jobsData, categoriesData, userBidsData] = await Promise.all([
        jobAPI.getJobs(),
        jobAPI.getCategories(),
        bidAPI.getMyBids().catch(() => []) // Don't fail if user has no bids
      ]);
      
      setJobs(jobsData);
      setCategories(categoriesData);
      setUserBids(userBidsData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs';
      setError(errorMessage);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const getJobTags = (job: JobListItem) => {
    const tags: string[] = [];
    if (job.urgent) tags.push("Urgent");
    if (job.job_type === "recurring") tags.push("Long Term");
    if (job.job_type === "one-time") tags.push("One-time");
    return tags;
  };

  // Helper function to check if user has applied to a job
  const hasUserApplied = (jobId: string): Bid | undefined => {
    return userBids.find(bid => bid.job === jobId);
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['worker']}>
        <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-zinc-600" />
            <p className="text-zinc-600">Loading available jobs...</p>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['worker']}>
      <div className="min-h-screen bg-gray-50">
        {error && (
          <div className="bg-red-50 border-b border-red-200 p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 font-medium">Error loading jobs: {error}</p>
              <Button onClick={loadInitialData} variant="outline" size="sm" className="ml-4">
                Retry
              </Button>
            </div>
          </div>
        )}

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onChange={(e) => handleCategoryChange(category.name, e.target.checked)}
                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm text-zinc-900 font-medium"
                      >
                        {category.name}
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
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
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
                  {jobDurations.map((duration) => (
                    <div key={duration} className="flex items-center">
                      <input
                        type="radio"
                        id={`duration-${duration}`}
                        name="job-duration"
                        checked={selectedDuration === duration}
                        onChange={() => setSelectedDuration(duration)}
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
                    <div className="h-2 bg-zinc-900 rounded-full absolute top-0 left-0" style={{width: `${(priceRange / 200) * 100}%`}}></div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                    <div className="w-4 h-4 bg-white border border-zinc-300 rounded-full absolute top-[-3px] shadow-md" style={{left: `calc(${(priceRange / 200) * 100}% - 8px)`}}></div>
                  </div>
                  <div className="text-center mt-2 text-sm text-zinc-600">
                    Up to ${priceRange}/hr
                  </div>
                </div>
              </div>
              
              {/* Verified Clients */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-900">
                  Verified Clients Only
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={verifiedClientsOnly}
                    onChange={(e) => setVerifiedClientsOnly(e.target.checked)}
                    className="sr-only peer" 
                  />
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
            {featuredJobs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">Featured Jobs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {featuredJobs.map((job) => (
                    <div key={job.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="bg-zinc-100 p-2 rounded-md">
                            {getCategoryIcon(job.category_name)}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {getJobTags(job).map((tag) => (
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
                            <span className="truncate">{job.city}</span>
                          </div>
                          <div className="flex items-center text-sm text-zinc-950">
                            <DollarSign className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                            {job.budget_display}
                          </div>
                          <div className="flex items-center text-sm text-zinc-950">
                            <Clock className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                            {job.posted_time_ago}
                          </div>
                        </div>
                        
                        {(() => {
                          const userBid = hasUserApplied(job.id);
                          return userBid ? (
                            <Button 
                              className="w-full bg-green-600 hover:bg-green-700 text-white" 
                              disabled
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Applied
                            </Button>
                          ) : (
                            <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white" asChild>
                              <Link href={`/dashboard/worker/jobs/${job.id}`}>
                                Apply Now
                              </Link>
                            </Button>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Available Jobs */}
            <div>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mr-4">Available Jobs</h2>
                
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="flex items-center mr-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex items-center text-sm border border-zinc-200 rounded-md py-1.5 px-3 bg-white"
                    >
                      <option value="Latest">Sort by: Latest</option>
                      <option value="Highest Pay">Sort by: Highest Pay</option>
                      <option value="Lowest Pay">Sort by: Lowest Pay</option>
                    </select>
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
              
              {filteredJobs.length === 0 ? (
                <div className="bg-white border border-zinc-200 rounded-lg p-12 text-center">
                  <Briefcase className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-900 mb-2">No jobs found</h3>
                  <p className="text-zinc-500 mb-4">
                    {searchTerm || selectedCategories.length > 0 || locationFilter
                      ? "Try adjusting your filters to see more results"
                      : "There are no jobs available at the moment"}
                  </p>
                  {(searchTerm || selectedCategories.length > 0 || locationFilter) && (
                    <Button 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategories([]);
                        setLocationFilter("");
                        setSelectedDuration("All");
                        setVerifiedClientsOnly(false);
                      }}
                      variant="outline"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="bg-zinc-100 p-2 rounded-md">
                            {getCategoryIcon(job.category_name)}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {getJobTags(job).map((tag) => (
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
                            <span className="truncate">{job.city}</span>
                          </div>
                          <div className="flex items-center text-sm text-zinc-950">
                            <DollarSign className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                            {job.budget_display}
                          </div>
                          <div className="flex items-center text-sm text-zinc-950">
                            <Clock className="h-4 w-4 mr-1 text-zinc-500 flex-shrink-0" />
                            {job.posted_time_ago}
                          </div>
                        </div>
                        
                        {(() => {
                          const userBid = hasUserApplied(job.id);
                          return userBid ? (
                            <Button 
                              className="w-full bg-green-600 hover:bg-green-700 text-white" 
                              disabled
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Applied
                            </Button>
                          ) : (
                            <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white" asChild>
                              <Link href={`/dashboard/worker/jobs/${job.id}`}>
                                Apply Now
                              </Link>
                            </Button>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
} 