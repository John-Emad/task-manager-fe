import { API_CONFIG } from "../config/api.config";
import type { Task, TaskFormData, TaskStatistics } from "../types/task.type";
import { api } from "./api.service";

export const taskService = {
  // Create a new task
  async create(taskData: TaskFormData): Promise<Task> {
    const response = await api.post<Task>(
      API_CONFIG.ENDPOINTS.TASK.CREATE,
      taskData,
    );
    return response.data;
  },

  // Get all tasks for the current user
  async getAllForUser(query?: {
    isDone?: boolean;
    dueDateFrom?: Date;
    dueDateTo?: Date;
    search?: string;
  }): Promise<Task[]> {
    const response = await api.get<Task[]>(
      API_CONFIG.ENDPOINTS.TASK.GET_ALL_FOR_USER,
      { params: query },
    );
    return response.data;
  },

  // Get task by id
  async getById(id: string): Promise<Task> {
    const response = await api.get<Task>(
      API_CONFIG.ENDPOINTS.TASK.GET_BY_TASK_ID(id),
    );
    return response.data;
  },

  // Update a task
  async update(id: string, taskData: TaskFormData): Promise<Task> {
    const response = await api.patch<Task>(
      API_CONFIG.ENDPOINTS.TASK.UPDATE(id),
      taskData,
    );
    return response.data;
  },

  // Delete a task
  async delete(id: string): Promise<void> {
    await api.delete(API_CONFIG.ENDPOINTS.TASK.DELETE(id));
  },

  // Toggle task isDone status
  async toggleIsDone(id: string): Promise<Task> {
    const response = await api.patch<Task>(
      API_CONFIG.ENDPOINTS.TASK.TOGGLE_ISDONE(id),
    );
    return response.data;
  },

  // Get task statistics
  async getStatistics(): Promise<TaskStatistics> {
    const response = await api.get<TaskStatistics>(
      API_CONFIG.ENDPOINTS.TASK.GET_STATISTICS,
    );
    return response.data;
  },

  // Get upcoming tasks
  async getUpcoming(query?: { days?: number }): Promise<Task[]> {
    // Default is 7 days
    const response = await api.get<Task[]>(
      API_CONFIG.ENDPOINTS.TASK.GET_UPCOMING,
      { params: query },
    );
    return response.data;
  },

  // Get overdue tasks
  async getOverdue(): Promise<Task[]> {
    const response = await api.get<Task[]>(
      API_CONFIG.ENDPOINTS.TASK.GET_OVERDUE,
    );
    return response.data;
  },
};
