"use client";

import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Lock,
  Upload,
  Check,
  LogOut
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { LogoutDialog } from "@/components/common/LogoutDialog";

// Mock user data - in a real app, this would come from an API or database
const userData = {
  name: "John Anderson",
  role: "Professional Worker",
  location: "New York, United States",
  verified: true,
  profileCompletion: 85,
  email: "john.anderson@example.com",
  phone: "+1 (555) 123-4567",
  languages: ["English", "Spanish"],
  skills: ["Electrical Installation", "Circuit Repair", "Safety Inspection", "Emergency Response"],
  experience: "8+ years of professional experience",
  rating: 4.9,
  documents: [
    { 
      type: "National ID", 
      status: "verified", 
      uploadDate: "Jan 15, 2024" 
    },
    { 
      type: "Professional License", 
      status: "pending", 
      uploadDate: "Jan 20, 2024" 
    },
    { 
      type: "Address Proof", 
      status: "rejected", 
      uploadDate: "", 
      message: "Please upload a recent utility bill" 
    }
  ]
};

export default function ProfilePage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  return (
    <div className="py-6">
      {/* Profile Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-100 overflow-hidden">
              <Image 
                src="/images/user2.jpg" 
                alt={userData.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="mt-3 w-full bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-0"
            >
              Edit Photo
            </Button>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 md:mt-0 mt-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">{userData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-zinc-100 text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full border border-transparent">
                    {userData.role}
                  </span>
                  {userData.verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-transparent flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                Edit Profile
              </Button>
            </div>
            
            <div className="mt-4 flex items-center text-zinc-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{userData.location}</span>
            </div>
            
            {/* Profile Completion Progress */}
            <div className="mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">{userData.profileCompletion}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div 
                  className="bg-zinc-900 h-2 rounded-full" 
                  style={{ width: `${userData.profileCompletion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">{userData.email}</span>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">{userData.phone}</span>
              </div>
              
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">Languages: {userData.languages.join(", ")}</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Skills Section */}
            <h3 className="text-lg font-medium mb-3">Skills & Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-zinc-100 text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Experience */}
            <h3 className="text-lg font-medium mb-3">Experience</h3>
            <div className="flex items-start">
              <Briefcase className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
              <span className="text-zinc-600">{userData.experience}</span>
            </div>
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Rating */}
            <h3 className="text-lg font-medium mb-3">Rating</h3>
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.round(userData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-300'}`} 
                  />
                ))}
              </div>
              <span className="text-zinc-600">({userData.rating} / 5.0)</span>
            </div>
          </div>
        </Card>
        
        {/* Document Verification */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Document Verification</h2>
            
            <div className="space-y-4">
              {userData.documents.map((doc, index) => (
                <div 
                  key={index}
                  className="border border-zinc-200 rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{doc.type}</h3>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${doc.status === 'verified' ? 'bg-green-100 text-green-800' : 
                         doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                         'bg-red-100 text-red-800'}
                    `}>
                      {doc.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {doc.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {doc.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                  
                  {doc.uploadDate && (
                    <p className="text-sm text-zinc-500 mt-1">
                      Uploaded on {doc.uploadDate}
                    </p>
                  )}
                  
                  {doc.message && (
                    <p className="text-sm text-zinc-500 mt-1">
                      {doc.message}
                    </p>
                  )}
                </div>
              ))}
              
              <Button className="w-full mt-4 bg-zinc-900 hover:bg-zinc-800">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Profile Settings */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Profile Visibility</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-zinc-500">
                  Make your profile visible to potential clients
                </p>
              </div>
              
              <div className="border-t border-zinc-200 my-4"></div>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download Profile PDF
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              
              <div className="border-t border-zinc-200 my-4"></div>
              
              <div className="bg-zinc-100 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Account Status</h3>
                <p className="text-sm text-zinc-600">
                  Your account is fully verified and active. You can now receive job requests.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Logout Dialog */}
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </div>
  );
} 