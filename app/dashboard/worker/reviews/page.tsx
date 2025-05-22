"use client";

import { useState } from "react";
import {
  Search,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// Types for review data
interface Review {
  id: number;
  client: {
    name: string;
    avatar: string;
  };
  date: string;
  projectTitle: string;
  rating: number;
  content: string;
  skills: string[];
  response?: string;
}

// Mock data for reviews
const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    client: {
      name: "Sarah Johnson",
      avatar: "/images/avatars/sarah_johnson.png",
    },
    date: "Jan 15, 2024",
    projectTitle: "Website Redesign Project",
    rating: 5,
    content: "Exceptional work! Delivered the project ahead of schedule with outstanding attention to detail. Communication was clear and professional throughout the entire process.",
    skills: ["Quality Work", "Communication", "On-time"],
  },
  {
    id: 2,
    client: {
      name: "Michael Chen",
      avatar: "/images/avatars/michael_chen.png",
    },
    date: "Jan 12, 2024",
    projectTitle: "E-commerce Development",
    rating: 5,
    content: "Great experience working together. Demonstrated deep knowledge of e-commerce platforms and implemented all features exactly as requested.",
    skills: ["Technical Skills", "Problem Solving"],
    response: "Thank you for the wonderful feedback! It was a pleasure working on your e-commerce project."
  },
];

// Performance chart data
const performanceData = [
  { month: "Oct", rating: 4.7 },
  { month: "Nov", rating: 4.8 },
  { month: "Dec", rating: 4.8 },
  { month: "Jan", rating: 4.9 },
  { month: "Feb", rating: 4.9 },
];

// Reviews by rating data
const reviewsByRatingData = [
  { rating: "1", count: 20, color: "#E76E50" },
  { rating: "3", count: 60, color: "#E76E50" },
  { rating: "4", count: 80, color: "#E76E50" },
  { rating: "5", count: 100, color: "#E76E50" },
];

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter reviews based on search query
  const filteredReviews = MOCK_REVIEWS.filter(
    (review) =>
      review.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats data
  const overallRating = "4.8";
  const totalReviews = "284";
  const recentPerformance = "4.9";
  const recentTrend = "+0.1";
  const responseRate = "98%";
  const respondedReviews = "196";
  const recentGrowth = "+12";

  // Skills data
  const skillsData = [
    { name: "Communication", percentage: 87 },
    { name: "Quality Work", percentage: 92 },
    { name: "On-time Delivery", percentage: 95 },
    { name: "Professionalism", percentage: 89 },
  ];

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "fill-[#E8C468] text-[#E8C468]" : "fill-none text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="py-6">
      {/* Header Section */}
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-2">Reviews Received</h1>
        <p className="text-zinc-500">
          Dashboard / Reviews Received
        </p>
      </div>

      {/* Divider */}
      <hr className="border-zinc-200 mb-6" />

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Overall Rating Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Overall Rating</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-zinc-900">{overallRating}</p>
              <p className="text-sm text-zinc-500 mb-1">out of 5.0</p>
            </div>
            <div className="flex">
              {renderStars(5)}
            </div>
            <p className="text-sm text-zinc-500">Based on {totalReviews} reviews</p>
          </div>
        </div>

        {/* Recent Performance Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Recent Performance</p>
          </div>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-zinc-900">{recentPerformance}</p>
            <span className="text-green-600 ml-1 text-sm">
              {recentTrend}
            </span>
          </div>
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#E76E50" 
                  strokeWidth={2}
                  dot={{ fill: '#E76E50', r: 4 }}
                  activeDot={{ r: 6, fill: '#E76E50' }}
                />
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Reviews Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Total Reviews</p>
          </div>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-zinc-900">{totalReviews}</p>
            <span className="text-green-600 ml-1 text-sm">
              {recentGrowth}
            </span>
          </div>
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={reviewsByRatingData} 
                barSize={40}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <Bar 
                  dataKey="count" 
                  fill="#E76E50" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Rate Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Response Rate</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold text-zinc-900">{responseRate}</p>
            <p className="text-sm text-zinc-500">Responded to {respondedReviews} reviews</p>
            <div className="w-full bg-zinc-100 h-2 rounded-full mt-2">
              <div 
                className="bg-zinc-900 h-2 rounded-full" 
                style={{ width: `${responseRate.replace('%', '')}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Skills Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Top Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((skill, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-900">{skill.name}</span>
                <span className="text-sm text-zinc-500">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full">
                <div 
                  className="bg-zinc-900 h-2 rounded-full" 
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-zinc-200"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px] border-zinc-200 bg-white">
                <SelectValue placeholder="All ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="flex-grow sm:flex-grow-0 border-zinc-200">
            <CalendarDays className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" className="flex-grow sm:flex-grow-0 border-zinc-200">
            <ChevronRight className="mr-2 h-4 w-4 rotate-90" />
            Most Recent
          </Button>
          <Button variant="outline" className="flex-grow sm:flex-grow-0 border-zinc-200">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div 
            key={review.id} 
            className="border border-zinc-200 rounded-lg shadow-sm bg-white p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <Image 
                    src={review.client.avatar} 
                    alt={review.client.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-900">{review.client.name}</h3>
                    <p className="text-sm text-zinc-500">{review.date}</p>
                  </div>
                  <div className="flex mt-2 sm:mt-0">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-zinc-900">{review.projectTitle}</h4>
                  <p className="mt-2 text-zinc-600">{review.content}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {review.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-zinc-100 text-zinc-900 text-xs font-semibold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {review.response && (
                  <div className="mt-4 bg-zinc-50/50 rounded-md p-4 text-sm text-zinc-600 border-l-2 border-zinc-200">
                    {review.response}
                  </div>
                )}
                {!review.response && (
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="text-zinc-900">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <div className="text-sm text-zinc-500 mb-4 sm:mb-0">
          Showing 1-10 of {totalReviews} reviews
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="px-3 bg-white">
            1
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            2
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            3
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 