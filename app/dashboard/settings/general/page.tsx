import React from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Sun,
  Moon,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function GeneralSettingsPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="space-y-4">
            <Link 
              href="/dashboard/settings"
              className="rounded-md p-3 flex items-center gap-2 hover:bg-zinc-50"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <User className="w-4 h-4 stroke-zinc-500" />
              </div>
              <span className="text-sm font-medium text-zinc-500">
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
              className="bg-zinc-100 rounded-md p-3 flex items-center gap-2"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Globe className="w-4 h-4 stroke-zinc-900" />
              </div>
              <span className="text-sm font-medium text-zinc-900">
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
                General Settings
              </h1>
              <p className="text-sm text-zinc-500">
                Manage your language, region, and platform preferences
              </p>
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
                    <select 
                      id="language" 
                      className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent appearance-none pr-10"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="es">Spanish</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500 pointer-events-none" />
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
                    <select 
                      id="timezone" 
                      className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent appearance-none pr-10"
                    >
                      <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                      <option value="America/Anchorage">(GMT-09:00) Alaska</option>
                      <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                      <option value="America/Denver">(GMT-07:00) Mountain Time (US & Canada)</option>
                      <option value="America/Chicago">(GMT-06:00) Central Time (US & Canada)</option>
                      <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                      <option value="Europe/London">(GMT+00:00) London, Edinburgh</option>
                      <option value="Europe/Paris">(GMT+01:00) Paris, Berlin, Rome</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="space-y-2">
                  <Label
                    htmlFor="dateFormat"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Date Format
                  </Label>
                  <div className="relative">
                    <select 
                      id="dateFormat" 
                      className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent appearance-none pr-10"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Accessibility
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Reduce Motion
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Reduce the amount of animation or motion effects
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                  />
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      High Contrast Mode
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Increase the contrast between text and background colors
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                  />
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Theme Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-base font-medium text-zinc-900">
                      Theme Preference
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Choose your preferred theme
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-zinc-200 rounded-md p-4 flex flex-col items-center gap-2 hover:border-zinc-900 cursor-pointer transition-colors">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                        <Sun className="h-5 w-5 text-zinc-900" />
                      </div>
                      <span className="text-sm font-medium text-zinc-900">Light</span>
                    </div>
                    
                    <div className="border border-zinc-200 rounded-md p-4 flex flex-col items-center gap-2 hover:border-zinc-900 cursor-pointer transition-colors">
                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                        <Moon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-zinc-900">Dark</span>
                    </div>
                    
                    <div className="border border-zinc-900 rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-r from-zinc-100 to-zinc-800 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-100"></div>
                      </div>
                      <span className="text-sm font-medium text-zinc-900">System</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Dark Mode
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Toggle dark mode on/off
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                  />
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