"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Search,
  MapPin,
  Star,
  MessageSquare,
  Heart,
  Clock,
  CheckCircle,
  Shield,
  Wrench,
  Truck,
  HardHat,
  Paintbrush,
  Cable,
} from "lucide-react";
import { RoleGuard } from "@/lib/role-guard";

// Mock worker data
const workers = [
  {
    id: 1,
    name: "Michael Anderson",
    occupation: "Electrician",
    rating: 4.8,
    reviews: 35,
    location: "San Francisco, CA",
    price: "$45/hr",
    availableNow: true,
    verified: true,
    backgroundCheck: true,
    skills: ["Wiring", "Installation", "Maintenance"],
    bio: "Certified electrician with 8+ years of experience in residential and commercial installations.",
    image: "/images/pricing/profiles/sarah-profile.jpg"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    occupation: "Plumber",
    rating: 4.9,
    reviews: 42,
    location: "Los Angeles, CA",
    price: "$55/hr",
    availableNow: true,
    verified: true,
    backgroundCheck: true,
    skills: ["Emergency Repair", "Installation", "Renovation"],
    bio: "Master plumber specializing in emergency repairs and bathroom renovations.",
    image: "/images/user2.jpg"
  },
  {
    id: 3,
    name: "David Wilson",
    occupation: "Construction Worker",
    rating: 4.7,
    reviews: 28,
    location: "Chicago, IL",
    price: "$38/hr",
    availableNow: false,
    verified: true,
    backgroundCheck: false,
    skills: ["Carpentry", "Framing", "Renovation"],
    bio: "Experienced in residential construction with focus on sustainable building practices.",
    image: "/images/user3.jpg"
  },
  {
    id: 4,
    name: "Emily Brown",
    occupation: "Painter",
    rating: 4.6,
    reviews: 31,
    location: "Seattle, WA",
    price: "$35/hr",
    availableNow: true,
    verified: true,
    backgroundCheck: true,
    skills: ["Interior", "Exterior", "Decorative"],
    bio: "Professional painter with expertise in interior and exterior painting.",
    image: "/images/user4.jpg"
  },
  {
    id: 5,
    name: "James Martinez",
    occupation: "Driver",
    rating: 4.9,
    reviews: 56,
    location: "Miami, FL",
    price: "$30/hr",
    availableNow: false,
    verified: true,
    backgroundCheck: true,
    skills: ["Commercial", "Delivery", "Transport"],
    bio: "Professional driver with clean record and experience in various vehicle types.",
    image: "/images/avatars/sarah-wilson-large.jpg"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    occupation: "Electrician",
    rating: 4.7,
    reviews: 39,
    location: "Austin, TX",
    price: "$48/hr",
    availableNow: true,
    verified: true,
    backgroundCheck: true,
    skills: ["Smart Home", "Repairs", "Upgrades"],
    bio: "Specialized in smart home installations and electrical system upgrades.",
    image: "/images/testimonials/sarah-johnson.jpg"
  }
];

// Category data with counts
const categories = [
  { name: "Plumbing", count: 45, icon: <Wrench /> },
  { name: "Driving", count: 78, icon: <Truck /> },
  { name: "Construction", count: 56, icon: <HardHat /> },
  { name: "Painting", count: 34, icon: <Paintbrush /> },
  { name: "Electrical", count: 67, icon: <Cable /> }
];

