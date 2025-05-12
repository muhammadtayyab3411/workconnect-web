"use client"

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header, Footer } from "@/components/common";

interface FormData {
  title: string;
  category: string;
  description: string;
  budget: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
}

export default function NewJobPost() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    description: "",
    budget: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the data to an API
    console.log(formData);
    // Redirect to a confirmation page
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                    1
                  </div>
                  <div className={`ml-2 ${step >= 1 ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>
                    Job Details
                  </div>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-zinc-900' : 'bg-zinc-200'}`}></div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                    2
                  </div>
                  <div className={`ml-2 ${step >= 2 ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>
                    Review
                  </div>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-zinc-900' : 'bg-zinc-200'}`}></div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                    3
                  </div>
                  <div className={`ml-2 ${step >= 3 ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>
                    Complete
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Job Details */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Post a New Job</CardTitle>
                  <CardDescription>Fill in the details below to create your job listing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      placeholder="E.g., Plumbing Repair Needed" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      name="category"
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="moving">Moving</SelectItem>
                        <SelectItem value="driving">Driving</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange} 
                      placeholder="Describe what you need done..." 
                      rows={5} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input 
                      id="budget" 
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleChange} 
                      placeholder="E.g., 50-100" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      placeholder="E.g., San Francisco, CA" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input 
                      id="contactEmail" 
                      name="contactEmail" 
                      type="email" 
                      value={formData.contactEmail} 
                      onChange={handleChange} 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone (Optional)</Label>
                    <Input 
                      id="contactPhone" 
                      name="contactPhone" 
                      value={formData.contactPhone} 
                      onChange={handleChange} 
                      placeholder="(123) 456-7890" 
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={nextStep}>Continue to Review</Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Job Post</CardTitle>
                  <CardDescription>Please review your job details before publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Job Title</h3>
                    <p>{formData.title}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Category</h3>
                    <p>{formData.category}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Description</h3>
                    <p className="whitespace-pre-line">{formData.description}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Budget</h3>
                    <p>${formData.budget}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p>{formData.location}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Contact Information</h3>
                    <p>Email: {formData.contactEmail}</p>
                    {formData.contactPhone && <p>Phone: {formData.contactPhone}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>Back</Button>
                  <Button onClick={handleSubmit}>Publish Job</Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Completion */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Success! Your Job Has Been Posted</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-lg mb-6">
                    Your job post &ldquo;{formData.title}&rdquo; has been successfully published.
                  </p>
                  <p className="mb-6">
                    You&apos;ll be notified when workers submit their bids. You can view and manage your job posts from your dashboard.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline">Go to Dashboard</Button>
                  </Link>
                  <Link href="/browse-jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 