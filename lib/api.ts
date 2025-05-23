import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/register/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    // Don't use the authenticated api instance for login
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/login/`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  
  refreshToken: async (refreshToken: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/refresh/`, { refresh: refreshToken });
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
};

export default api; 