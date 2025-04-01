import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getTasks: async (params = {}) => {
    const response = await api.get('/tasks/', { params });
    return response.data;
  },
  
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}/`);
    return response.data;
  },
  
  createTask: async (task) => {
    const response = await api.post('/tasks/', task);
    return response.data;
  },
  
  updateTask: async (id, task) => {
    const response = await api.put(`/tasks/${id}/`, task);
    return response.data;
  },
  
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}/`);
  },
  
  bulkDeleteTasks: async (ids) => {
    await api.post('/tasks/bulk_delete/', { ids });
  },
  
  toggleTaskComplete: async (id, completed) => {
    const response = await api.patch(`/tasks/${id}/`, { completed });
    return response.data;
  },
};

export default api;
