"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  DollarSign, 
  Calendar, 
  Clock, 
  Upload, 
  ChevronLeft,
  MapPin
} from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PlaceBidPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [bidData, setBidData] = useState({
    price: "",
    availability: "",
    proposal: "",
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [workSamples, setWorkSamples] = useState<File[]>([]);
  
  // Mock job data
  const jobData = {
    id: id,
    title: "Emergency Plumbing Repair - Downtown Area",
    client: {
      name: "Sarah Johnson",
      avatar: "/images/place-bid/client-avatar.jpg",
    },
    location: "San Francisco, CA",
    category: "Plumbing",
    status: "Open for Bids",
    description: "Looking for an experienced plumber to fix a major leak in the kitchen. The issue requires immediate attention as it's affecting the cabinet structure.",
    requirements: [
      "Licensed plumber",
      "5+ years of experience",
      "Own tools and equipment",
      "Available for emergency work"
    ],
    timing: {
      neededWithin: "24 hours",
      estimatedTime: "4-6 hours"
    },
    budget: {
      min: 200,
      max: 400,
      note: "Based on job complexity"
    },
    match: {
      overall: 85,
      skills: 90,
      experience: 85,
      location: 80
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBidData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleWorkSampleUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0]; // Take only the first file for simplicity
      
      // Create a copy of the current work samples array
      const updatedWorkSamples = [...workSamples];
      
      // If there's a file already at this index, replace it, otherwise add it
      if (updatedWorkSamples[index]) {
        updatedWorkSamples[index] = newFile;
      } else {
        // Add nulls for any missing indexes up to the current one
        while (updatedWorkSamples.length < index) {
          updatedWorkSamples.push(null as unknown as File);
        }
        updatedWorkSamples.push(newFile);
      }
      
      setWorkSamples(updatedWorkSamples);
    }
  };
  
  const removeWorkSample = (index: number) => {
    const updatedWorkSamples = [...workSamples];
    updatedWorkSamples[index] = null as unknown as File;
    setWorkSamples(updatedWorkSamples);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out any null entries in workSamples before submitting
    const filteredWorkSamples = workSamples.filter(sample => sample !== null);
    
    console.log("Submitting bid:", { id: id, bidData, files, workSamples: filteredWorkSamples });
    // Here you would send the data to your API
    // Then redirect to a confirmation page or back to the job listing
    router.push(`/dashboard/worker/jobs/${id}/bid/success`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header userName="John Doe" />
      
      <main className="flex-1 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          <div className="mb-4">
            <div className="flex items-center text-sm text-zinc-600">
              <Link href="/dashboard/worker/jobs" className="flex items-center hover:text-zinc-900">
                <Image 
                  src="/images/place-bid/home-icon.svg" 
                  alt="Home" 
                  width={16} 
                  height={16} 
                />
                <span className="ml-1">Jobs</span>
              </Link>
              <ChevronLeft className="mx-1 h-4 w-4 rotate-180" />
              <Link href={`/dashboard/worker/jobs/${id}`} className="hover:text-zinc-900">
                Plumbing Repair Project
              </Link>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">{jobData.title}</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image 
                  src={jobData.client.avatar} 
                  alt={jobData.client.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-zinc-900">{jobData.client.name}</p>
                <div className="flex items-center text-sm text-zinc-600">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {jobData.location}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-100 text-zinc-900">
                {jobData.category}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-900 text-white">
                {jobData.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Form Column */}
            <div className="md:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Your Bid Details</h2>
                <p className="text-zinc-500 mb-6">Please provide the details of your proposal</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-zinc-900">
                      Proposed Price
                    </label>
                    <div className="flex">
                      <div className="bg-zinc-100 flex items-center justify-center px-3 rounded-l-md border border-r-0 border-zinc-200">
                        <DollarSign className="h-4 w-4 text-zinc-500" />
                      </div>
                      <Input
                        id="price"
                        name="price"
                        type="text"
                        placeholder="Enter your price"
                        value={bidData.price}
                        onChange={handleChange}
                        className="rounded-l-none border-zinc-200"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="availability" className="block text-sm font-medium text-zinc-900">
                      Availability
                    </label>
                    <div className="flex">
                      <div className="bg-zinc-100 flex items-center justify-center px-3 rounded-l-md border border-r-0 border-zinc-200">
                        <Calendar className="h-4 w-4 text-zinc-500" />
                      </div>
                      <Input
                        id="availability"
                        name="availability"
                        type="text"
                        placeholder="When can you start?"
                        value={bidData.availability}
                        onChange={handleChange}
                        className="rounded-l-none border-zinc-200"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="proposal" className="block text-sm font-medium text-zinc-900">
                      Proposal
                    </label>
                    <Textarea
                      id="proposal"
                      name="proposal"
                      rows={6}
                      placeholder="Describe your experience and why you're the best fit for this job"
                      value={bidData.proposal}
                      onChange={handleChange}
                      className="border-zinc-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-900">
                      Attachments
                    </label>
                    <div className="border-2 border-dashed border-zinc-200 rounded-md p-6 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-zinc-400 mb-2" />
                        <Button
                          type="button"
                          variant="outline"
                          className="mb-2 bg-zinc-100 border-0"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Upload Files
                        </Button>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <p className="text-sm text-zinc-500">
                          Upload work samples or certifications
                        </p>
                      </div>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center p-2 bg-zinc-50 rounded-md">
                            <div className="flex-1 truncate">{file.name}</div>
                            <button
                              type="button"
                              className="text-zinc-500 hover:text-zinc-700"
                              onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                    Submit Bid
                  </Button>
                </form>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Showcase Your Work</h2>
                <p className="text-zinc-500 mb-6">Add photos of your previous similar work</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Four upload areas, each with the same dimensions and styling */}
                  {Array.from({ length: 4 }).map((_, index) => {
                    const hasSample = workSamples[index] !== undefined && workSamples[index] !== null;
                    
                    return (
                      <div 
                        key={index}
                        className="relative aspect-square bg-zinc-100 border border-zinc-200 rounded-md overflow-hidden"
                      >
                        {hasSample ? (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-xs text-zinc-500 truncate p-2">
                                {workSamples[index].name}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white rounded-full p-1 text-zinc-500 hover:text-zinc-700"
                              onClick={() => removeWorkSample(index)}
                            >
                              &times;
                            </button>
                          </>
                        ) : (
                          <div 
                            className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-zinc-50"
                            onClick={() => document.getElementById(`work-sample-upload-${index}`)?.click()}
                          >
                            <Upload className="h-6 w-6 text-zinc-400 mb-2" />
                            <input
                              id={`work-sample-upload-${index}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleWorkSampleUpload(e, index)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            {/* Sidebar Column */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Job Overview</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-2">Description</h3>
                    <p className="text-zinc-600">{jobData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-2">Requirements</h3>
                    <ul className="space-y-2">
                      {jobData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 mt-2 mr-2 bg-zinc-600 rounded-full flex-shrink-0" />
                          <span className="text-zinc-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-zinc-900 mr-2" />
                      <p className="text-zinc-900">Needed within {jobData.timing.neededWithin}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-zinc-900 mr-2" />
                      <p className="text-zinc-900">{jobData.timing.estimatedTime} estimated</p>
                    </div>
                  </div>
                  
                  <hr className="border-zinc-200" />
                  
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-2">Budget Range</h3>
                    <p className="text-lg font-semibold text-zinc-900">${jobData.budget.min} - ${jobData.budget.max}</p>
                    <p className="text-zinc-500 text-sm">{jobData.budget.note}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Job Match</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-zinc-900">Strong Match</h3>
                    <p className="font-bold text-2xl text-zinc-900">{jobData.match.overall}%</p>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-zinc-900 rounded-full" 
                      style={{ width: `${jobData.match.overall}%` }}
                    />
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <p className="text-zinc-900">Skills Match</p>
                      <p className="text-zinc-900">{jobData.match.skills}%</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-zinc-900">Experience Level</p>
                      <p className="text-zinc-900">{jobData.match.experience}%</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-zinc-900">Location Match</p>
                      <p className="text-zinc-900">{jobData.match.location}%</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Bidding Tips</h2>
                
                <ul className="space-y-2">
                  {[
                    "Be clear about your availability",
                    "Highlight relevant experience",
                    "Include your license number",
                    "Be specific about your pricing"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 bg-zinc-600 rounded-full flex-shrink-0" />
                      <span className="text-zinc-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-zinc-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-500 text-sm">
            © 2024 WorkPlace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 