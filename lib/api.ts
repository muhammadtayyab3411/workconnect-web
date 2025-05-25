import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Constants
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function to get auth token
const getAuthHeader = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage if we're in the browser
    const token = getAuthHeader();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refreshing
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Check if error is due to expired token
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Don't retry if we already tried refreshing or if there's no originalRequest
    if (!originalRequest || originalRequest._retry || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't try to refresh tokens for auth endpoints (login, register, etc.)
    const isAuthEndpoint = originalRequest.url?.includes('/auth/');
    if (isAuthEndpoint) {
      return Promise.reject(error);
    }
    
    // Mark that we're retrying this request
    originalRequest._retry = true;
    
    try {
      // Get refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        // No refresh token, clear any stale tokens and reject
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        Cookies.remove('accessToken', { path: '/' });
        return Promise.reject(error);
      }
      
      // Try to refresh the token
      const response = await authAPI.refreshToken(refreshToken);
      const { access } = response;
      
      // Store the new token
      localStorage.setItem('accessToken', access);
      Cookies.set('accessToken', access, { path: '/' });
      
      // Update Authorization header
      originalRequest.headers['Authorization'] = `Bearer ${access}`;
      
      // Retry the original request
      return api(originalRequest);
    } catch {
      // If refresh fails, clear tokens but don't redirect automatically
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Cookies.remove('accessToken', { path: '/' });
      
      // Only redirect if we're not on auth pages
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isOnAuthPage = currentPath.startsWith('/auth/') || currentPath === '/';
        
        if (!isOnAuthPage) {
          // Only redirect to login if user is on a protected page
          window.location.href = '/auth/login';
        }
      }
      
      return Promise.reject(error);
    }
  }
);

