"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CalendarIcon, 
  UploadCloud, 
  MapPin, 
  DollarSign, 
  InfoIcon, 
  Briefcase,
  User
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RoleGuard } from "@/lib/role-guard";

export default function PostJobPage() {
  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="w-full max-w-6xl mx-auto mt-4">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Post a Job</h1>
              <p className="text-base text-zinc-500 mt-1">
                Reach thousands of trusted local workers in minutes
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-zinc-900"
              >
                <InfoIcon className="h-4 w-4" />
                How it Works
              </Button>
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <Image
              src="/images/post-job/page-illustration.svg"
              alt="Post a job illustration"
              width={800}
              height={120}
              className="w-full max-h-28 object-contain"
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Job Details */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-5 w-5 text-zinc-900" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Step 1: Job Details
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="job-title"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Job Title
                  </Label>
                  <Input
                    id="job-title"
                    placeholder="e.g. Experienced Plumber Needed for Bathroom Renovation"
                    className="w-full mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="carpentry">Carpentry</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="landscaping">Landscaping</SelectItem>
                      <SelectItem value="moving">Moving</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-900">
                    Job Type
                  </Label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <RadioGroup defaultValue="one-time" className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one-time" id="one-time" />
                          <Label
                            htmlFor="one-time"
                            className="text-sm font-medium text-zinc-900"
                          >
                            One-time
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recurring" id="recurring" />
                          <Label
                            htmlFor="recurring"
                            className="text-sm font-medium text-zinc-900"
                          >
                            Recurring
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" />
                          <Label
                            htmlFor="urgent"
                            className="text-sm font-medium text-zinc-900"
                          >
                            Urgent
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job requirements and responsibilities..."
                    className="min-h-[120px] mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="images"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Images
                  </Label>
                  <div className="border border-dashed border-zinc-300 rounded-md p-8 text-center mt-2">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UploadCloud className="h-8 w-8 text-zinc-400" />
                      <p className="text-sm text-zinc-500">
                        Drop images here or click to upload
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Location */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-zinc-900" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Step 2: Location
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter job location"
                    className="w-full mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-zinc-900"
                  >
                    City/Area
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="houston">Houston</SelectItem>
                      <SelectItem value="phoenix">Phoenix</SelectItem>
                      <SelectItem value="philadelphia">Philadelphia</SelectItem>
                      <SelectItem value="san-antonio">San Antonio</SelectItem>
                      <SelectItem value="san-diego">San Diego</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-zinc-100 h-[200px] rounded-md flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">
                    Map location selector will appear here
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Schedule & Duration */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <CalendarIcon className="h-5 w-5 text-zinc-900" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Step 3: Schedule & Duration
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="start-date"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Start Date
                  </Label>
                  <div className="relative">
                    <Input id="start-date" type="date" className="w-full mt-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Duration
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select estimated duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1-hour">Under 1 hour</SelectItem>
                      <SelectItem value="1-2-hours">1-2 hours</SelectItem>
                      <SelectItem value="2-4-hours">2-4 hours</SelectItem>
                      <SelectItem value="4-8-hours">4-8 hours</SelectItem>
                      <SelectItem value="full-day">
                        Full day (8+ hours)
                      </SelectItem>
                      <SelectItem value="multi-day">Multi-day project</SelectItem>
                      <SelectItem value="1-week">About 1 week</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch id="flexible-schedule" />
                    <Label
                      htmlFor="flexible-schedule"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Flexible Schedule
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Budget & Payment */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="h-5 w-5 text-zinc-900" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Step 4: Budget & Payment
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-900">
                    Payment Type
                  </Label>
                  <RadioGroup defaultValue="fixed" className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label
                        htmlFor="fixed"
                        className="text-sm font-medium text-zinc-900"
                      >
                        Fixed Price
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label
                        htmlFor="hourly"
                        className="text-sm font-medium text-zinc-900"
                      >
                        Hourly Rate
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="budget"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Budget
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <DollarSign className="h-4 w-4 text-zinc-500" />
                    </span>
                    <Input
                      id="budget"
                      placeholder="Enter amount"
                      className="pl-9 mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Requirements */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/images/post-job/requirements-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Step 5: Requirements
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-900">
                    Experience Level
                  </Label>
                  <RadioGroup
                    defaultValue="any"
                    className="flex flex-col sm:flex-row gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label
                        htmlFor="any"
                        className="text-sm font-medium text-zinc-900"
                      >
                        Any Level
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label
                        htmlFor="beginner"
                        className="text-sm font-medium text-zinc-900"
                      >
                        Beginner
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="experienced" id="experienced" />
                      <Label
                        htmlFor="experienced"
                        className="text-sm font-medium text-zinc-900"
                      >
                        Experienced
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="certifications"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Certifications
                  </Label>
                  <div className="border border-dashed border-zinc-300 rounded-md p-8 text-center mt-2">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UploadCloud className="h-8 w-8 text-zinc-400" />
                      <p className="text-sm text-zinc-500">
                        Upload required certifications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="languages"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Languages
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select required languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="special-instructions"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Special Instructions
                  </Label>
                  <Textarea
                    id="special-instructions"
                    placeholder="Any additional requirements or instructions..."
                    className="min-h-[100px] mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Preview & Submit */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                  Job Preview
                </h2>
                <p className="text-sm text-zinc-500 mb-4">
                  Preview how your job will appear to workers
                </p>

                <div className="space-y-4">
                  <div className="">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      Experienced Plumber Needed
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                        One-time
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                        Plumbing
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                        $25-35/hr
                      </span>
                    </div>

                    <div className="my-4 border-t border-zinc-200"></div>

                    <div className="mt-4 space-y-3">
                      <div>
                        {/* the location and p should start at the same position, currently the p starts beneath the icon */}
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-zinc-900 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-zinc-900">
                              Location
                            </h4>
                            <p className="text-sm text-zinc-500 ml-1/2">
                              123 Main St, Brooklyn, NY
                            </p>
                          </div>
                        </div>
                      </div>


                        <div className="flex items-start gap-2">
                          <CalendarIcon className="h-4 w-4 text-zinc-900 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-zinc-900">
                              Schedule
                            </h4>
                            <p className="text-sm text-zinc-500 ml-1/2">
                              Starting Feb 15, 2024 • 4-6 hours
                            </p>
                          </div>
                        </div>


                      <div>
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 text-zinc-900 mt-0.5" />
                          <div>

                            <h4 className="text-sm font-medium text-zinc-900">
                              Requirements
                            </h4>
                          <p className="text-sm text-zinc-500 ml-1/2">
                            • Experienced level
                            <br />
                            • Plumbing certification
                            <br />• English
                          </p>
                          </div>
                        </div>
                      </div>

                      <div className="my-4 border-t border-zinc-200"></div>

                      <div>
                        <h4 className="text-sm font-medium text-zinc-900">
                          Description
                        </h4>
                        <p className="text-sm text-zinc-500">
                          Looking for an experienced plumber to help with bathroom
                          renovation project. Must have own tools and
                          transportation. Previous experience with similar
                          projects required.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full text-base">
                  Post Job
                </Button>
                <Button variant="outline" className="w-full text-base" >
                  Save as Draft
                </Button>
                <p className="text-sm text-center text-zinc-500">
                  You can edit this job after posting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
} 