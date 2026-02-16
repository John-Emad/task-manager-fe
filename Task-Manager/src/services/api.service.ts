import type { AxiosInstance } from "axios";
import axios from "axios";
import { API_CONFIG } from "../config/api.config";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      withCredentials: true, // Required for cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - Logging only (cookies sent automatically)
    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public getApi(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
export const api = apiService.getApi();
