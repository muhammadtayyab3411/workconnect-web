import React from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Shield,
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function SecuritySettingsPage() {
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
              className="bg-zinc-100 rounded-md p-3 flex items-center gap-2"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Lock className="w-4 h-4 stroke-zinc-900" />
              </div>
              <span className="text-sm font-medium text-zinc-900">
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
                Security & Privacy
              </h1>
              <p className="text-sm text-zinc-500">
                Manage your account security and privacy settings
              </p>
            </div>
            
            {/* Password Management */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Password Management
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="currentPassword"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type="password"
                      className="border-zinc-200 pr-10"
                    />
                    <button className="absolute right-3 top-2.5">
                      <Eye className="h-5 w-5 text-zinc-500" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-zinc-900"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type="password"
                      className="border-zinc-200 pr-10"
                    />
                    <button className="absolute right-3 top-2.5">
                      <EyeOff className="h-5 w-5 text-zinc-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="border-zinc-200 pr-10"
                    />
                    <button className="absolute right-3 top-2.5">
                      <EyeOff className="h-5 w-5 text-zinc-500" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-900 w-3/4 rounded-full"></div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Password strength: Strong</p>
                </div>

                <div>
                  <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Two-Factor Authentication (2FA)
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-zinc-900">
                        Two-Factor Authentication
                      </h3>
                      <div className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        Not Enabled
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500">
                      Add an extra layer of security to your account by requiring more than just a password to sign in.
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                  />
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-900">Authenticator App</h4>
                      <p className="text-xs text-zinc-500">Recommended method</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <KeyRound className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-900">SMS Authentication</h4>
                      <p className="text-xs text-zinc-500">Receive a code via text message</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Privacy Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Profile Visibility
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Make your profile visible to other users on the platform
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
                      Activity Status
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Show when you&apos;re active on the platform
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                    defaultChecked
                  />
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div className="space-y-1">
                  <h3 className="text-base font-medium text-zinc-900 text-red-600">
                    Delete Account
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <div className="mt-3">
                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
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