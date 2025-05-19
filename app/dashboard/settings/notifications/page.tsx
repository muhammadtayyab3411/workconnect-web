import React from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function NotificationSettingsPage() {
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
              className="bg-zinc-100 rounded-md p-3 flex items-center gap-2"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Bell className="w-4 h-4 stroke-zinc-900" />
              </div>
              <span className="text-sm font-medium text-zinc-900">
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
                Notification Settings
              </h1>
              <p className="text-sm text-zinc-500">
                Manage how you receive notifications from WorkConnect
              </p>
            </div>
            
            {/* Notification Preferences */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Email Notifications
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

            {/* Push Notifications */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Push Notifications
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Mobile Push Notifications
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Receive notifications on your mobile device
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
                      Browser Notifications
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Receive notifications in your web browser
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                  />
                </div>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Communication Preferences
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-900">
                      Marketing Emails
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Receive emails about new features and offers
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
                      Platform Updates
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Get notified about new platform features and updates
                    </p>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-zinc-900"
                    defaultChecked
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