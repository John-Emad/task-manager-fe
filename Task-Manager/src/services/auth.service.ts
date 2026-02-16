import { api } from "./api.service";
import { API_CONFIG } from "../config/api.config";
import type { SignUpFormData, SignInFormData } from "../types/auth.type";
import type { User } from "../types/user.type";

// Uses pure cookie-based authentication - tokens stored in HttpOnly cookies
export const authService = {
  // Login a system user
  async login(credentials: SignInFormData): Promise<User> {
    const response = await api.post<User>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials,
    );

    // Store user data in localStorage for UI rendering
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  // Register new user
  async register(userData: SignUpFormData): Promise<User> {
    const response = await api.post<User>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      userData,
    );

    // Store user data in localStorage for UI rendering
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get<User>(
      API_CONFIG.ENDPOINTS.USER.GET_BY_ID.replace(":id", "me"),
    );

    // Update user data in localStorage
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  //Logout current user
  async logout(): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      return response.data;
    } finally {
      // Clear user data from localStorage
      localStorage.removeItem("user");
    }
  },

  // Check if user is authenticated
  async checkAuth(): Promise<{ isAuthenticated: boolean; user: User | null }> {
    try {
      const user = await this.getProfile();
      return { isAuthenticated: true, user };
    } catch (error) {
      return { isAuthenticated: false, user: null };
    }
  },

  //Get stored user data from localStorage
  getStoredUser(): User | null {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
      return null;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  },
};
