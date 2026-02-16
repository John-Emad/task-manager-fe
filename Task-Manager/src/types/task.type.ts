export interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dueDate?: Date | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: string;
  isDone?: boolean;
}

export interface TaskStatistics {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  completionRate: number;
}
