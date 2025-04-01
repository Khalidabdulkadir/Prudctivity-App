import api from './api';

export const calendarApi = {
  getEvents: async (params = {}) => {
    const response = await api.get('/calendar/', { params });
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/calendar/${id}/`);
    return response.data;
  },

  createEvent: async (event) => {
    const response = await api.post('/calendar/', event);
    return response.data;
  },

  updateEvent: async (id, event) => {
    const response = await api.put(`/calendar/${id}/`, event);
    return response.data;
  },

  deleteEvent: async (id) => {
    await api.delete(`/calendar/${id}/`);
  },

  bulkDeleteEvents: async (ids) => {
    await api.post('/calendar/bulk_delete/', { ids });
  },

  duplicateEvent: async (id) => {
    const response = await api.post(`/calendar/${id}/duplicate/`);
    return response.data;
  },

  getUpcomingEvents: async () => {
    const response = await api.get('/calendar/upcoming/');
    return response.data;
  },
};
