"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronRight,
  MapPin,
  Star,
  Briefcase,
  MessageSquare,
  Calendar,
  CheckSquare,
  Award,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { use } from "react";
import { workersAPI, WorkerDetail } from "@/lib/api";
import { RoleGuard } from "@/lib/role-guard";

export default function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // State management
  const [worker, setWorker] = useState<WorkerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load worker data on component mount
  useEffect(() => {
    loadWorkerData();
  }, [id]);

  const loadWorkerData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const workerData = await workersAPI.getWorkerDetail(id);
      setWorker(workerData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load worker details';
      setError(errorMessage);
      console.error('Error loading worker:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full pb-10 flex justify-center items-center min-h-[400px]">
          <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
        </div>
      </RoleGuard>
    );
  }

  // Error state
  if (error || !worker) {
    return (
      <RoleGuard allowedRoles={['client']}>
        <div className="w-full pb-10">
          <Alert className="bg-red-100 border-red-400 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Worker not found'}
            </AlertDescription>
          </Alert>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="w-full pb-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/dashboard" className="text-zinc-500 hover:text-zinc-700">
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
          <Link href="/dashboard/find-workers" className="text-zinc-500 hover:text-zinc-700">
            Find Workers
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-zinc-400" />
          <span className="text-zinc-900 font-medium">Worker Profile</span>
        </div>

        {/* Worker Profile Header */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={worker.image} 
                alt={worker.name} 
                fill
                className="object-cover"
              />
              {worker.verified && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900">{worker.name}</h1>
                  <p className="text-lg text-zinc-600">{worker.title}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="text-zinc-800 border-zinc-300" asChild>
                    <Link href={`/dashboard/messages?user=${worker.id}`}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Link>
                  </Button>
                  <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                    Hire Now
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-zinc-600">
                  <MapPin className="w-5 h-5 mr-2 text-zinc-400" />
                  <span>{worker.location}</span>
                </div>
                <div className="flex items-center text-zinc-600">
                  <Briefcase className="w-5 h-5 mr-2 text-zinc-400" />
                  <span>{worker.price}</span>
                </div>
                <div className="flex items-center text-zinc-600">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <span className="font-medium text-zinc-900">{worker.rating}</span>
                  <span className="text-zinc-500 ml-1">({worker.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-zinc-600">
                  <Calendar className="w-5 h-5 mr-2 text-zinc-400" />
                  <span>Joined {worker.joined}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-50">
                  <Shield className="w-3 h-3 mr-1" /> Verified
                </Badge>
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Award className="w-3 h-3 mr-1" /> Top Rated
                </Badge>
                <Badge variant={worker.availableNow ? "default" : "outline"} className={worker.availableNow ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-white text-zinc-700"}>
                  {worker.availableNow ? "Available Now" : "Unavailable"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="bg-zinc-100 grid w-full md:w-auto grid-cols-3 h-auto p-1">
            <TabsTrigger value="about" className="py-2">About</TabsTrigger>
            <TabsTrigger value="experience" className="py-2">Experience</TabsTrigger>
            <TabsTrigger value="reviews" className="py-2">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-4">About {worker.name}</h2>
                <p className="text-zinc-600">{worker.about}</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-zinc-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-zinc-100 border-zinc-200 text-zinc-800 font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-zinc-900 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {worker.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="bg-zinc-100 border-zinc-200 text-zinc-800 font-normal">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-zinc-900">Job Completion Rate</h3>
                    <span className="font-semibold text-zinc-900">{worker.completionRate}%</span>
                  </div>
                  <Progress value={worker.completionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-4">Education</h2>
                <div className="space-y-4">
                  {worker.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-zinc-200 pl-4 py-1">
                      <h3 className="font-medium text-zinc-900">{edu.degree}</h3>
                      <p className="text-zinc-600">{edu.institution}</p>
                      <p className="text-sm text-zinc-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">Certifications</h2>
                <div className="space-y-4">
                  {worker.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-zinc-900">{cert.name}</h3>
                        <p className="text-sm text-zinc-500">Obtained in {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-zinc-900">Client Reviews</h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="font-semibold text-lg text-zinc-900">{worker.rating}</span>
                    <span className="text-zinc-500 ml-1">({worker.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {worker.workHistory.map((job, index) => (
                    <div key={index} className="border-b border-zinc-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-zinc-900">{job.jobTitle}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium text-zinc-900">{job.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 mb-3">
                        <span className="font-medium">{job.clientName}</span> • {job.date}
                      </p>
                      <p className="text-zinc-600">{job.review}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  );
} 