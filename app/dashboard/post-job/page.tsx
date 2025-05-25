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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RoleGuard } from "@/lib/role-guard";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { jobAPI, JobCategory, JobCreateData, Job } from "@/lib/api";
import LocationPicker from "@/components/maps/LocationPicker";

interface LocationData {
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}

interface Notification {
  type: 'success' | 'error';
  message: string;
}

export default function PostJobPage() {
  const searchParams = useSearchParams();
  const editJobId = searchParams.get('edit');
  const isEditMode = !!editJobId;
  
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingJobData, setLoadingJobData] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState<Partial<JobCreateData>>({
    job_type: 'one-time',
    payment_type: 'fixed',
    experience_level: 'any',
    flexible_schedule: false,
    urgent: false,
    budget_currency: 'USD'
  });
  const [location, setLocation] = useState<LocationData>({
    address: '',
    city: '',
    latitude: 0,
    longitude: 0
  });
  const [images, setImages] = useState<File[]>([]);
  const [certifications, setCertifications] = useState<File[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Helper function to check if form is valid
  const isFormValid = () => {
    return (
      formData.title?.trim() &&
      formData.description?.trim() &&
      formData.category &&
      location.address &&
      formData.budget &&
      formData.budget > 0
    );
  };

  useEffect(() => {
    loadCategories();
    if (isEditMode && editJobId) {
      loadJobForEdit(editJobId);
    }
  }, [isEditMode, editJobId]);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadCategories = async () => {
    try {
      const data = await jobAPI.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadJobForEdit = async (jobId: string) => {
    try {
      setLoadingJobData(true);
      const job: Job = await jobAPI.getJob(jobId);
      
      // Pre-fill form data
      setFormData({
        title: job.title,
        description: job.description,
        category: job.category,
        job_type: job.job_type,
        urgent: job.urgent,
        start_date: job.start_date || undefined,
        duration: job.duration || undefined,
        flexible_schedule: job.flexible_schedule,
        payment_type: job.payment_type,
        budget: job.budget,
        budget_currency: job.budget_currency,
        experience_level: job.experience_level,
        special_requirements: job.special_requirements || undefined
      });

      // Pre-fill location data
      setLocation({
        address: job.address,
        city: job.city,
        latitude: job.latitude || 0,
        longitude: job.longitude || 0
      });

      // Note: We can't pre-fill images as they are File objects and we only have URLs
      // The user will need to re-upload images if they want to change them
      
      setNotification({
        type: 'success',
        message: `Job data loaded for editing: "${job.title}"`
      });
      
    } catch (error) {
      console.error('Error loading job for edit:', error);
      setNotification({
        type: 'error',
        message: 'Failed to load job data for editing. Please try again.'
      });
    } finally {
      setLoadingJobData(false);
    }
  };

  const handleInputChange = (field: keyof JobCreateData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (locationData: LocationData) => {
    setLocation(locationData);
    setFormData(prev => ({
      ...prev,
      address: locationData.address,
      city: locationData.city,
      latitude: locationData.latitude,
      longitude: locationData.longitude
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const handleCertificationUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setCertifications(prev => [...prev, ...files].slice(0, 3)); // Max 3 certification files
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeCertification = (index: number) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (asDraft = false) => {
    setLoading(true);
    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        throw new Error('Job title is required');
      }
      if (!formData.description?.trim()) {
        throw new Error('Job description is required');
      }
      if (!formData.category) {
        throw new Error('Please select a category');
      }
      if (!location.address) {
        throw new Error('Please set a job location');
      }
      if (!formData.budget || formData.budget <= 0) {
        throw new Error('Please enter a valid budget');
      }
      
      // Ensure we have location coordinates (set defaults if geocoding failed)
      const locationData = {
        address: location.address,
        city: location.city,
        latitude: location.latitude || 0, // Will be 0 if location wasn't geocoded
        longitude: location.longitude || 0 // Will be 0 if location wasn't geocoded
      };

      const jobData: JobCreateData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        job_type: formData.job_type || 'one-time',
        urgent: formData.urgent || false,
        address: locationData.address,
        city: locationData.city,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        start_date: formData.start_date,
        duration: formData.duration,
        flexible_schedule: formData.flexible_schedule || false,
        payment_type: formData.payment_type || 'fixed',
        budget: formData.budget,
        budget_currency: 'USD',
        experience_level: formData.experience_level || 'any',
        special_requirements: formData.special_requirements?.trim() || undefined,
        images: images
      };

      let response;

      if (isEditMode && editJobId) {
        // Update existing job
        console.log('Updating job with data:', {
          ...jobData,
          images: `${images.length} image(s)`
        });
        response = await jobAPI.updateJob(editJobId, jobData);
        console.log('Job updated successfully:', response);
      } else {
        // Create new job
        console.log('Creating job with data:', {
          ...jobData,
          images: `${images.length} image(s)`
        });
        response = await jobAPI.createJob(jobData);
        console.log('Job created successfully:', response);
        
        // If posting (not saving as draft), publish the job
        if (!asDraft) {
          console.log('Publishing job...');
          try {
            await jobAPI.publishJob(response.job.id);
            console.log('Job published successfully');
          } catch (publishError) {
            console.error('Error publishing job:', publishError);
            // Job was created but not published
            setNotification({
              type: 'error',
              message: `Job "${jobData.title}" was created but could not be published. You can publish it later from your jobs page.`
            });
            return;
          }
        }
      }
      
      // Show success message
      let message;
      if (isEditMode) {
        message = `Job "${jobData.title}" updated successfully!`;
      } else {
        message = asDraft 
          ? `Job "${jobData.title}" saved as draft!`
          : `Job "${jobData.title}" posted successfully and is now live!`;
      }
      
      setNotification({
        type: 'success',
        message: message
      });
      
      // Only reset form for new jobs, not when editing
      if (!isEditMode) {
        setFormData({
          job_type: 'one-time',
          payment_type: 'fixed',
          experience_level: 'any',
          flexible_schedule: false,
          urgent: false,
          budget_currency: 'USD'
        });
        setLocation({
          address: '',
          city: '',
          latitude: 0,
          longitude: 0
        });
        setImages([]);
        setCertifications([]);
        setSelectedLanguages([]);
      }
      
      // TODO: Navigate to job details or my jobs page
      // window.location.href = '/dashboard/client/my-jobs';
      
    } catch (error: unknown) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} job:`, error);
      
      let errorMessage = `Error ${isEditMode ? 'updating' : 'creating'} job. Please try again.`;
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const apiError = error as { response?: { data?: { error?: string; message?: string } } };
        if (apiError.response?.data?.error) {
          errorMessage = apiError.response.data.error;
        } else if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      }
      
      setNotification({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="w-full max-w-6xl mx-auto mt-4">
        {/* Loading state for job data */}
        {loadingJobData && (
          <Alert className="mb-6 border-blue-500/50 text-blue-600 bg-blue-50">
            <AlertDescription>Loading job data for editing...</AlertDescription>
          </Alert>
        )}

        {/* Notification */}
        {notification && (
          <Alert 
            variant={notification.type === 'error' ? 'destructive' : 'default'}
            className={`mb-6 ${notification.type === 'success' ? 'border-green-500/50 text-green-600 bg-green-50' : ''}`}
          >
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}

        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                {isEditMode ? 'Edit Job' : 'Post a Job'}
              </h1>
              <p className="text-base text-zinc-500 mt-1">
                {isEditMode 
                  ? 'Update your job details and requirements'
                  : 'Reach thousands of trusted local workers in minutes'
                }
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
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Category
                  </Label>
                  <Select value={formData.category?.toString()} onValueChange={(value) => handleInputChange('category', parseInt(value))}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-900">
                    Job Type
                  </Label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <RadioGroup 
                        value={formData.job_type} 
                        onValueChange={(value) => {
                          handleInputChange('job_type', value);
                          handleInputChange('urgent', value === 'urgent');
                        }}
                        className="flex gap-6"
                      >
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
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="images"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Images
                  </Label>
                  <div className="relative border border-dashed border-zinc-300 rounded-md p-8 text-center mt-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                      <UploadCloud className="h-8 w-8 text-zinc-400" />
                      <p className="text-sm text-zinc-500">
                        Drop images here or click to upload
                      </p>
                    </div>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-20 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Location - Using LocationPicker */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-zinc-900" />
                <h2 className="text-xl font-semibold text-zinc-900">
                  Step 2: Location
                </h2>
              </div>

              <LocationPicker
                onLocationChange={handleLocationChange}
                initialLocation={location}
              />
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
                    <Input 
                      id="start-date" 
                      type="date" 
                      className="w-full mt-2"
                      value={formData.start_date || ''}
                      onChange={(e) => handleInputChange('start_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Duration
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
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
                    <Switch 
                      id="flexible-schedule"
                      checked={formData.flexible_schedule}
                      onCheckedChange={(checked) => handleInputChange('flexible_schedule', checked)}
                    />
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
                  <RadioGroup 
                    value={formData.payment_type}
                    onValueChange={(value) => handleInputChange('payment_type', value)}
                    className="flex gap-4 mt-2"
                  >
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
                      type="number"
                      placeholder="Enter amount"
                      className="pl-9 mt-2"
                      value={formData.budget || ''}
                      onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
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
                    value={formData.experience_level}
                    onValueChange={(value) => handleInputChange('experience_level', value)}
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
                  <div className="relative border border-dashed border-zinc-300 rounded-md p-8 text-center mt-2">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleCertificationUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                      <UploadCloud className="h-8 w-8 text-zinc-400" />
                      <p className="text-sm text-zinc-500">
                        Upload required certifications
                      </p>
                    </div>
                  </div>
                  {certifications.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {certifications.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-zinc-50 rounded-md">
                          <span className="text-sm text-zinc-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="languages"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Languages
                  </Label>
                  <Select onValueChange={(value) => {
                    if (value && !selectedLanguages.includes(value)) {
                      setSelectedLanguages(prev => [...prev, value]);
                    }
                  }}>
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
                  {selectedLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedLanguages.map((lang, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-zinc-100 text-zinc-900"
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          <button
                            type="button"
                            onClick={() => setSelectedLanguages(prev => prev.filter((_, i) => i !== index))}
                            className="ml-2 text-zinc-600 hover:text-zinc-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
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
                    value={formData.special_requirements || ''}
                    onChange={(e) => handleInputChange('special_requirements', e.target.value)}
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
                      {formData.title || 'Job Title'}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                        {formData.job_type || 'One-time'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                        {categories.find(c => c.id === formData.category)?.name || 'Category'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                        ${formData.budget || 0}{formData.payment_type === 'hourly' ? '/hr' : ''}
                      </span>
                    </div>

                    <div className="my-4 border-t border-zinc-200"></div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-zinc-900 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-zinc-900">
                              Location
                            </h4>
                            <p className="text-sm text-zinc-500 ml-1/2">
                              {location.address || 'Location not set'}
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
                            {formData.start_date ? `Starting ${formData.start_date}` : 'Start date not set'} • {formData.duration || 'Duration not specified'}
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
                              • {formData.experience_level || 'Any'} level
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
                          {formData.description || 'No description provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  className="w-full text-base"
                  onClick={() => handleSubmit(false)}
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (isEditMode ? 'Updating...' : 'Posting...') : (isEditMode ? 'Update Job' : 'Post Job')}
                </Button>
                {!isEditMode && (
                  <Button 
                    variant="outline" 
                    className="w-full text-base"
                    onClick={() => handleSubmit(true)}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save as Draft'}
                  </Button>
                )}
                <p className="text-sm text-center text-zinc-500">
                  {isEditMode ? 'Changes will be saved to your existing job' : 'You can edit this job after posting'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
} 