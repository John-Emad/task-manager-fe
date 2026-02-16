export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
    },
    TASK: {
      CREATE: "/task",
      GET_ALL_FOR_USER: "/task",
      GET_STATISTICS: "/task/statistics",
      GET_UPCOMING: "/task/upcoming",
      GET_OVERDUE: "/task/overdue",
      GET_BY_TASK_ID: (id: string) => `/task/${id}`,
      UPDATE: (id: string) => `/task/${id}`,
      TOGGLE_ISDONE: (id: string) => `/task/${id}/toggle`,
      DELETE: (id: string) => `/task/${id}`,
    },
    USER: {
      GET_BY_ID: (id: string) => `/user/${id}`,
      UPDATE: (id: string) => `/user/${id}`,
      DELETE: (id: string) => `/user/${id}`,
    },
  },

  auth: {
    login: () => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
    register: () =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`,
    logout: () => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`,
  },

  // User endpoints
  user: {
    update: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE(id)}`,
    getById: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_BY_ID(id)}`,
    delete: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.DELETE(id)}`,
  },

  // Task Endpoints
  task: {
    create: () => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.CREATE}`,
    getAllForUser: () =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.GET_ALL_FOR_USER}`,
    getStatistics: () =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.GET_STATISTICS}`,
    getUpcoming: () =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.GET_UPCOMING}`,
    getOverdue: () =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.GET_OVERDUE}`,
    getById: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.GET_BY_TASK_ID(id)}`,
    update: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.UPDATE(id)}`,
    toggleIsDone: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.TOGGLE_ISDONE(id)}`,
    delete: (id: string) =>
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASK.DELETE(id)}`,
  },
};
