"use client";

import { useState } from "react";
import {
  MessageSquare,
  Clock,
  MapPin,
  Calendar,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Building,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types for our data
interface BaseBid {
  id: number;
  jobTitle: string;
  company: string;
  bidAmount: string;
  location: string;
}

interface ActiveBid extends BaseBid {
  status: "Under Review" | "Pending";
  submittedDate: string;
  timeRemaining: string;
}

interface AcceptedBid extends BaseBid {
  status: "Accepted";
  startDate: string;
  duration: string;
}

interface RejectedBid extends BaseBid {
  status: "Rejected";
  rejectedDate: string;
  reason: string;
}

type Bid = ActiveBid | AcceptedBid | RejectedBid;

type BidsData = {
  active: ActiveBid[];
  accepted: AcceptedBid[];
  rejected: RejectedBid[];
}

// Mock data for bids
const MOCK_BIDS: BidsData = {
  active: [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      status: "Under Review",
      bidAmount: "$85/hr",
      location: "San Francisco, CA (Remote)",
      submittedDate: "Oct 15, 2023",
      timeRemaining: "3 days",
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      company: "InnovateTech",
      status: "Under Review",
      bidAmount: "$90/hr",
      location: "Boston, MA (Remote)",
      submittedDate: "Oct 18, 2023",
      timeRemaining: "5 days",
    },
    {
      id: 3,
      jobTitle: "Full Stack Engineer",
      company: "Global Solutions",
      status: "Pending",
      bidAmount: "$95/hr",
      location: "Chicago, IL (Hybrid)",
      submittedDate: "Oct 20, 2023",
      timeRemaining: "7 days",
    },
    {
      id: 4,
      jobTitle: "DevOps Engineer",
      company: "CloudTech Systems",
      status: "Pending",
      bidAmount: "$100/hr",
      location: "Seattle, WA (Remote)",
      submittedDate: "Oct 22, 2023",
      timeRemaining: "9 days",
    },
    {
      id: 5,
      jobTitle: "Mobile App Developer",
      company: "AppWorks Inc.",
      status: "Under Review",
      bidAmount: "$85/hr",
      location: "Austin, TX (On-site)",
      submittedDate: "Oct 25, 2023",
      timeRemaining: "11 days",
    },
  ],
  accepted: [
    {
      id: 6,
      jobTitle: "UI/UX Designer",
      company: "Design Studio Co.",
      status: "Accepted",
      bidAmount: "$75/hr",
      location: "New York, NY (Hybrid)",
      startDate: "Nov 1, 2023",
      duration: "3 months",
    },
    {
      id: 7,
      jobTitle: "Product Designer",
      company: "Creative Solutions",
      status: "Accepted",
      bidAmount: "$80/hr",
      location: "Los Angeles, CA (Remote)",
      startDate: "Nov 5, 2023",
      duration: "6 months",
    },
    {
      id: 8,
      jobTitle: "Graphics Designer",
      company: "Artistry Inc.",
      status: "Accepted",
      bidAmount: "$70/hr",
      location: "Miami, FL (Hybrid)",
      startDate: "Nov 10, 2023",
      duration: "2 months",
    },
  ],
  rejected: [
    {
      id: 9,
      jobTitle: "React Developer",
      company: "Startup Labs",
      status: "Rejected",
      bidAmount: "$70/hr",
      location: "Austin, TX (Remote)",
      rejectedDate: "Oct 10, 2023",
      reason: "Position filled",
    },
    {
      id: 10,
      jobTitle: "Frontend Engineer",
      company: "WebTech Solutions",
      status: "Rejected",
      bidAmount: "$75/hr",
      location: "Denver, CO (On-site)",
      rejectedDate: "Oct 5, 2023",
      reason: "Skills mismatch",
    },
  ],
};

