import { api } from "./api.service";
import { API_CONFIG } from "../config/api.config";
import type { SignUpFormData, SignInFormData } from "../types/auth.type";
import type { User } from "../types/user.type";

// Uses pure cookie-based authentication - tokens stored in HttpOnly cookies
export const authService = {
  // Login a system user
  async login(credentials: SignInFormData): Promise<User> {
    const response = await api.post<{ user: User }>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials,
    );

    // Extract user from nested response
    const user = response.data.user;

    // Store user data in localStorage for UI rendering
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  },

  // Register new user
  async register(userData: SignUpFormData): Promise<User> {
    const response = await api.post<{ user: User }>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      userData,
    );

    // Extract user from nested response
    const user = response.data.user;

    // Store user data in localStorage for UI rendering
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get<User>(
      API_CONFIG.ENDPOINTS.USER.GET_BY_ID("me"),
    );

    // Extract user from nested response
    const user = response.data;

    // Update user data in localStorage
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  },

  //Logout current user
  async logout(): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
      );
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
