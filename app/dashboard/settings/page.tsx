import React from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Upload,
  ChevronDown,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="py-6">
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
                    src="/images/user2.jpg"
                    alt="User profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-zinc-900 border-zinc-200"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Picture</span>
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
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue="John"
                      className="border-zinc-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue="Doe"
                      className="border-zinc-200"
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
                    defaultValue="john.doe@example.com"
                    className="border-zinc-200"
                  />
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
                    defaultValue="+1 (555) 000-0000"
                    className="border-zinc-200"
                  />
                </div>
              </div>
            </div>

            {/* Work Preferences Section */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Work Preferences
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium text-zinc-900 mb-3">
                    Job Types
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fullTime"
                        className="h-4 w-4 border-zinc-900 rounded"
                      />
                      <label
                        htmlFor="fullTime"
                        className="ml-2 text-sm text-zinc-900"
                      >
                        Full-time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="partTime"
                        className="h-4 w-4 border-zinc-900 rounded"
                      />
                      <label
                        htmlFor="partTime"
                        className="ml-2 text-sm text-zinc-900"
                      >
                        Part-time
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contract"
                        className="h-4 w-4 border-zinc-900 rounded"
                      />
                      <label
                        htmlFor="contract"
                        className="ml-2 text-sm text-zinc-900"
                      >
                        Contract
                      </label>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-zinc-100 my-4"></div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Location Preference
                  </Label>
                  <div className="relative">
                    <Input
                      id="location"
                      defaultValue="San Francisco, CA"
                      className="border-zinc-200 pr-10"
                    />
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Status Message
                  </Label>
                  <Input
                    id="status"
                    defaultValue="Available for new opportunities!"
                    className="border-zinc-200"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Job Applications
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Get notified when someone applies to your job posting
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                    defaultChecked
                  />
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      New Messages
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Receive notifications for new messages
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                    defaultChecked
                  />
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Job Recommendations
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Get job recommendations based on your preferences
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                    defaultChecked
                  />
                </div>
              </div>
            </div>

            {/* Language and Region */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Language and Region
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="language"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Language
                  </Label>
                  <div className="relative">
                    <Input
                      id="language"
                      defaultValue="English (US)"
                      className="border-zinc-200 pr-10"
                      readOnly
                    />
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500" />
                  </div>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="space-y-2">
                  <Label
                    htmlFor="timezone"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Time Zone
                  </Label>
                  <div className="relative">
                    <Input
                      id="timezone"
                      defaultValue="Pacific Time (PT)"
                      className="border-zinc-200 pr-10"
                      readOnly
                    />
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500" />
                  </div>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div>
                  <div className="flex items-center justify-between space-y-1 mb-3">
                    <div>
                      <h3 className="text-base font-medium text-zinc-900">
                        Theme Preference
                      </h3>
                      <p className="text-sm text-zinc-500">
                        Choose your preferred theme
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 border border-zinc-200 p-2 rounded-md">
                        <Sun className="h-5 w-5 text-zinc-900" />
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 border border-zinc-200 p-2 rounded-md">
                        <Moon className="h-5 w-5 text-zinc-900" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4"></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 py-4">
              <Button
                variant="outline"
                className="text-zinc-900 border-zinc-200"
              >
                Cancel
              </Button>
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 