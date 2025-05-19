"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Star, Search, ChevronDown, SlidersHorizontal, X, LayoutGrid, List, MapPin, Paperclip } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { use } from "react";

// Mock job bidders data
const jobDetails = {
  id: "1",
  title: "E-commerce Platform Redesign",
  category: "Web Development",
  status: "active",
  bids: {
    total: 12,
    posted: "3 days ago",
    stats: {
      averageBid: "$850",
      bidRange: "$600 - $1,200",
      averageTimeline: "14 days",
      topRatedBidders: 8
    }
  }
};

// Bidder interface
interface Bidder {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  bid: string;
  timeline: string;
  proposal: string;
  skills: string[];
  attachments: number;
}

// Mock bidders data
const bidders: Bidder[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatar: "/images/bids-received/avatar-sarah.jpg",
    location: "San Francisco, CA",
    rating: 4.9,
    bid: "$850",
    timeline: "14 days",
    proposal: "I have over 5 years of experience in similar projects. My approach focuses on delivering high-quality results while maintaining clear communication throughout the process.",
    skills: ["UI Design", "Web Development", "React", "TypeScript"],
    attachments: 2
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/images/bids-received/avatar-michael.jpg",
    location: "Toronto, Canada",
    rating: 4.7,
    bid: "$920",
    timeline: "12 days",
    proposal: "Having successfully completed over 50 similar projects, I bring extensive expertise in modern web development and a track record of exceeding client expectations.",
    skills: ["Frontend", "UX Design", "Next.js", "Tailwind"],
    attachments: 1
  },
  {
    id: "3",
    name: "Emma Thompson",
    avatar: "/images/pricing/profiles/emily-profile.jpg",
    location: "London, UK",
    rating: 4.8,
    bid: "$780",
    timeline: "15 days",
    proposal: "I specialize in creating intuitive and responsive web applications. My focus is on writing clean, maintainable code that scales well.",
    skills: ["Full Stack", "Node.js", "React", "MongoDB"],
    attachments: 3
  }
];

export default function BidsReceivedPage({ params }: { params: Promise<{ id: string }> }) {
  // The job ID is accessed via params.id
  // In a real app, we would fetch the job details and bids using this ID
  const { id } = use(params);
  
  return (
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
          {jobDetails.title}
        </Link>
        <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
        <span className="text-zinc-900 font-medium">Bids</span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-zinc-900">
          Bids Received for {jobDetails.title}
        </h1>
        <p className="text-zinc-500 mt-1">
          {jobDetails.bids.total} bids received • Posted{" "}
          {jobDetails.bids.posted}
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
            {jobDetails.bids.stats.averageBid}
          </p>
        </div>

        {/* Bid Range */}
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Bid Range</h3>
          <p className="text-2xl font-semibold text-zinc-900">
            {jobDetails.bids.stats.bidRange}
          </p>
        </div>

        {/* Average Timeline */}
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Average Timeline</h3>
          <p className="text-2xl font-semibold text-zinc-900">
            {jobDetails.bids.stats.averageTimeline}
          </p>
        </div>

        {/* Top Rated Bidders */}
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Top Rated Bidders</h3>
          <p className="text-2xl font-semibold text-zinc-900">
            {jobDetails.bids.stats.topRatedBidders}
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
                Sort by: Most Recent
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuItem>Lowest Price</DropdownMenuItem>
              <DropdownMenuItem>Highest Price</DropdownMenuItem>
              <DropdownMenuItem>Shortest Timeline</DropdownMenuItem>
              <DropdownMenuItem>Highest Rating</DropdownMenuItem>
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
        {bidders.map((bidder) => (
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
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-200 text-zinc-900 flex-1"
                  >
                    Message
                  </Button>
                </div>
                <Link href={`/dashboard/client/my-jobs/${id}/bids/${bidder.id}/hire`}>
                  <Button
                    className="bg-zinc-900 hover:bg-zinc-800 text-white"
                    size="sm"
                  >
                    Accept Bid
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 