export default function BrowseWorkersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string | undefined>(undefined);
  const [selectedAvailability, setSelectedAvailability] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);

  // Filter workers based on search and filters
  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = searchQuery === "" || 
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || worker.occupation.includes(selectedCategory);
    const matchesLocation = !selectedLocation || worker.location.includes(selectedLocation);
    const matchesVerified = !showVerifiedOnly || worker.verified;
    const matchesRating = !selectedRating || worker.rating >= parseFloat(selectedRating);
    const matchesAvailability = !selectedAvailability || 
      (selectedAvailability === "available" ? worker.availableNow : true);
    
    return matchesSearch && matchesCategory && matchesLocation && 
           matchesVerified && matchesRating && matchesAvailability;
  });

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="max-w-[1200px] mx-auto px-4 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Browse Workers</h1>
            <p className="text-zinc-500 mt-2">
              Find skilled local workers by category, location, rating, and
              availability.
            </p>
          </div>
        </div>

        {/* Main Search Bar */}
        <div className="relative my-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search workers by name, skill, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-1 h-12 border-zinc-300 rounded-md focus-visible:ring-zinc-400"
          />
        </div>

        {/* Filter Section */}
        <div className="bg-zinc-50 p-4 rounded-lg flex flex-wrap gap-3 mb-8">
          <div className="relative">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[160px] bg-white border-zinc-300 h-10">
                <div className="flex items-center">
                  <span className="text-sm">Select Category</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electrician">Electrician</SelectItem>
                <SelectItem value="Plumber">Plumber</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Painter">Painter</SelectItem>
                <SelectItem value="Driver">Driver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              className="h-10 bg-white border-zinc-300 px-4 flex items-center gap-2"
              onClick={() =>
                setSelectedLocation(
                  selectedLocation ? undefined : "San Francisco"
                )
              }
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{selectedLocation || "Location"}</span>
            </Button>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              className={`h-10 ${
                selectedAvailability ? "bg-zinc-900 text-white" : "bg-white"
              } border-zinc-300 px-4 flex items-center gap-2`}
              onClick={() =>
                setSelectedAvailability(
                  selectedAvailability ? undefined : "available"
                )
              }
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">Availability</span>
            </Button>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              className={`h-10 ${
                selectedRating ? "bg-zinc-900 text-white" : "bg-white"
              } border-zinc-300 px-4 flex items-center gap-2`}
              onClick={() =>
                setSelectedRating(selectedRating ? undefined : "4.5")
              }
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">Rating</span>
            </Button>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              className={`h-10 ${
                showVerifiedOnly ? "bg-zinc-900 text-white" : "bg-white"
              } border-zinc-300 px-4 flex items-center gap-2`}
              onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">Verified Only</span>
            </Button>
          </div>

          <div className="relative">
            <Select value={sortBy} onValueChange={setSortBy} disabled>
              <SelectTrigger className="w-full md:w-[160px] bg-white border-zinc-300 h-10">
                <div className="flex items-center">
                  <span className="text-sm">Sort By</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Sections and Worker Count */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Available Workers
            </h2>
            <p className="text-zinc-500 text-sm">
              {filteredWorkers.length} workers available in your area
            </p>
          </div>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="p-2 rounded-lg cursor-pointer text-zinc-600 hover:text-zinc-900">
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-zinc-500">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <Card
                key={worker.id}
                className="border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <CardContent className="p-6 py-2 flex-1">
                  <div className="flex gap-4 mb-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <Image
                        src={worker.image}
                        alt={worker.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900">
                        {worker.name}
                      </h3>
                      <p className="text-sm text-zinc-600">{worker.occupation}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        <p className="text-xs text-zinc-500">
                          {worker.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 mb-4 mt-4">{worker.bio}</p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-zinc-100 text-zinc-800 font-bold text-xs hover:bg-zinc-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-start gap-3 items-center mt-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-zinc-900" />
                      <span className="font-medium text-zinc-900">
                        {worker.rating}
                      </span>
                      <span className="text-zinc-500 text-sm">
                        ({worker.reviews} reviews)
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-zinc-900">
                      {worker.price}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    {worker.verified && (
                      <div className="flex items-center gap-1 text-xs text-zinc-700 border border-zinc-200 rounded-md px-2 py-1 ">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Verified</span>
                      </div>
                    )}
                    {worker.backgroundCheck && (
                      <div className="flex items-center gap-1 text-xs text-zinc-700 border border-zinc-200 rounded-md px-2 py-1 ">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span>Background Check</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between gap-3 mt-auto">
                  <Button
                    className="bg-zinc-900 hover:bg-zinc-800 text-white flex-1"
                    asChild
                  >
                    <Link href={`/dashboard/worker/${worker.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-300 bg-white"
                      asChild
                    >
                      <Link href={`/dashboard/messages?user=${worker.id}`}>
                        <MessageSquare className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-300 bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-zinc-500">
                No workers found matching your criteria.
              </p>
              <p className="text-zinc-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
} 