"use client";

import {
  Briefcase, 
  MessageSquare, 
  User, 
  DollarSign, 
  CheckCircle,
  Lightbulb,
  Star,
  Clock,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { RoleGuard } from "@/lib/role-guard";

export default function WorkerDashboard() {
  const { user } = useAuth();
  
  // Get first name for greeting
  const firstName = user?.first_name || 'there';

  return (
    <RoleGuard allowedRoles={['worker']}>
      <div className="min-h-screen bg-white py-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {firstName}</h1>
          <p className="text-zinc-500 mt-1">Here&apos;s your worker dashboard overview</p>
        </div>
        
        {/* Stats Overview - Worker Specific */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-5 border border-zinc-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-1">Active Bids</p>
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
                <p className="text-sm font-medium text-zinc-500 mb-1">Rating</p>
                <p className="text-2xl font-bold">4.9</p>
              </div>
              <Star className="w-6 h-6 text-zinc-900" />
            </div>
          </Card>
          
          <Card className="p-5 border border-zinc-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-1">Jobs Completed</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <CheckCircle className="w-6 h-6 text-zinc-900" />
            </div>
          </Card>
        </div>
        
        {/* Quick Actions - Worker Specific */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <Link 
            href="/dashboard/worker/jobs"
            className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
          >
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-zinc-900" />
            </div>
            <p className="font-medium text-zinc-900">Find Jobs</p>
          </Link>
          
          <Link 
            href="/dashboard/worker/jobs"
            className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
          >
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-zinc-900" />
            </div>
            <p className="font-medium text-zinc-900">My Bids</p>
          </Link>
          
          <Link 
            href="/dashboard/worker/earnings"
            className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center gap-3 text-center h-24"
          >
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-zinc-900" />
            </div>
            <p className="font-medium text-zinc-900">Earnings</p>
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
        </div>
        
        {/* Recent Activity & Job Status */}
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
                      <TrendingUp className="w-5 h-5 text-zinc-900" />
                    </div>
                    <div>
                      <div className="border-l border-zinc-200 pl-4">
                        <p className="font-medium">Bid Accepted:</p>
                        <p>Website Development</p>
                        <p className="text-sm text-zinc-500 mt-1">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-4 flex">
                    <div className="mr-4 bg-zinc-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-zinc-900" />
                    </div>
                    <div>
                      <div className="border-l border-zinc-200 pl-4">
                        <p className="font-medium">New Bid Submitted:</p>
                        <p>Logo Design</p>
                        <p className="text-sm text-zinc-500 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Active Projects */}
          <div>
            <Card className="border border-zinc-200">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-4">Active Projects</h2>
                
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <div className="flex items-start mb-1">
                      <Clock className="w-5 h-5 text-zinc-900 mr-2" /> 
                      <p className="font-medium">Website Development</p>
                    </div>
                    <div className="flex items-center ml-7 text-sm text-zinc-500">
                      <p>In Progress</p>
                    </div>
                    <div className="ml-7 text-sm text-zinc-500">
                      <p>Due: Tomorrow</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start mb-1">
                      <Briefcase className="w-5 h-5 text-zinc-900 mr-2" /> 
                      <p className="font-medium">Mobile App Design</p>
                    </div>
                    <div className="flex items-center ml-7 text-sm text-zinc-500">
                      <p>Starting Soon</p>
                    </div>
                    <div className="ml-7 text-sm text-zinc-500">
                      <p>Due: Next Week</p>
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
              <p className="text-zinc-600">Complete your profile and add a portfolio to increase your chances of winning bids. Clients are more likely to hire workers with detailed profiles and work samples.</p>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
} 