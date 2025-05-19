import {
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  Settings,
  DollarSign, 
  PercentIcon,
  CheckCircle,
  Lightbulb
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// This is a mock of user data that would normally come from an authenticated session
const userData = {
  name: "Alex",
  role: "worker" as const, // or "client"
};

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-white py-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {userData.name}</h1>
        <p className="text-zinc-500 mt-1">Here&apos;s your dashboard overview</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Active Jobs</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Briefcase className="w-6 h-6 text-zinc-900" />
          </div>
        </Card>
        
        <Card className="p-5 border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold">$2,450</p>
            </div>
            <DollarSign className="w-6 h-6 text-zinc-900" />
          </div>
        </Card>
        
        <Card className="p-5 border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Success Rate</p>
              <p className="text-2xl font-bold">98%</p>
            </div>
            <PercentIcon className="w-6 h-6 text-zinc-900" />
          </div>
          <div className="w-full bg-zinc-900 h-2 mt-2 rounded"></div>
        </Card>
        
        <Card className="p-5 border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">New Messages</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <MessageSquare className="w-6 h-6 text-zinc-900" />
          </div>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Link 
          href="/dashboard/find-jobs"
          className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
        >
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-zinc-900" />
          </div>
          <p className="font-medium text-zinc-900">Find Jobs</p>
        </Link>
        
        <Link 
          href="/dashboard/post-job"
          className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
        >
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-zinc-900" />
          </div>
          <p className="font-medium text-zinc-900">Post a Job</p>
        </Link>
        
        <Link 
          href="/dashboard/messages"
          className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
        >
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-zinc-900" />
          </div>
          <p className="font-medium text-zinc-900">Messages</p>
        </Link>
        
        <Link 
          href="/dashboard/profile"
          className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
        >
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <User className="w-5 h-5 text-zinc-900" />
          </div>
          <p className="font-medium text-zinc-900">My Profile</p>
        </Link>
        
        <Link 
          href="/dashboard/settings"
          className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
        >
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-zinc-900" />
          </div>
          <p className="font-medium text-zinc-900">Settings</p>
        </Link>
      </div>
      
      {/* Recent Activity & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border border-zinc-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Recent Activity</h2>
              
              <div className="divide-y divide-zinc-100">
                <div className="py-4 flex">
                  <div className="mr-4 bg-zinc-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-zinc-900" />
                  </div>
                  <div>
                    <div className="border-l border-zinc-200 pl-4">
                      <p className="font-medium">Job Completed:</p>
                      <p>Home Renovation</p>
                      <p className="text-sm text-zinc-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-4 flex">
                  <div className="mr-4 bg-zinc-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5 text-zinc-900" />
                  </div>
                  <div>
                    <div className="border-l border-zinc-200 pl-4">
                      <p className="font-medium">Payment Received:</p>
                      <p>$350</p>
                      <p className="text-sm text-zinc-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-4 flex">
                  <div className="mr-4 bg-zinc-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-zinc-900" />
                  </div>
                  <div>
                    <div className="border-l border-zinc-200 pl-4">
                      <p className="font-medium">New Message from John Smith</p>
                      <p className="text-sm text-zinc-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Appointments */}
        <div>
          <Card className="border border-zinc-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Upcoming Appointments</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="flex items-start mb-1">
                    <Briefcase className="w-5 h-5 text-zinc-900 mr-2" /> 
                    <p className="font-medium">Plumbing Repair</p>
                  </div>
                  <div className="flex items-center ml-7 text-sm text-zinc-500">
                    <p>Today, 2:00 PM</p>
                  </div>
                  <div className="ml-7 text-sm text-zinc-500">
                    <p>with Sarah Wilson</p>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-start mb-1">
                    <Briefcase className="w-5 h-5 text-zinc-900 mr-2" /> 
                    <p className="font-medium">Electrical Installation</p>
                  </div>
                  <div className="flex items-center ml-7 text-sm text-zinc-500">
                    <p>Tomorrow, 10:00 AM</p>
                  </div>
                  <div className="ml-7 text-sm text-zinc-500">
                    <p>with Mike Brown</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Pro Tip */}
      <div className="bg-zinc-100 rounded-lg p-5">
        <div className="flex">
          <div className="bg-zinc-900 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0 self-center">
            <div className="w-6 h-6 text-white flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-1">Pro Tip</p>
            <p className="text-zinc-600">Complete your profile to increase your visibility to potential clients. Add your skills, experience, and portfolio to stand out from the crowd.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 