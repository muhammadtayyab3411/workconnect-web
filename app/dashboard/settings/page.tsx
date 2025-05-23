"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Upload,
  Loader2,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { userAPI, UserProfile, ProfileUpdateData } from "@/lib/api";

export default function SettingsPage() {
  const { user, loginWithTokens } = useAuth();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<ProfileUpdateData>({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    date_of_birth: ''
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getProfile();
        setProfileData(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_number: data.phone_number || '',
          address: data.address || '',
          date_of_birth: data.date_of_birth || ''
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        if (user) {
          const userData = user as UserProfile;
          setProfileData(userData);
          setFormData({
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            phone_number: userData.phone_number || '',
            address: userData.address || '',
            date_of_birth: userData.date_of_birth || ''
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Handle form input changes
  const handleInputChange = (field: keyof ProfileUpdateData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (800KB)
    if (file.size > 800 * 1024) {
      setMessage({ type: 'error', text: 'File size too large. Maximum size is 800KB.' });
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
      setMessage({ type: 'error', text: 'Invalid file type. Please upload JPG, PNG, or GIF images only.' });
      return;
    }

    try {
      setUploadingImage(true);
      const result = await userAPI.uploadProfilePicture(file);
      
      // Update profile data with new picture URL
      if (profileData) {
        const updatedProfile = { ...profileData, profile_picture: result.profile_picture_url };
        setProfileData(updatedProfile);
        
        // Update auth context
        const tokens = {
          access: localStorage.getItem('accessToken') || '',
          refresh: localStorage.getItem('refreshToken') || ''
        };
        if (tokens.access && tokens.refresh) {
          await loginWithTokens(tokens, updatedProfile);
        }
      }
      
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
    } catch (err) {
      console.error('Failed to upload profile picture:', err);
      setMessage({ type: 'error', text: 'Failed to upload profile picture. Please try again.' });
    } finally {
      setUploadingImage(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const updatedProfile = await userAPI.updateProfile(formData);
      setProfileData(updatedProfile);
      
      // Update auth context with new data
      const tokens = {
        access: localStorage.getItem('accessToken') || '',
        refresh: localStorage.getItem('refreshToken') || ''
      };
      if (tokens.access && tokens.refresh) {
        await loginWithTokens(tokens, updatedProfile);
      }
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error('Failed to update profile:', err);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-600" />
          <span className="text-zinc-600">Loading profile settings...</span>
        </div>
      </div>
    );
  }

  const profile = profileData || user;
  if (!profile) return null;

  return (
    <div className="py-6">
      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {message.type === 'success' ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <X className="w-5 h-5 mr-2" />
              )}
              {message.text}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMessage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="space-y-4">
              <Link 
                href="/dashboard/settings"
                className="bg-zinc-100 rounded-md p-3 flex items-center gap-2"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <User className="w-4 h-4 stroke-zinc-900" />
                </div>
                <span className="text-sm font-medium text-zinc-900">
                  Profile Settings
                </span>
              </Link>

              <Link 
                href="/dashboard/settings/notifications"
                className="rounded-md p-3 flex items-center gap-2 hover:bg-zinc-50"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Bell className="w-4 h-4 stroke-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-500">
                  Notification Settings
                </span>
              </Link>

              <Link 
                href="/dashboard/settings/security"
                className="rounded-md p-3 flex items-center gap-2 hover:bg-zinc-50"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Lock className="w-4 h-4 stroke-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-500">
                  Security & Privacy
                </span>
              </Link>

              <Link 
                href="/dashboard/settings/billing"
                className="rounded-md p-3 flex items-center gap-2 hover:bg-zinc-50"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 stroke-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-500">
                  Subscription & Billing
                </span>
              </Link>

              <Link 
                href="/dashboard/settings/general"
                className="rounded-md p-3 flex items-center gap-2 hover:bg-zinc-50"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Globe className="w-4 h-4 stroke-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-500">
                  General Settings
                </span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h1 className="text-2xl font-semibold text-zinc-900">
                  Profile Settings
                </h1>
                <p className="text-sm text-zinc-500">
                  Manage your profile information and preferences
                </p>
              </div>

              {/* Profile Picture Section */}
              <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-zinc-900 mb-4">
                  Profile Picture
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-zinc-100 overflow-hidden">
                    <Image
                      src={profile.profile_picture || "/images/user2.jpg"}
                      alt="User profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2 text-zinc-900 border-zinc-200"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload New Picture'}</span>
                    </Button>
                    <p className="text-xs text-zinc-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-zinc-900 mb-6">
                  Personal Information
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-zinc-900"
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        className="border-zinc-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-sm font-medium text-zinc-900"
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        className="border-zinc-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      className="border-zinc-200 bg-zinc-50"
                      disabled
                    />
                    <p className="text-xs text-zinc-500">
                      Email address cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      className="border-zinc-200"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="border-zinc-200"
                      placeholder="Your address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      className="border-zinc-200"
                    />
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-zinc-900 mb-6">
                  Account Information
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-700">Account Type</span>
                    <span className="text-sm text-zinc-600 capitalize">{profile.role}</span>
                  </div>
                  
                  <div className="h-px bg-zinc-100"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-700">Account Status</span>
                    <span className={`text-sm ${profile.is_verified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {profile.is_verified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 py-4">
                <Button
                  type="button"
                  variant="outline"
                  className="text-zinc-900 border-zinc-200"
                  onClick={() => {
                    // Reset form to original values
                    if (profileData) {
                      setFormData({
                        first_name: profileData.first_name || '',
                        last_name: profileData.last_name || '',
                        phone_number: profileData.phone_number || '',
                        address: profileData.address || '',
                        date_of_birth: profileData.date_of_birth || ''
                      });
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 