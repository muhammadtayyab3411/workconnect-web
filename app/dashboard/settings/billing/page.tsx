import React from "react";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Check,
  Calendar,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BillingSettingsPage() {
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
              className="bg-zinc-100 rounded-md p-3 flex items-center gap-2"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <CreditCard className="w-4 h-4 stroke-zinc-900" />
              </div>
              <span className="text-sm font-medium text-zinc-900">
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
                Subscription & Billing
              </h1>
              <p className="text-sm text-zinc-500">
                Manage your subscription plan and payment settings
              </p>
            </div>
            
            {/* Current Subscription */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Current Subscription
              </h2>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-900">Free Plan</span>
                      <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full">Current Plan</span>
                    </div>
                    <p className="text-sm text-zinc-500 mt-1">Basic access to the WorkConnect platform</p>
                  </div>
                  <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
                    Upgrade Plan
                  </Button>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <div>
                  <h3 className="text-base font-medium text-zinc-900 mb-4">
                    Plan Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-zinc-900 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-zinc-600">Up to 10 job applications per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-zinc-900 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-zinc-600">Basic profile customization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-zinc-900 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-zinc-600">Community forum access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Available Plans */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Available Plans
              </h2>

              <div className="space-y-6">
                <div className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-zinc-900">Professional Plan</h3>
                      <p className="text-sm text-zinc-500 mt-1">Enhanced features for serious job seekers</p>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-zinc-600">
                          <Check className="h-4 w-4 text-zinc-700" />
                          <span>Unlimited job applications</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-600">
                          <Check className="h-4 w-4 text-zinc-700" />
                          <span>Priority profile placement</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-600">
                          <Check className="h-4 w-4 text-zinc-700" />
                          <span>Advanced analytics and insights</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">$12.99<span className="text-sm font-normal text-zinc-500">/month</span></div>
                      <Button className="mt-3 bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50">
                        Select Plan
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-zinc-900">Premium Plan</h3>
                        <span className="bg-zinc-900 text-white text-xs px-2 py-0.5 rounded-full">Best Value</span>
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">Full access to all WorkConnect features</p>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-zinc-600">
                          <Check className="h-4 w-4 text-zinc-700" />
                          <span>All Professional Plan features</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-600">
                          <Check className="h-4 w-4 text-zinc-700" />
                          <span>Direct messaging to employers</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-600">
                          <Check className="h-4 w-4 text-zinc-700" />
                          <span>Featured profile status</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">$24.99<span className="text-sm font-normal text-zinc-500">/month</span></div>
                      <Button className="mt-3 bg-zinc-900 hover:bg-zinc-800 text-white">
                        Select Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Payment Method
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-zinc-100 rounded flex items-center justify-center">
                      <span className="font-medium text-xs text-zinc-800">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">•••• •••• •••• 4242</div>
                      <div className="text-xs text-zinc-500">Expires 12/25</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-zinc-600 border-zinc-200">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-zinc-600 border-zinc-200">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="h-px bg-zinc-100"></div>

                <Button variant="outline" className="text-zinc-900 border-zinc-200">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-6">
                Billing History
              </h2>

              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200">
                        <th className="pb-3 text-left font-medium text-zinc-500">Date</th>
                        <th className="pb-3 text-left font-medium text-zinc-500">Description</th>
                        <th className="pb-3 text-left font-medium text-zinc-500">Amount</th>
                        <th className="pb-3 text-right font-medium text-zinc-500">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-100">
                        <td className="py-3 text-zinc-900">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span>Oct 12, 2023</span>
                          </div>
                        </td>
                        <td className="py-3 text-zinc-900">Professional Plan - Monthly</td>
                        <td className="py-3 text-zinc-900">$12.99</td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-zinc-100">
                        <td className="py-3 text-zinc-900">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span>Sep 12, 2023</span>
                          </div>
                        </td>
                        <td className="py-3 text-zinc-900">Professional Plan - Monthly</td>
                        <td className="py-3 text-zinc-900">$12.99</td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 