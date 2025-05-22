"use client";

import { useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowDown,
  Wallet,
  DollarSign,
  Clock,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the earnings chart
const chartData = [
  { name: "Jul", earnings: 1200 },
  { name: "Aug", earnings: 1800 },
  { name: "Sep", earnings: 1600 },
  { name: "Oct", earnings: 2200 },
  { name: "Nov", earnings: 1850 },
  { name: "Dec", earnings: 2400 },
];

// Mock data for transactions
interface Transaction {
  id: number;
  job: string;
  client: string;
  date: string;
  amount: string;
  paymentMethod: string;
  status: "Paid" | "Pending" | "Failed";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    job: "Website Redesign",
    client: "Tech Solutions Inc.",
    date: "Dec 15, 2023",
    amount: "$850.00",
    paymentMethod: "Bank Transfer",
    status: "Paid",
  },
  {
    id: 2,
    job: "Mobile App Development",
    client: "StartUp Co.",
    date: "Dec 14, 2023",
    amount: "$1200.00",
    paymentMethod: "Credit Card",
    status: "Pending",
  },
  {
    id: 3,
    job: "UI/UX Consultation",
    client: "Design Agency",
    date: "Dec 13, 2023",
    amount: "$450.00",
    paymentMethod: "PayPal",
    status: "Paid",
  },
  {
    id: 4,
    job: "Backend Integration",
    client: "E-commerce Ltd",
    date: "Dec 12, 2023",
    amount: "$950.00",
    paymentMethod: "Bank Transfer",
    status: "Failed",
  },
  {
    id: 5,
    job: "SEO Optimization",
    client: "Marketing Pro",
    date: "Dec 11, 2023",
    amount: "$650.00",
    paymentMethod: "Credit Card",
    status: "Paid",
  },
];

export default function PaymentHistoryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "withdrawals" | "upcoming">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate summary statistics
  const totalEarnings = "$12,458.00";
  const availableBalance = "$845.00";
  const pendingPayments = "$320.00";
  const withdrawnAmount = "$11,293.00";
  const upcomingPayouts = "$150.00";

  // Filter transactions based on search query
  const filteredTransactions = MOCK_TRANSACTIONS.filter(
    (transaction) =>
      transaction.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6">
      {/* Header Section */}
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-2">Payment History & Earnings</h1>
        <p className="text-zinc-500">
          Track your earnings, withdrawals, and payment history
        </p>
      </div>

      {/* Divider */}
      <hr className="border-zinc-200 mb-6" />

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Total Earnings Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white relative">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Total Earnings</p>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{totalEarnings}</p>
          <div className="absolute top-5 right-5">
            <FileText className="h-5 w-5 text-zinc-900" />
          </div>
        </div>

        {/* Available Balance Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white relative">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{availableBalance}</p>
          <div className="absolute top-5 right-5">
            <Wallet className="h-5 w-5 text-zinc-900" />
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white relative">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Pending Payments</p>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{pendingPayments}</p>
          <div className="absolute top-5 right-5">
            <Clock className="h-5 w-5 text-zinc-900" />
          </div>
        </div>

        {/* Withdrawn Amount Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white relative">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Withdrawn Amount</p>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{withdrawnAmount}</p>
          <div className="absolute top-5 right-5">
            <ArrowDown className="h-5 w-5 text-zinc-900" />
          </div>
        </div>

        {/* Upcoming Payouts Card */}
        <div className="border border-zinc-200 rounded-lg shadow-sm p-5 bg-white relative">
          <div className="mb-2">
            <p className="text-sm text-zinc-500 font-medium">Upcoming Payouts</p>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{upcomingPayouts}</p>
          <div className="absolute top-5 right-5">
            <DollarSign className="h-5 w-5 text-zinc-900" />
          </div>
        </div>
      </div>

      {/* Earnings Chart Section */}
      <div className="border border-zinc-200 rounded-lg shadow-sm p-6 bg-white mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6">Earnings Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false}
                tickLine={false}
                domain={[0, 'dataMax + 200']}
                ticks={[0, 600, 1200, 1800, 2400]}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}
                labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#E76E50"
                strokeWidth={2}
                fill="transparent"
                activeDot={{ r: 8, strokeWidth: 0, fill: '#E76E50' }}
                dot={{ r: 4, strokeWidth: 0, fill: '#E76E50' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="mb-6 pt-4">
        {/* Filters and Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="w-full sm:w-auto">
            <Select defaultValue="30">
              <SelectTrigger className="w-full sm:w-[180px] border-zinc-200 bg-white">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last 365 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-zinc-200 bg-white w-full"
              />
            </div>
            
            <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full sm:w-auto">
              <Button variant="outline" size="default" className="border-zinc-200 bg-white flex-1 sm:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <Button variant="outline" size="default" className="border-zinc-200 bg-white flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white flex-1 sm:flex-none">
                <FileText className="w-4 h-4 mr-2" />
                Generate Statement
              </Button>
            </div>
          </div>
        </div>

        {/* Transaction Tabs */}
        <div className="flex flex-wrap border-b border-zinc-200 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "all"
                ? "text-zinc-900 border-b-2 border-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            All Transactions
          </button>
          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "withdrawals"
                ? "text-zinc-900 border-b-2 border-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Withdrawals
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "text-zinc-900 border-b-2 border-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Upcoming Payouts
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-zinc-200 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Job
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-900">{transaction.job}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-900">{transaction.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-900">{transaction.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-900">{transaction.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-900">{transaction.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "Paid"
                          ? "bg-zinc-900 text-white"
                          : transaction.status === "Pending"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-6">
          <div className="text-sm text-zinc-500 order-2 sm:order-1">
            Showing {filteredTransactions.length} of {MOCK_TRANSACTIONS.length} transactions
          </div>
          <div className="flex space-x-2 order-1 sm:order-2">
            <Button variant="outline" size="sm" className="h-9 px-3">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 