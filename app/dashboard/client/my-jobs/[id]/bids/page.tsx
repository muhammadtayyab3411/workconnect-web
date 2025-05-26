"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, Star, Search, ChevronDown, SlidersHorizontal, X, LayoutGrid, List, MapPin, Paperclip, Loader2, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { use } from "react";
import { jobBidsAPI, JobBidsResponse, JobBidder } from "@/lib/api";
import { chatAPI } from "@/lib/chat-api";
import { RoleGuard } from "@/lib/role-guard";

export default function BidsReceivedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  // State management
  const [jobBids, setJobBids] = useState<JobBidsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [filteredBidders, setFilteredBidders] = useState<JobBidder[]>([]);
  const [startingChat, setStartingChat] = useState<string | null>(null);

  // Load job bids data on component mount
  useEffect(() => {
    loadJobBids();
  }, [id]);

  // Filter and sort bidders when data or filters change
  useEffect(() => {
    if (jobBids?.bids?.bidders) {
      let filtered = [...jobBids.bids.bidders];

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(bidder =>
          bidder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bidder.proposal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bidder.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Apply sorting
      switch (sortBy) {
        case "Lowest Price":
          filtered.sort((a, b) => {
            const priceA = parseFloat(a.bid.replace('$', ''));
            const priceB = parseFloat(b.bid.replace('$', ''));
            return priceA - priceB;
          });
          break;
        case "Highest Price":
          filtered.sort((a, b) => {
            const priceA = parseFloat(a.bid.replace('$', ''));
            const priceB = parseFloat(b.bid.replace('$', ''));
            return priceB - priceA;
          });
          break;
        case "Highest Rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "Shortest Timeline":
          // Simple timeline sorting (could be improved with better parsing)
          filtered.sort((a, b) => a.timeline.localeCompare(b.timeline));
          break;
        default: // Most Recent
          filtered.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
      }

      setFilteredBidders(filtered);
    }
  }, [jobBids, searchTerm, sortBy]);

  const loadJobBids = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const bidsData = await jobBidsAPI.getJobBids(id);
      setJobBids(bidsData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load job bids';
      setError(errorMessage);
      console.error('Error loading job bids:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    try {
      await jobBidsAPI.acceptBid(bidId);
      // Reload the bids to get updated status
      await loadJobBids();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to accept bid';
      setError(errorMessage);
      console.error('Error accepting bid:', err);
    }
  };

  const handleStartChat = async (workerId: number) => {
    try {
      setStartingChat(workerId.toString());
      
      // Create or find existing conversation
      const conversation = await chatAPI.createConversation({
        participant_ids: [workerId],
        job: id
      });
      
      // Redirect to messages page with the conversation
      router.push(`/dashboard/messages?conversation=${conversation.id}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      setError(errorMessage);
      console.error('Error starting chat:', err);
    } finally {
      setStartingChat(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full mt-4 pb-10 flex justify-center items-center min-h-[400px]">
          <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
        </div>
      </RoleGuard>
    );
  }

  // Error state
  if (error || !jobBids) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full mt-4 pb-10">
          <Alert className="bg-red-100 border-red-400 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Job bids not found'}
            </AlertDescription>
          </Alert>
        </div>
      </RoleGuard>
    );
  }
  
  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="w-full mt-4 pb-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/dashboard" className="text-zinc-500 hover:text-zinc-700">
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
          <Link
            href="/dashboard/client/my-jobs"
            className="text-zinc-500 hover:text-zinc-700"
          >
            Jobs
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
          <Link
            href={`/dashboard/client/my-jobs/${id}`}
            className="text-zinc-500 hover:text-zinc-700"
          >
            {jobBids.title}
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
          <span className="text-zinc-900 font-medium">Bids</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Bids Received for {jobBids.title}
          </h1>
          <p className="text-zinc-500 mt-1">
            {jobBids.bids.total} bids received • Posted{" "}
            {jobBids.bids.posted}
          </p>
        </div>

        {/* Divider line after header */}
        <div className="h-px bg-zinc-200 mb-6"></div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Average Bid */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-sm text-zinc-500 mb-1">Average Bid</h3>
            <p className="text-2xl font-semibold text-zinc-900">
              {jobBids.bids.stats.averageBid}
            </p>
          </div>

          {/* Bid Range */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-sm text-zinc-500 mb-1">Bid Range</h3>
            <p className="text-2xl font-semibold text-zinc-900">
              {jobBids.bids.stats.bidRange}
            </p>
          </div>

          {/* Average Timeline */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-sm text-zinc-500 mb-1">Average Timeline</h3>
            <p className="text-2xl font-semibold text-zinc-900">
              {jobBids.bids.stats.averageTimeline}
            </p>
          </div>

          {/* Top Rated Bidders */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-sm text-zinc-500 mb-1">Top Rated Bidders</h3>
            <p className="text-2xl font-semibold text-zinc-900">
              {jobBids.bids.stats.topRatedBidders}
            </p>
          </div>
        </div>

        {/* View Controls, Search and Filter */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          {/* View Toggle */}
          <div className="flex items-center border border-zinc-200 rounded-md overflow-hidden">
            <button className="p-2 bg-white text-zinc-900">
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button className="p-2 bg-white text-zinc-900">
              <List className="h-5 w-5" />
            </button>
          </div>
          {/* Sort */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-zinc-200 text-zinc-900 flex items-center gap-2"
                >
                  Sort by: {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("Most Recent")}>Most Recent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Lowest Price")}>Lowest Price</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Highest Price")}>Highest Price</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Shortest Timeline")}>Shortest Timeline</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Highest Rating")}>Highest Rating</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1"></div> {/* Spacer */}
          {/* Search */}
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search bids..."
              className="pl-10 border-zinc-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter */}
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              className="border-zinc-200 text-zinc-900 flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-zinc-100 px-3 py-1 rounded-full flex items-center gap-2 text-xs">
            <span className="font-semibold text-zinc-900">Price: $500-$1000</span>
            <button className="text-zinc-900">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="bg-zinc-100 px-3 py-1 rounded-full flex items-center gap-2 text-xs">
            <span className="font-semibold text-zinc-900">Rating: 4★+</span>
            <button className="text-zinc-900">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="bg-zinc-100 px-3 py-1 rounded-full flex items-center gap-2 text-xs">
            <span className="font-semibold text-zinc-900">Verified Only</span>
            <button className="text-zinc-900">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bids Grid - 3 per row layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {filteredBidders.map((bidder) => (
            <div
              key={bidder.id}
              className="bg-white border border-zinc-200 rounded-lg shadow-sm p-7 flex flex-col min-h-[320px]"
            >
              {/* Profile and Rating */}
              <div className="flex items-start mb-4">
                <div className="mr-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={bidder.avatar}
                      alt={bidder.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-zinc-900">
                    {bidder.name}
                  </h3>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-zinc-500" />
                    <p className="text-sm text-zinc-500">{bidder.location}</p>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <span className="flex items-center mr-1">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 " />
                    {bidder.rating}
                  </span>
                </div>
              </div>

              {/* Bid Amount and Timeline */}
              <div className="mb-3">
                <div className="text-2xl font-semibold text-zinc-900 mb-1">
                  {bidder.bid}
                </div>
                <div className="text-sm text-zinc-500 mb-3">
                  {bidder.timeline}
                </div>
                <p className="text-sm text-zinc-600 line-clamp-3 mb-3">
                  {bidder.proposal}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {bidder.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-zinc-100 rounded-full px-2.5 py-0.5 text-xs font-medium text-zinc-900"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Attachments */}
              <div className="flex items-center text-zinc-500 text-xs mb-4">
                <span className="flex items-center">
                  <Paperclip className="h-4 w-4 mr-1 text-zinc-500" />
                  {bidder.attachments} attachment
                  {bidder.attachments !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-auto">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-200 text-zinc-900 flex-1"
                      asChild
                    >
                      <Link href={`/dashboard/worker/${bidder.worker_id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-200 text-zinc-900 flex-1"
                      onClick={() => handleStartChat(bidder.worker_id)}
                      disabled={startingChat === bidder.worker_id.toString()}
                    >
                      {startingChat === bidder.worker_id.toString() ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        'Message'
                      )}
                    </Button>
                  </div>
                  {bidder.status === 'pending' ? (
                    <Button
                      className="bg-zinc-900 hover:bg-zinc-800 text-white"
                      size="sm"
                      onClick={() => handleAcceptBid(bidder.id)}
                    >
                      Accept Bid
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-700 bg-green-50"
                      disabled
                    >
                      {bidder.status === 'accepted' ? 'Accepted' : bidder.status.charAt(0).toUpperCase() + bidder.status.slice(1)}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No bids message */}
        {filteredBidders.length === 0 && jobBids.bids.total === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">No bids received yet for this job.</p>
            <p className="text-zinc-400 text-sm mt-2">Check back later or consider promoting your job to get more visibility.</p>
          </div>
        )}

        {/* No filtered results message */}
        {filteredBidders.length === 0 && jobBids.bids.total > 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">No bids match your current filters.</p>
            <p className="text-zinc-400 text-sm mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </RoleGuard>
  );
} 