//api.service.ts

import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  AuthResponse,
  ErrorResponse,
  LoginFormData,
  MessageResponse,
  SignupFormData,
  UpdateProfileData,
  User,
  UserResponse,
} from '../types/index';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
const handleError = (error: AxiosError<ErrorResponse>): never => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  throw new Error(message);
};

// Auth API
export const authAPI = {
  // Signup
  signup: async (data: Omit<SignupFormData, 'confirmPassword'>): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/signup', data);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },

  // Login
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', data);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<UserResponse> => {
    try {
      const response: AxiosResponse<UserResponse> = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async (): Promise<UserResponse> => {
    try {
      const response: AxiosResponse<UserResponse> = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: User }> => {
    try {
      const response: AxiosResponse<{ message: string; user: User }> = await api.put('/user/profile', data);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },
};

// Admin API
export const adminAPI = {
 

  // Get all users
  getAllUsers: async (): Promise<{ users: User[] }> => {
    try {
      const response: AxiosResponse<{ users: User[] }> = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get user by ID
  getUserById: async (userId: string): Promise<UserResponse> => {
    try {
      const response: AxiosResponse<UserResponse> = await api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },

  // Update user role
  updateUserRole: async (userId: string, role: string): Promise<{ message: string; user: User }> => {
    try {
      const response: AxiosResponse<{ message: string; user: User }> = await api.put(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },

  // Delete user
  deleteUser: async (userId: string): Promise<MessageResponse> => {
    try {
      const response: AxiosResponse<MessageResponse> = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ErrorResponse>);
    }
  },
};

export default api;