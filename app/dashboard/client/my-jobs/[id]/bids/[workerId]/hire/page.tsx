"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Check, Paperclip, Smile, ArrowRight, CircleCheckBig, File, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox = ({ checked, onCheckedChange }: CheckboxProps) => {
  return (
    <div className="h-4 w-4 border rounded flex items-center justify-center" onClick={() => onCheckedChange(!checked)}>
      {checked && <Check className="h-3 w-3" />}
    </div>
  );
};

// Mock data for the worker and job
const workerData = {
  id: "1",
  name: "Sarah Wilson",
  title: "UI Designer",
  avatar: "/images/avatars/sarah-wilson-2.jpg",
  rating: 4.9,
  verified: true,
  topRated: true,
  hourlyRate: "$45/hour",
  estimatedTime: "40 hours",
  totalCost: "$1,800",
  proposal: "I've reviewed your project requirements and I'm confident I can deliver exceptional results. With over 5 years of experience in UI design and a strong portfolio of similar projects, I understand exactly what you're looking for and how to achieve it.",
  documents: [
    { name: "portfolio.pdf", type: "pdf" },
    { name: "proposal.pdf", type: "pdf" }
  ]
};

export default function HireWorkerPage() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<{text: string, sender: 'client' | 'worker', timestamp: string}[]>([
    {
      text: "Hi Sarah, thanks for your proposal. I'm interested in working with you.",
      sender: "client",
      timestamp: "2:30 PM"
    }
  ]);
  
  const [quickResponses] = useState([
    "Hi, I have some questions",
    "When can you start?"
  ]);

  const [isProjectStartImmediately, setIsProjectStartImmediately] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          text: newMessage,
          sender: "client",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage("");
    }
  };

  const handleQuickResponse = (text: string) => {
    setMessages([
      ...messages,
      {
        text,
        sender: "client",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Progress Tabs */}
      <div className="flex flex-col items-between justify-center px-4 my-4 mb-5">
        <div className="flex justify-between">
          <div className="flex items-center flex-1 py-3">
            <div className="text-sm font-medium">Review Bid</div>
          </div>
          <div className="flex flex-col items-center flex-1 py-3 text-zinc-500">
            <div className="text-sm font-medium">Message Worker</div>
          </div>
          <div className="flex flex-col items-center flex-1 py-3 text-zinc-500">
            <div className="text-sm font-medium">Confirm Hire</div>
          </div>
        </div>

        <Progress value={50} className="w-full h-2" />
      </div>

      <div className="max-w-3xl mx-auto p-4">
        {/* Worker Profile Card */}
        <div className="border border-zinc-200 rounded-lg p-5 mb-6">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-zinc-100 overflow-hidden">
                <Image
                  src={workerData.avatar}
                  alt={workerData.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{workerData.name}</h2>
                <div className="text-sm text-black-900 bg-zinc-100 px-3 py-1 rounded-full">
                  {workerData.title}
                </div>
              </div>
              <div className="flex items-center mt-4 space-x-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {workerData.rating}
                  </span>
                </div>
                {workerData.verified && (
                  <div className="flex items-center text-sm text-zinc-900 px-3 py-1 rounded-full border border-zinc-200">
                    <CircleCheckBig className="h-4 w-4 mr-1" />
                    <span>Verified</span>
                  </div>
                )}
                {workerData.topRated && (
                  <div className="bg-black text-white text-xs px-2 py-0.5 rounded px-3 py-1 rounded-full">
                    Top Rated
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Proposal Section */}
        <div className="border border-zinc-200 rounded-lg p-5 mb-6">
          <h3 className="text-lg font-semibold mb-4">Proposal</h3>
          <p className="text-zinc-700 mb-6">{workerData.proposal}</p>

          <div className="grid grid-cols-3 gap-5 mb-5">
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="text-sm text-zinc-500">Hourly Rate</div>
              <div className="font-semibold">{workerData.hourlyRate}</div>
            </div>
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="text-sm text-zinc-500">Est. Time</div>
              <div className="font-semibold">{workerData.estimatedTime}</div>
            </div>
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="text-sm text-zinc-500">Total Est.</div>
              <div className="font-semibold">{workerData.totalCost}</div>
            </div>
          </div>

          <div className="mb-2">
            <h4 className="text-sm font-medium mb-2">Attached Documents</h4>
            <div className="flex space-x-4">
              {workerData.documents.map((doc, index) => (
                <div key={index} className="text-center">
                  <div className="rounded border border-zinc-200 flex flex-col items-center justify-center mb-1 py-5 px-12">
                    <File className="h-5 w-5 text-zinc-500" />
                    <div className="text-xs text-zinc-900 font-semibold mt-1">
                      {doc.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="border border-zinc-200 rounded-lg p-5 mb-6">
          <h3 className="text-lg font-semibold mb-4">Message Sarah</h3>

          <div className="bg-zinc-100 p-3 rounded-lg mb-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm">{message.text}</p>
                <div className="text-xs text-zinc-500">
                  You • {message.timestamp}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                className="text-sm border border-zinc-300 rounded-full px-3 py-1 hover:bg-zinc-100"
                onClick={() => handleQuickResponse(response)}
              >
                {response}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-zinc-300 rounded-lg px-3 py-2 text-sm"
            />
            <div className="flex gap-1">
              <button className="p-2 border border-zinc-300 rounded-lg">
                <Paperclip className="h-5 w-5 text-zinc-500" />
              </button>
              <button className="p-2 border border-zinc-300 rounded-lg">
                <Smile className="h-5 w-5 text-zinc-500" />
              </button>
              <button
                className="p-2 bg-black text-white rounded-lg"
                onClick={handleSendMessage}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Hire Section */}
        <div className="border border-zinc-200 rounded-lg p-5 mb-6">
          <h3 className="text-lg font-semibold mb-2">Confirm Hire</h3>

          <h3 className="text-lg font-semibold mb-6">UI Design Project</h3>

          <div className="flex items-center mb-4">
            <div className="mr-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-100 overflow-hidden">
                <Image
                  src={workerData.avatar}
                  alt={workerData.name}
                  width={24}
                  height={24}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <div className="font-medium">{workerData.name}</div>
              <div className="text-sm text-zinc-600">{workerData.title}</div>
            </div>
          </div>

          <div className="border-t py-4 mb-4">
            <div className="flex justify-between mb-2">
              <div className="text-zinc-600">Hourly Rate</div>
              <div className="font-medium">{workerData.hourlyRate}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="text-zinc-600">Estimated Duration</div>
              <div className="font-medium">{workerData.estimatedTime}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-zinc-600">Total Estimate</div>
              <div className="font-medium">{workerData.totalCost}</div>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-zinc-600" />
              <label htmlFor="start-immediately" className="text-sm">
                Project starts immediately after confirmation
              </label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agree-terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked)}
              />
              <label htmlFor="agree-terms" className="text-sm">
                I agree to the terms and conditions
                <div className="text-xs text-zinc-500">
                  You can cancel within 24 hours of starting the project.
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" className="border-zinc-300">
              Back
            </Button>
            <Button
              disabled={!agreeToTerms}
              className="bg-black hover:bg-zinc-800 text-white"
            >
              Confirm Hire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 