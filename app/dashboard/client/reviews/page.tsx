"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart } from "@/components/ui/charts/pie-chart";
import { UserAvatar } from "@/components/dashboard";
import {
  Search,
  Star,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  LayoutGrid,
  ExternalLink,
} from "lucide-react";

// Mock review data
const reviewsData = [
  {
    id: "1",
    jobTitle: "Kitchen Renovation Project",
    workerName: "Sarah Johnson",
    workerAvatar: "/images/avatars/sarah-wilson-2.jpg",
    rating: 5,
    date: "Nov 15, 2023",
    comment: "Sarah did an outstanding job with our kitchen renovation. Her attention to detail and professionalism were exceptional. Would highly recommend her services to anyone looking for quality work.",
    category: "Home Improvement",
  },
  {
    id: "2",
    jobTitle: "Website Development",
    workerName: "Michael Chen",
    workerAvatar: "/images/avatars/michael-chen.jpg",
    rating: 5,
    date: "Nov 12, 2023",
    comment: "Michael delivered the project ahead of schedule and exceeded our expectations. His communication was clear throughout the process and he provided valuable suggestions for improvements.",
    category: "Web Development",
  },
  {
    id: "3",
    jobTitle: "Logo Design Project",
    workerName: "Emily Rodriguez",
    workerAvatar: "/images/avatars/emma-davis.jpg",
    rating: 4,
    date: "Nov 10, 2023",
    comment: "Emily created a beautiful logo that perfectly represents our brand. She was very receptive to feedback and made all requested revisions promptly.",
    category: "Graphic Design",
  },
  {
    id: "4",
    jobTitle: "Plumbing Repair",
    workerName: "David Wilson",
    workerAvatar: "/images/avatars/michael-chen.jpg",
    rating: 5,
    date: "Nov 8, 2023",
    comment: "David was professional, punctual, and solved our plumbing issue efficiently. He explained everything clearly and left the workspace spotless.",
    category: "Plumbing",
  },
];

// Review type definition
interface Review {
  id: string;
  jobTitle: string;
  workerName: string;
  workerAvatar: string;
  rating: number;
  date: string;
  comment: string;
  category: string;
}

export default function ReviewsGivenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter reviews based on active filter and search query
  const filteredReviews = reviewsData.filter((review) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "5-star" && review.rating === 5) ||
      (activeFilter === "4-up" && review.rating >= 4);

    const matchesSearch =
      review.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const totalReviews = reviewsData.length;
  const averageRating = (
    reviewsData.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  ).toFixed(1);
  
  // Calculate positive feedback percentage (4-5 stars)
  const positiveReviews = reviewsData.filter(review => review.rating >= 4).length;
  const positiveFeedbackPercentage = Math.round((positiveReviews / totalReviews) * 100);
  
  // Rating distribution
  const ratingCounts = Array(5).fill(0);
  reviewsData.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });
  
  // Calculate percentages for visualization
  const ratingPercentages = ratingCounts.map(
    (count) => Math.round((count / totalReviews) * 100)
  );

  // Prepare data for pie chart
  const pieChartData = [
    { name: "5 Stars", value: ratingCounts[4], color: "#e07a5f" },
    { name: "4 Stars", value: ratingCounts[3], color: "#3d7c74" },
    { name: "3 Stars", value: ratingCounts[2], color: "#2a3e4e" },
    { name: "2 Stars", value: ratingCounts[1], color: "#f2cc8f" },
    { name: "1 Star", value: ratingCounts[0], color: "#f4f1de" },
  ];

  return (
    <div className="w-full mt-6">
      {/* Page header - Simple, no filters */}
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Reviews Given</h1>

      {/* Stats Cards - 3 boxes layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Reviews */}
        <Card className="p-6 border-zinc-200">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-zinc-900">{totalReviews}</span>
            <span className="text-sm text-zinc-500 mt-1">Total Reviews</span>
          </div>
        </Card>

        {/* Average Rating */}
        <Card className="p-6 border-zinc-200">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-zinc-900">{averageRating}</span>
            <span className="text-sm text-zinc-500 mt-1">Average Rating</span>
          </div>
        </Card>

        {/* Positive Feedback */}
        <Card className="p-6 border-zinc-200">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-zinc-900">{positiveFeedbackPercentage}%</span>
            <span className="text-sm text-zinc-500 mt-1">Positive Feedback</span>
          </div>
        </Card>
      </div>

      {/* Rating Distribution - with pie chart and bars */}
      <Card className="p-6 border-zinc-200 mb-8">
        <h2 className="text-lg font-medium text-zinc-900 mb-6">Rating Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Pie Chart - Left side */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[250px]">
              <PieChart 
                data={pieChartData}
                innerRadius={40}
                outerRadius={80}
                height={200}
              />
            </div>
          </div>
          
          {/* Progress Bars - Right side */}
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-1">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-sm text-zinc-500">{ratingPercentages[5 - rating]}%</span>
                </div>
                <Progress value={ratingPercentages[5 - index]} className="h-2 bg-zinc-100" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search by worker or job title"
              className="pl-10 pr-4 border-zinc-200 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="ml-2 border-zinc-200"
            size="icon"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"}
            className={activeFilter === "all" ? "bg-zinc-900 text-white" : "border-zinc-200 text-zinc-800"}
            onClick={() => setActiveFilter("all")}
            size="sm"
          >
            All Reviews
          </Button>
          <Button 
            variant={activeFilter === "5-star" ? "default" : "outline"}
            className={activeFilter === "5-star" ? "bg-zinc-900 text-white" : "border-zinc-200 text-zinc-800"}
            onClick={() => setActiveFilter("5-star")}
            size="sm"
          >
            5★ Only
          </Button>
          <Button 
            variant={activeFilter === "4-up" ? "default" : "outline"}
            className={activeFilter === "4-up" ? "bg-zinc-900 text-white" : "border-zinc-200 text-zinc-800"}
            onClick={() => setActiveFilter("4-up")}
            size="sm"
          >
            4★ & Up
          </Button>
        </div>
      </div>

      {/* Review Cards - 2 per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-zinc-500">No reviews found matching your search criteria.</p>
            <Button
              variant="link"
              className="mt-2"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredReviews.length > 0 && (
        <div className="flex justify-between items-center mt-6 mb-8">
          <div className="text-sm text-zinc-500">
            Showing 1-{Math.min(4, filteredReviews.length)} of {totalReviews} reviews
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-zinc-200"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-zinc-200 bg-zinc-900 text-white hover:bg-zinc-800"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-zinc-200"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-zinc-200"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-zinc-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-zinc-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={review.workerAvatar}
              alt={review.workerName}
              size="md"
            />
            <div>
              <h3 className="text-base font-medium text-zinc-900">{review.workerName}</h3>
              <div className="flex items-center mt-1">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-zinc-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <span className="text-sm text-zinc-500">{review.date}</span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-md font-medium text-zinc-900 mb-2">{review.jobTitle}</h4>
          <p className="text-zinc-700 text-sm">{review.comment}</p>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <div className="flex items-center">
            <div className="bg-zinc-100 px-3 py-1 rounded-full text-xs font-medium text-zinc-800">
              {review.category}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-24 border-zinc-200">
            <LayoutGrid className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="h-8 border-zinc-200">
            <ExternalLink className="h-4 w-4" />
              View Job
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 