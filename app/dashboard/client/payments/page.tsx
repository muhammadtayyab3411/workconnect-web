"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PaymentMethodIcon, UserAvatar } from "@/components/dashboard";
import {
  Search,
  CalendarIcon,
  ChevronDown,
  Funnel,
  Download,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock payment data
const outstandingPayments = [
  {
    id: "1",
    title: "Website Redesign Project",
    workerName: "Sarah Miller",
    workerAvatar: "/images/avatars/sarah-wilson-2.jpg",
    amount: "$2800",
    dueDate: "2024-02-15",
    status: "pending",
  },
  {
    id: "2",
    title: "Mobile App Development",
    workerName: "John Chen",
    workerAvatar: "/images/avatars/michael-chen.jpg",
    amount: "$4200",
    dueDate: "2024-02-10",
    status: "overdue",
  },
  {
    id: "3",
    title: "Brand Identity Design",
    workerName: "Emma Wilson",
    workerAvatar: "/images/avatars/emma-davis.jpg",
    amount: "$1850",
    dueDate: "2024-02-20",
    status: "pending",
  },
];

const completedPayments = [
  {
    id: "4",
    title: "E-commerce Platform",
    workerName: "David Kim",
    workerAvatar: "/images/avatars/michael-chen.jpg",
    amount: "$5600",
    paymentDate: "2024-02-01",
    status: "paid",
  },
  {
    id: "5",
    title: "Marketing Campaign",
    workerName: "Lisa Chen",
    workerAvatar: "/images/avatars/sarah-wilson-2.jpg",
    amount: "$3200",
    paymentDate: "2024-01-28",
    status: "paid",
  },
  {
    id: "6",
    title: "SEO Optimization",
    workerName: "Mike Johnson",
    workerAvatar: "/images/avatars/emma-davis.jpg",
    amount: "$1800",
    paymentDate: "2024-01-25",
    status: "paid",
  },
];

const paymentMethods = [
  {
    id: "1",
    type: "visa",
    number: "4242",
    expiry: "12/25",
    default: true,
  },
  {
    id: "2",
    type: "mastercard",
    number: "8888",
    expiry: "08/24",
    default: false,
  },
];

export default function PaymentsPage() {
  return (
    <div className="w-full mt-6">
      {/* Page header with search and filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-semibold">Payments & Invoices</h1>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[280px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 pr-4 border-zinc-200"
            />
          </div>
          <div className="flex flex-row gap-3">
            <Button variant="outline" className="border-zinc-200 text-zinc-900 flex gap-2 items-center">
              <CalendarIcon className="h-4 w-4" />
              Last 30 days
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" className="border-zinc-200 text-zinc-900 flex gap-2 items-center">
              <Funnel className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Outstanding */}
        <Card className="gap-0 self-center p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Total Outstanding</h3>
          <p className="text-2xl font-bold text-zinc-900">$12,450</p>
          <p className="text-sm text-zinc-500">8 pending payments</p>
        </Card>

        {/* Total Paid (This Month) */}
        <Card className="gap-0 self-center p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Total Paid (This Month)</h3>
          <p className="text-2xl font-bold text-zinc-900">$45,680</p>
          <p className="text-sm text-zinc-500">+12.5% from last month</p>
        </Card>

        {/* Active Invoices */}
        <Card className="gap-0 self-center p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Active Invoices</h3>
          <p className="text-2xl font-bold text-zinc-900">8</p>
          <p className="text-sm text-zinc-500">3 due this week</p>
        </Card>

        {/* Average Payment Time */}
        <Card className="gap-0 self-center p-6">
          <h3 className="text-sm text-zinc-500 mb-1">Average Payment Time</h3>
          <p className="text-2xl font-bold text-zinc-900">2.3 days</p>
          <p className="text-sm text-zinc-500">-0.5 days from avg</p>
        </Card>
      </div>

      {/* Outstanding Payments Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Outstanding Payments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {outstandingPayments.map((payment) => (
            <Card key={payment.id} className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col">
                      <h3 className="text-base font-medium text-zinc-900 mb-1">{payment.title}</h3>
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          src={payment.workerAvatar}
                          alt={payment.workerName}
                          size="sm"
                        />
                        <span className="text-sm text-zinc-500">{payment.workerName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    payment.status === 'pending' 
                      ? 'bg-zinc-100 text-zinc-900' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {payment.status}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-semibold text-zinc-900 mb-1">{payment.amount}</p>
                  <p className="text-sm text-zinc-500">Due {payment.dueDate}</p>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  <Button className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white">
                    Pay Now
                  </Button>
                  <Button variant="outline" className="border-zinc-200 p-2" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Payments Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Completed Payments</h2>
        <Card className="overflow-hidden py-1">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white">
                <tr className="border-b border-zinc-200">
                  <th className="text-left text-sm font-medium text-zinc-500 py-4 px-6">Job Title</th>
                  <th className="text-left text-sm font-medium text-zinc-500 py-4 px-6">Worker</th>
                  <th className="text-left text-sm font-medium text-zinc-500 py-4 px-6">Payment Date</th>
                  <th className="text-left text-sm font-medium text-zinc-500 py-4 px-6">Amount</th>
                  <th className="text-left text-sm font-medium text-zinc-500 py-4 px-6">Status</th>
                  <th className="text-left text-sm font-medium text-zinc-500 py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {completedPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="text-sm font-medium text-zinc-900 py-4 px-6">
                      {payment.title}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <UserAvatar 
                          src={payment.workerAvatar} 
                          alt={payment.workerName} 
                        />
                        <span className="text-sm text-zinc-900">{payment.workerName}</span>
                      </div>
                    </td>
                    <td className="text-sm text-zinc-900 py-4 px-6">{payment.paymentDate}</td>
                    <td className="text-sm text-zinc-900 py-4 px-6">{payment.amount}</td>
                    <td className="py-4 px-6">
                      <span className="bg-zinc-100 text-zinc-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-200">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-200">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Payment Methods Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 flex items-center justify-center">
                  <PaymentMethodIcon type={method.type} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-zinc-900">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.number}
                  </h3>
                  <p className="text-sm text-zinc-500">Expires {method.expiry}</p>
                </div>
                {method.default && (
                  <span className="bg-zinc-900 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Default
                  </span>
                )}
              </div>
            </Card>
          ))}
          <Card className="p-6 border border-dashed flex items-center justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Card
            </Button>
          </Card>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-zinc-500">Showing 1 to 10 of 20 entries</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-200">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 border-zinc-200 bg-white">
            1
          </Button>
          <Button variant="outline" className="h-8 w-8 border-zinc-200">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-200">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 