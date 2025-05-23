"use client";

import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Lock,
  Check,
  LogOut,
  Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { LogoutDialog } from "@/components/common/LogoutDialog";
import { useAuth } from "@/lib/auth-context";
import { userAPI, UserProfile } from "@/lib/api";

export default function ProfilePage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getProfile();
        setProfileData(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data');
        // Fallback to auth context user if API fails
        if (user) {
          setProfileData(user as UserProfile);
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we don't have user data from auth context
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Calculate profile completion percentage
  const calculateProfileCompletion = (profile: UserProfile) => {
    const fields = [
      profile.first_name,
      profile.last_name,
      profile.email,
      profile.phone_number,
      profile.address,
      profile.profile_picture,
    ];
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-600" />
          <span className="text-zinc-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <XCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Failed to Load Profile</h2>
          <p className="text-zinc-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const profile = profileData || user;
  if (!profile) return null;

  const profileCompletion = calculateProfileCompletion(profile as UserProfile);
  const profilePictureUrl = profile.profile_picture || "/images/user2.jpg";
  
  return (
    <div className="py-6">
      {/* Profile Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-100 overflow-hidden">
              <Image 
                src={profilePictureUrl}
                alt={profile.full_name || `${profile.first_name} ${profile.last_name}`}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="mt-3 w-full bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-0"
              onClick={() => {
                // Navigate to settings page
                window.location.href = '/dashboard/settings';
              }}
            >
              Edit Photo
            </Button>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 md:mt-0 mt-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">
                  {profile.full_name || `${profile.first_name} ${profile.last_name}`}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-zinc-100 text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full border border-transparent capitalize">
                    {profile.role}
                  </span>
                  {profile.is_verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-transparent flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <Button 
                className="bg-zinc-900 hover:bg-zinc-800 text-white"
                onClick={() => {
                  window.location.href = '/dashboard/settings';
                }}
              >
                Edit Profile
              </Button>
            </div>
            
            {profile.address && (
              <div className="mt-4 flex items-center text-zinc-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{profile.address}</span>
              </div>
            )}
            
            {/* Profile Completion Progress */}
            <div className="mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div 
                  className="bg-zinc-900 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${profileCompletion}%` }}
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
                <span className="text-zinc-600">{profile.email}</span>
              </div>
              
              {profile.phone_number && (
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                  <span className="text-zinc-600">{profile.phone_number}</span>
                </div>
              )}
              
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">Role: {profile.role}</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Member Since */}
            <h3 className="text-lg font-medium mb-3">Member Since</h3>
            <div className="flex items-start">
              <Briefcase className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
              <span className="text-zinc-600">
                {new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
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
                  Make your profile visible to potential {profile.role === 'worker' ? 'clients' : 'workers'}
                </p>
              </div>
              
              <div className="border-t border-zinc-200 my-4"></div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => {
                  window.location.href = '/dashboard/settings';
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Edit Profile Details
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
                  Your account is {profile.is_verified ? 'fully verified and active' : 'pending verification'}. 
                  {profile.is_verified 
                    ? profile.role === 'worker' 
                      ? ' You can now receive job requests.' 
                      : ' You can now post jobs and hire workers.'
                    : ' Please verify your email to access all features.'
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Account Information */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-700">Account Type</span>
                <span className="text-sm text-zinc-600 capitalize">{profile.role}</span>
              </div>
              
              <div className="h-px bg-zinc-100"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-700">Email Verified</span>
                <span className={`text-sm flex items-center ${profile.is_verified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {profile.is_verified ? (
                    <><CheckCircle className="w-4 h-4 mr-1" /> Verified</>
                  ) : (
                    <><Clock className="w-4 h-4 mr-1" /> Pending</>
                  )}
                </span>
              </div>
              
              <div className="h-px bg-zinc-100"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-700">Profile Completion</span>
                <span className="text-sm text-zinc-600">{profileCompletion}%</span>
              </div>
              
              <div className="h-px bg-zinc-100"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-700">Last Updated</span>
                <span className="text-sm text-zinc-600">
                  {new Date(profile.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {profileCompletion < 100 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-yellow-700">
                  Add more information to increase your visibility and attract more opportunities.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                  onClick={() => {
                    window.location.href = '/dashboard/settings';
                  }}
                >
                  Complete Profile
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <LogoutDialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog} 
      />
    </div>
  );
} 