"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import { use } from "react";

// Mock worker data - in a real application, this would be fetched from an API
const workers = [
  {
    id: 1,
    name: "Ahmed Khan",
    title: "Professional Plumber",
    occupation: "Plumber",
    rating: 4.8,
    reviews: 124,
    location: "Gulberg, Lahore",
    price: "PKR 1,200/hr",
    availableNow: true,
    verified: true,
    skills: ["Pipe Fitting", "Leak Repair", "Bathroom Installation", "Water Heater Installation", "Drain Cleaning"],
    completionRate: 98,
    joined: "Aug 2020",
    about: "I am a licensed plumber with over 8 years of experience in residential and commercial plumbing. I specialize in fixture installations, pipe repairs, and emergency plumbing services. My goal is to provide high-quality, reliable service with fair pricing.",
    education: [
      { degree: "Diploma in Plumbing", institution: "Technical Training Institute, Lahore", year: "2015-2017" }
    ],
    certifications: [
      { name: "Licensed Plumber - Punjab Municipal Authority", year: "2017" },
      { name: "Advanced Water Heating Systems Certification", year: "2019" }
    ],
    languages: ["Urdu", "Punjabi", "English"],
    workHistory: [
      { 
        jobTitle: "Bathroom Renovation", 
        clientName: "Residential Client", 
        rating: 5.0, 
        review: "Ahmed did an excellent job with our bathroom renovation. He was punctual, professional, and completed the work ahead of schedule. Highly recommend!",
        date: "June 2023"
      },
      { 
        jobTitle: "Kitchen Sink Replacement", 
        clientName: "Commercial Client", 
        rating: 4.5, 
        review: "Very professional and knowledgeable. Completed the job within budget and with high quality.",
        date: "April 2023"
      },
      { 
        jobTitle: "Water Heater Installation", 
        clientName: "Residential Client", 
        rating: 5.0, 
        review: "Ahmed was very thorough and explained everything clearly. The installation was done perfectly and he even helped with some additional minor issues at no extra cost.",
        date: "February 2023"
      }
    ],
    image: "/images/user1.jpg"
  },
  {
    id: 2,
    name: "Fatima Ali",
    title: "Expert House Cleaner",
    occupation: "House Cleaner",
    rating: 4.9,
    reviews: 89,
    location: "DHA Phase 5, Lahore",
    price: "PKR 1,000/hr",
    availableNow: true,
    verified: true,
    skills: ["Deep Cleaning", "Carpet Cleaning", "Window Cleaning", "Disinfection", "Post-Construction Cleaning"],
    completionRate: 100,
    joined: "Mar 2021",
    about: "I am a detail-oriented house cleaner with expertise in deep cleaning and organizing. I use eco-friendly products and efficient techniques to transform any space into a clean, healthy environment.",
    education: [
      { degree: "Certificate in Professional Cleaning", institution: "Vocational Training Institute, Lahore", year: "2020" }
    ],
    certifications: [
      { name: "Certified Professional Cleaner", year: "2020" },
      { name: "Eco-Friendly Cleaning Methods Certification", year: "2021" }
    ],
    languages: ["Urdu", "Punjabi", "English"],
    workHistory: [
      { 
        jobTitle: "Deep House Cleaning", 
        clientName: "Residential Client", 
        rating: 5.0, 
        review: "Fatima is exceptional! She went above and beyond with our house cleaning. Very thorough and professional.",
        date: "July 2023"
      },
      { 
        jobTitle: "Post-Construction Clean-up", 
        clientName: "Contractor", 
        rating: 4.8, 
        review: "Great job cleaning up after our renovation project. The place was spotless.",
        date: "May 2023"
      },
      { 
        jobTitle: "Regular Weekly Cleaning", 
        clientName: "Residential Client", 
        rating: 5.0, 
        review: "Fatima has been cleaning our home weekly for 6 months. She is reliable, trustworthy, and does an amazing job every time.",
        date: "Ongoing"
      }
    ],
    image: "/images/user2.jpg"
  },
  {
    id: 3,
    name: "Usman Ahmed",
    title: "Certified Electrician",
    occupation: "Electrician",
    rating: 4.7,
    reviews: 56,
    location: "Johar Town, Lahore",
    price: "PKR 1,500/hr",
    availableNow: false,
    verified: true,
    skills: ["Circuit Installation", "Wiring", "Lighting Setup", "Electrical Repairs", "Safety Inspections"],
    completionRate: 95,
    joined: "Jan 2020",
    about: "Licensed electrician with 5+ years of experience in residential and commercial electrical work. I specialize in troubleshooting, installations, and remodeling projects. Safety and quality are my top priorities.",
    education: [
      { degree: "Diploma in Electrical Engineering", institution: "Punjab Technical College", year: "2015-2018" }
    ],
    certifications: [
      { name: "Licensed Electrician - Punjab Electrical Board", year: "2018" },
      { name: "Electrical Safety Certification", year: "2019" }
    ],
    languages: ["Urdu", "English"],
    workHistory: [
      { 
        jobTitle: "Home Rewiring Project", 
        clientName: "Residential Client", 
        rating: 4.5, 
        review: "Usman did a great job rewiring our older home. He was knowledgeable and took the time to explain what he was doing.",
        date: "May 2023"
      },
      { 
        jobTitle: "Office Lighting Installation", 
        clientName: "Business Owner", 
        rating: 5.0, 
        review: "Excellent work installing new lighting in our office space. Very professional and clean work.",
        date: "March 2023"
      },
      { 
        jobTitle: "Electrical Troubleshooting", 
        clientName: "Residential Client", 
        rating: 4.8, 
        review: "Usman quickly identified and fixed the electrical issue we were having. Fair pricing and great service.",
        date: "January 2023"
      }
    ],
    image: "/images/user3.jpg"
  }
];

export default function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // In a real application, you would fetch the worker data based on the ID
  const { id } = use(params);
  const workerId = parseInt(id);
  const worker = workers.find(w => w.id === workerId) || workers[0];

  return (
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
  );
} 