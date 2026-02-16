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
      GET_BY_TASK_ID: "/task/:id",
      UPDATE: "/task/:id",
      TOGGLE_ISDONE: "/task/:id/toggle",
      DELETE: "/task/:id",
    },
    USER: {
      GET_BY_ID: "/user/:id",
      UPDATE: "/user/:id",
    },
  },
};
