"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { RoleGuard } from "@/lib/role-guard";
import { workersAPI, Worker, WorkerCategory } from "@/lib/api";

export default function BrowseWorkersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string | undefined>(undefined);
  const [selectedAvailability, setSelectedAvailability] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  
  // API state
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [categories, setCategories] = useState<WorkerCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Load workers on component mount and when filters change
  useEffect(() => {
    loadWorkers();
  }, [searchQuery, selectedCategory, selectedLocation, showVerifiedOnly, selectedRating, selectedAvailability, sortBy]);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
        location: selectedLocation || undefined,
        verified_only: showVerifiedOnly || undefined,
        min_rating: selectedRating || undefined,
        available_only: selectedAvailability === "available" || undefined,
        sort_by: sortBy || undefined,
      };

      const response = await workersAPI.getWorkers(filters);
      setWorkers(response.workers);
      setCategories(response.categories);
      setTotalCount(response.total_count);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load workers';
      setError(errorMessage);
      console.error('Error loading workers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter workers (now done on backend, but keeping for UI consistency)
  const filteredWorkers = workers;

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
              {totalCount} workers available in your area
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
                  {category.icon === 'Wrench' && <Wrench />}
                  {category.icon === 'Truck' && <Truck />}
                  {category.icon === 'HardHat' && <HardHat />}
                  {category.icon === 'Paintbrush' && <Paintbrush />}
                  {category.icon === 'Cable' && <Cable />}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-zinc-500">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10">
              <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <Alert className="bg-red-100 border-red-400 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          ) : filteredWorkers.length > 0 ? (
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