// Authentication API
export const authAPI = {
  register: async (userData: {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    role: string;
    phone_number?: string;
  }) => {
    // Don't use the authenticated api instance for registration
    const response = await axios.post(`${API_BASE_URL}/auth/register/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    // Don't use the authenticated api instance for login
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  
  refreshToken: async (refreshToken: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, { refresh: refreshToken });
    return response.data;
  },
  
  socialLogin: async (provider: string, accessToken: string, idToken?: string) => {
    const payload: { provider: string; access_token: string; id_token?: string } = {
      provider,
      access_token: accessToken,
    };
    
    if (idToken) {
      payload.id_token = idToken;
    }
    
    const response = await api.post('/auth/social-login/', payload);
    return response.data;
  },

  // Simplified social login with ID token only
  socialLoginWithIdToken: async (provider: string, idToken: string) => {
    const response = await api.post('/auth/social-login/', {
      provider,
      access_token: idToken, // Use ID token as access token for simplicity
      id_token: idToken,
    });
    return response.data;
  },

  // Google login with ID token
  googleLogin: async (idToken: string) => {
    const response = await api.post('/auth/google-login/', {
      id_token: idToken,
    });
    return response.data;
  },
};

// User profile type
export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
  phone_number: string | null;
  address: string | null;
  date_of_birth: string | null;
  profile_picture: string | null;
  bio: string | null;
  skills: string[];
  languages: string[];
  years_of_experience: number | null;
  experience_description: string | null;
  average_rating: number;
  total_reviews: number;
  total_completed_jobs: number;
  rating_display: string;
  experience_display: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Profile update data type
export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  date_of_birth?: string;
  bio?: string;
  skills?: string[];
  languages?: string[];
  years_of_experience?: number;
  experience_description?: string;
}

// Document interfaces
export interface Document {
  id: string;
  document_type: 'national_id' | 'address_proof' | 'license';
  document_type_display: string;
  status: 'pending' | 'verified' | 'rejected' | 'manual_review';
  status_display: string;
  document_url: string | null;
  confidence_score: number | null;
  verification_notes: string;
  uploaded_at: string;
  verified_at: string | null;
  verification_data: Record<string, unknown> | null;
}

export interface DocumentUpload {
  document_type: 'national_id' | 'address_proof' | 'license';
  document_file: File;
}

export interface DocumentUploadResponse {
  message: string;
  document: Document;
  verification_result: {
    status: string;
    confidence: number;
    extracted_data: Record<string, unknown>;
    issues: string[];
    reasoning: string;
  };
}

// Job-related interfaces
export interface JobCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
}

export interface JobImage {
  id: number;
  image_url: string;
  caption: string;
  order: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: number;
  category_name: string;
  category_slug: string;
  job_type: 'one-time' | 'recurring' | 'urgent';
  job_type_display: string;
  urgent: boolean;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  status_display: string;
  address: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  start_date: string | null;
  duration: string | null;
  duration_display: string | null;
  flexible_schedule: boolean;
  payment_type: 'fixed' | 'hourly';
  payment_type_display: string;
  budget: number;
  budget_currency: string;
  budget_display: string;
  experience_level: 'any' | 'beginner' | 'experienced' | 'expert';
  experience_level_display: string;
  special_requirements: string;
  views_count: number;
  applications_count: number;
  images: JobImage[];
  client_name: string;
  client_email: string;
  posted_time_ago: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  expires_at: string | null;
}

export interface JobListItem {
  id: string;
  title: string;
  description: string;
  category_name: string;
  city: string;
  job_type: 'one-time' | 'recurring' | 'urgent';
  urgent: boolean;
  budget_display: string;
  posted_time_ago: string;
  client_name: string;
  status: string;
}

export interface JobCreateData {
  title: string;
  description: string;
  category: number;
  job_type: 'one-time' | 'recurring' | 'urgent';
  urgent?: boolean;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  start_date?: string;
  duration?: string;
  flexible_schedule?: boolean;
  payment_type: 'fixed' | 'hourly';
  budget: number;
  budget_currency?: string;
  experience_level?: 'any' | 'beginner' | 'experienced' | 'expert';
  special_requirements?: string;
  images?: File[];
}

export interface JobUpdateData {
  title?: string;
  description?: string;
  category?: number;
  job_type?: 'one-time' | 'recurring' | 'urgent';
  urgent?: boolean;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  start_date?: string;
  duration?: string;
  flexible_schedule?: boolean;
  payment_type?: 'fixed' | 'hourly';
  budget?: number;
  budget_currency?: string;
  experience_level?: 'any' | 'beginner' | 'experienced' | 'expert';
  special_requirements?: string;
  images?: File[];
}

export interface JobFilters {
  category?: string;
  city?: string;
  job_type?: string;
  urgent?: boolean;
  min_budget?: number;
  max_budget?: number;
  search?: string;
  ordering?: string;
}

// Client job interface for my-jobs page
export interface ClientJob {
  id: string;
  title: string;
  category: string;
  status: "active" | "under-review" | "completed";
  location: string;
  budget: string;
  postedDate: string;
}

// Client job detail interface for job detail page
export interface ClientJobDetail {
  id: string;
  title: string;
  category: string;
  status: "active" | "under-review" | "completed";
  location: string;
  budget: string;
  postedDate: string;
  description: string;
  requiredSkills: string[];
  timeline: string;
  attachments: JobImage[];
  applications: {
    total: number;
    reviewed: number;
  };
  topApplicants: {
    id: string;
    name: string;
    avatar: string | null;
    rating: number;
    bid: string;
    description: string;
  }[];
  activityTimeline: {
    id: string;
    title: string;
    date: string;
    description: string;
  }[];
  timeRemaining: string;
  special_requirements: string;
  job_type: string;
  urgent: boolean;
  payment_type: string;
  experience_level: string;
  start_date: string | null;
  duration: string | null;
  flexible_schedule: boolean;
  views_count: number;
  applications_count: number;
}

// Job report interface
export interface JobReport {
  job_id: string;
  title: string;
  category: string;
  status: string;
  budget: string;
  location: string;
  posted_date: string;
  description: string;
  applications_count: number;
  views_count: number;
  bids: {
    worker_name: string;
    worker_email: string;
    bid_amount: string;
    status: string;
    submitted_at: string;
    proposal_excerpt: string;
  }[];
}

// Bid/Proposal interfaces
export interface Bid {
  id: string;
  job: string;
  job_title: string;
  worker: number;
  worker_name: string;
  worker_email: string;
  price: number;
  price_display: string;
  availability: string;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  status_display: string;
  documents: BidDocument[];
  work_samples: WorkSample[];
  submitted_at: string;
  response_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BidDocument {
  id: string;
  name: string;
  file_url: string;
  file_size: number;
  uploaded_at: string;
}

export interface WorkSample {
  id: string;
  name: string;
  image_url: string;
  uploaded_at: string;
}

export interface BidCreateData {
  price: number;
  availability: string;
  proposal: string;
  documents?: File[];
  work_samples?: File[];
}

export interface BidUpdateData {
  price?: number;
  availability?: string;
  proposal?: string;
  documents?: File[];
  work_samples?: File[];
}

// User API
export const userAPI = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },
  
  updateProfile: async (profileData: ProfileUpdateData): Promise<UserProfile> => {
    const response = await api.patch('/auth/profile/', profileData);
    return response.data;
  },
  
  uploadProfilePicture: async (file: File): Promise<{ message: string; profile_picture_url: string | null }> => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    
    const response = await api.post('/auth/profile/picture/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Document management
  getDocuments: async (): Promise<Document[]> => {
    const response = await api.get('/documents/');
    return response.data;
  },

  uploadDocument: async (documentData: DocumentUpload): Promise<DocumentUploadResponse> => {
    const formData = new FormData();
    formData.append('document_type', documentData.document_type);
    formData.append('document_file', documentData.document_file);

    const response = await api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getDocument: async (documentId: string): Promise<Document> => {
    const response = await api.get(`/documents/${documentId}/`);
    return response.data;
  },

  deleteDocument: async (documentId: string): Promise<void> => {
    await api.delete(`/documents/${documentId}/`);
  },

  reverifyDocument: async (documentId: string): Promise<DocumentUploadResponse> => {
    const response = await api.post(`/documents/${documentId}/reverify/`);
    return response.data;
  },
};

// Job API
export const jobAPI = {
  // Get job categories
  getCategories: async (): Promise<JobCategory[]> => {
    const response = await api.get('/job-categories/');
    return response.data;
  },

  // List jobs with filters
  getJobs: async (filters?: JobFilters): Promise<JobListItem[]> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get(`/jobs/?${params.toString()}`);
    return response.data;
  },

  // Get job details
  getJob: async (jobId: string): Promise<Job> => {
    const response = await api.get(`/jobs/${jobId}/`);
    return response.data;
  },

  // Create new job (clients only)
  createJob: async (jobData: JobCreateData): Promise<{ message: string; job: Job }> => {
    const formData = new FormData();
    
    // Add job fields
    Object.entries(jobData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        // Handle images separately
        value.forEach((file: File) => {
          formData.append('images', file);
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const response = await api.post('/jobs/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update job (owner only)
  updateJob: async (jobId: string, jobData: JobUpdateData): Promise<{ message: string; job: Job }> => {
    const formData = new FormData();
    
    Object.entries(jobData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((file: File) => {
          formData.append('images', file);
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const response = await api.patch(`/jobs/${jobId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete job (owner only)
  deleteJob: async (jobId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/jobs/${jobId}/`);
    return response.data;
  },

  // Publish draft job
  publishJob: async (jobId: string): Promise<{ message: string; job: Job }> => {
    const response = await api.post(`/jobs/${jobId}/publish/`);
    return response.data;
  },

  // Close open job
  closeJob: async (jobId: string): Promise<{ message: string; job: Job }> => {
    const response = await api.post(`/jobs/${jobId}/close/`);
    return response.data;
  },

  // Search jobs
  searchJobs: async (query: string, filters?: JobFilters): Promise<JobListItem[]> => {
    const params = new URLSearchParams();
    params.append('search', query);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get(`/jobs/?${params.toString()}`);
    return response.data;
  },

  // Get client's jobs for my-jobs page
  getMyJobs: async (filters?: { search?: string; status?: string }): Promise<ClientJob[]> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get(`/jobs/my-jobs/?${params.toString()}`);
    return response.data;
  },

  // Get detailed job information for client job detail page
  getMyJobDetail: async (jobId: string): Promise<ClientJobDetail> => {
    const response = await api.get(`/jobs/${jobId}/detail/`);
    return response.data;
  },

  // Mark job as completed
  markJobCompleted: async (jobId: string): Promise<{ message: string; job: ClientJobDetail }> => {
    const response = await api.post(`/jobs/${jobId}/mark-completed/`);
    return response.data;
  },

  // Duplicate job
  duplicateJob: async (jobId: string): Promise<{ message: string; job: Job }> => {
    const response = await api.post(`/jobs/${jobId}/duplicate/`);
    return response.data;
  },

  // Download job report
  downloadJobReport: async (jobId: string): Promise<{ message: string; report: JobReport; download_url: string }> => {
    const response = await api.get(`/jobs/${jobId}/download-report/`);
    return response.data;
  },
};

// Bid API
export const bidAPI = {
  // Submit a bid for a job (workers only)
  submitBid: async (jobId: string, bidData: BidCreateData): Promise<{ message: string; bid: Bid }> => {
    const formData = new FormData();
    
    // Add job ID to the form data
    formData.append('job', jobId);
    
    // Add bid fields
    formData.append('price', bidData.price.toString());
    formData.append('availability', bidData.availability);
    formData.append('proposal', bidData.proposal);
    
    // Add documents if provided
    if (bidData.documents && bidData.documents.length > 0) {
      bidData.documents.forEach((file: File) => {
        formData.append('documents', file);
      });
    }
    
    // Add work samples if provided
    if (bidData.work_samples && bidData.work_samples.length > 0) {
      bidData.work_samples.forEach((file: File) => {
        formData.append('work_samples', file);
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/bids/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthHeader()}`
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to submit bid');
    }

    return response.json();
  },

  // Get worker's bids
  getMyBids: async (): Promise<Bid[]> => {
    const response = await fetch(`${API_BASE_URL}/bids/`, {
      headers: {
        'Authorization': `Bearer ${getAuthHeader()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bids');
    }

    const data = await response.json();
    return data.results || data;
  },

  // Get bids for a specific job (for clients)
  getJobBids: async (jobId: string): Promise<Bid[]> => {
    const response = await fetch(`${API_BASE_URL}/bids/?job=${jobId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthHeader()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job bids');
    }

    const data = await response.json();
    return data.results || data;
  },

  // Accept a bid (clients only)
  acceptBid: async (bidId: string): Promise<{ message: string; bid: Bid }> => {
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/accept/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthHeader()}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to accept bid');
    }

    return response.json();
  },

  // Reject a bid (clients only)
  rejectBid: async (bidId: string): Promise<{ message: string; bid: Bid }> => {
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/reject/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthHeader()}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to reject bid');
    }

    return response.json();
  },

  // Withdraw a bid (workers only)
  withdrawBid: async (bidId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthHeader()}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to withdraw bid');
    }

    return response.json();
  }
};

