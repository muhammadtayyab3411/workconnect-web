"use client";

import { RoleGuard } from "@/lib/role-guard";

export default function FindJobsPage() {
  return (
    <RoleGuard allowedRoles={['worker']}>
      <div className="min-h-screen bg-white py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">Find Jobs</h1>
          <p className="text-zinc-500 mt-1">Browse available jobs and submit your bids</p>
        </div>
        
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
          <p className="text-zinc-600">
            This is the find jobs page for workers. Here you can browse available job postings and submit your bids.
          </p>
        </div>
      </div>
    </RoleGuard>
  );
} 