// Main component for the My Bids page
export default function MyBidsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "accepted" | "rejected">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy] = useState("Most Recent");

  // Function to filter bids based on search query
  const filterBids = (bids: Bid[]): Bid[] => {
    if (!searchQuery) return bids;
    
    const query = searchQuery.toLowerCase();
    return bids.filter(
      (bid) =>
        bid.jobTitle.toLowerCase().includes(query) ||
        bid.company.toLowerCase().includes(query) ||
        bid.location.toLowerCase().includes(query)
    );
  };

  // Get the current bids to display based on active tab
  let currentBids: Bid[] = [];
  if (activeTab === "active") {
    currentBids = filterBids(MOCK_BIDS.active);
  } else if (activeTab === "accepted") {
    currentBids = filterBids(MOCK_BIDS.accepted);
  } else if (activeTab === "rejected") {
    currentBids = filterBids(MOCK_BIDS.rejected);
  }

  // Type guard functions
  const isActiveBid = (bid: Bid): bid is ActiveBid => 
    bid.status === "Under Review" || bid.status === "Pending";
  
  const isAcceptedBid = (bid: Bid): bid is AcceptedBid => 
    bid.status === "Accepted";
  
  const isRejectedBid = (bid: Bid): bid is RejectedBid => 
    bid.status === "Rejected";

  return (
    <div className="py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-6">My Bids</h1>
        
        {/* Bid Stats */}
        <div className="flex flex-wrap gap-8 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
            <span className="text-sm font-medium">
              {MOCK_BIDS.active.length} Active Bids
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2A9D90]"></div>
            <span className="text-sm font-medium">
              {MOCK_BIDS.accepted.length} Accepted Bids
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
            <span className="text-sm font-medium text-zinc-500">
              {MOCK_BIDS.rejected.length} Rejected Bids
            </span>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search bids..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border border-zinc-200"
            />
          </div>
          <div className="relative">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white"
              >
                <span>{sortBy}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="p-2 bg-white"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-zinc-200">
          <button
            onClick={() => setActiveTab("active")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "active"
                ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50 rounded-t-md"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Active Bids
          </button>
          <button
            onClick={() => setActiveTab("accepted")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "accepted"
                ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50 rounded-t-md"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Accepted Bids
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "rejected"
                ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50 rounded-t-md"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Rejected Bids
          </button>
        </div>
      </div>

      {/* Bids List */}
      <div>
        {currentBids.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">No {activeTab} bids found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBids.map((bid) => (
              <div 
                key={bid.id} 
                className="border border-zinc-200 rounded-lg shadow-sm bg-white overflow-hidden"
              >
                {/* Job Title and Status */}
                <div className="p-5 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-zinc-900">{bid.jobTitle}</h3>
                    <div>
                      <span 
                        className={`
                          inline-block px-3 py-1 rounded-full text-xs font-semibold
                          ${isActiveBid(bid) ? "bg-zinc-900 text-white" : ""}
                          ${isAcceptedBid(bid) ? "bg-[#2A9D90] text-white" : ""}
                          ${isRejectedBid(bid) ? "border border-zinc-200 text-zinc-500" : ""}
                        `}
                      >
                        {bid.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500 mb-1">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{bid.company}</span>
                  </div>
                </div>
                
                {/* Divider */}
                <hr className="border-zinc-200" />
                
                {/* Bid Details */}
                <div className="p-5">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Bid Amount</p>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-zinc-900">{bid.bidAmount}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-zinc-500">
                        <MapPin className="w-5 h-5 text-zinc-500" />
                        <span className="text-sm">{bid.location}</span>
                      </div>
                    </div>
                    
                    {isActiveBid(bid) && (
                      <>
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Calendar className="w-5 h-5 text-zinc-500" />
                            <span className="text-sm">Submitted on {bid.submittedDate}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Clock className="w-5 h-5 text-zinc-500" />
                            <span className="text-sm">Time remaining: {bid.timeRemaining}</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {isAcceptedBid(bid) && (
                      <>
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Calendar className="w-5 h-5 text-zinc-500" />
                            <span className="text-sm">Start Date: {bid.startDate}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Clock className="w-5 h-5 text-zinc-500" />
                            <span className="text-sm">Duration: {bid.duration}</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {isRejectedBid(bid) && (
                      <>
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Calendar className="w-5 h-5 text-zinc-500" />
                            <span className="text-sm">Rejected on {bid.rejectedDate}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <span className="text-sm ml-7">Reason: {bid.reason}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Divider */}
                <hr className="border-zinc-200" />
                
                {/* Action Buttons */}
                <div className="p-5 flex gap-3 justify-end">
                  {isActiveBid(bid) && (
                    <>
                      <Button 
                        className="bg-zinc-900 hover:bg-zinc-800 text-white w-full sm:w-auto"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-zinc-200 hover:bg-zinc-50 w-full sm:w-auto"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Withdraw
                      </Button>
                    </>
                  )}
                  
                  {isAcceptedBid(bid) && (
                    <>
                      <Button 
                        className="bg-zinc-900 hover:bg-zinc-800 text-white w-full sm:w-auto"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-zinc-200 hover:bg-zinc-50 w-full sm:w-auto"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                  
                  {isRejectedBid(bid) && (
                    <>
                      <Button 
                        className="bg-zinc-900 hover:bg-zinc-800 text-white w-full sm:w-auto"
                      >
                        Similar Jobs
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-zinc-200 hover:bg-zinc-50 w-full sm:w-auto"
                      >
                        Get Feedback
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 