// Worker interfaces
export interface Worker {
  id: number;
  name: string;
  occupation: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  availableNow: boolean;
  verified: boolean;
  backgroundCheck: boolean;
  skills: string[];
  bio: string;
  image: string;
}

export interface WorkerCategory {
  name: string;
  count: number;
  icon: string;
}

export interface WorkerFilters {
  search?: string;
  category?: string;
  location?: string;
  verified_only?: boolean;
  min_rating?: string;
  available_only?: boolean;
  sort_by?: string;
}

export interface WorkersResponse {
  workers: Worker[];
  categories: WorkerCategory[];
  total_count: number;
}

// Worker detail interface for worker profile page
export interface WorkerDetail {
  id: number;
  name: string;
  title: string;
  occupation: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  availableNow: boolean;
  verified: boolean;
  skills: string[];
  completionRate: number;
  joined: string;
  about: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: {
    name: string;
    year: string;
  }[];
  languages: string[];
  workHistory: {
    jobTitle: string;
    clientName: string;
    rating: number;
    review: string;
    date: string;
  }[];
  image: string;
}

// Workers API
export const workersAPI = {
  // Get workers with filtering and search
  getWorkers: async (filters?: WorkerFilters): Promise<WorkersResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get(`/workers/?${params.toString()}`);
    return response.data;
  },

  // Get individual worker details
  getWorkerDetail: async (workerId: string): Promise<WorkerDetail> => {
    const response = await api.get(`/workers/${workerId}/`);
    return response.data;
  },
};

