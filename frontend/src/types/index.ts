//types

export type UserRole = 'user' | 'admin';
  
  // User interface
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt?: string;
    updatedAt?: string;
  }
  
  // Auth state interface
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  // Authentication context interface
  export interface AuthContextType {
    auth: AuthState;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: { name?: string; email?: string }) => Promise<void>;
  }
  
  // Login form data
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  // Signup form data
  export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  // Update profile form data
  export interface UpdateProfileData {
    name?: string;
    email?: string;
  }
  
  // API response interfaces
  export interface AuthResponse {
    token: string;
    user: User;
    message: string;
  }
  
  export interface UserResponse {
    user: User;
  }
  
  export interface MessageResponse {
    message: string;
  }
  
  export interface ErrorResponse {
    message: string;
  }