// Job bids interfaces
export interface JobBidsStats {
  averageBid: string;
  bidRange: string;
  averageTimeline: string;
  topRatedBidders: number;
}

export interface JobBidder {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  bid: string;
  timeline: string;
  proposal: string;
  skills: string[];
  attachments: number;
  status: string;
  submitted_at: string;
  worker_id: number;
}

export interface JobBidsData {
  total: number;
  posted: string;
  stats: JobBidsStats;
  bidders: JobBidder[];
}

export interface JobBidsResponse {
  id: string;
  title: string;
  category: string;
  status: string;
  bids: JobBidsData;
}

// Job bids API
export const jobBidsAPI = {
  // Get bids for a specific job (clients only)
  getJobBids: async (jobId: string): Promise<JobBidsResponse> => {
    const response = await api.get(`/jobs/${jobId}/bids/`);
    return response.data;
  },

  // Accept a bid (clients only)
  acceptBid: async (bidId: string): Promise<{ message: string; bid: Bid }> => {
    const response = await api.post(`/bids/${bidId}/accept/`);
    return response.data;
  },

  // Reject a bid (clients only)
  rejectBid: async (bidId: string): Promise<{ message: string; bid: Bid }> => {
    const response = await api.post(`/bids/${bidId}/reject/`);
    return response.data;
  },
};

export default api; 