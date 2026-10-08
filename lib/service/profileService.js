import api from "./api";

const ENDPOINTS = {
  Teacher: "/api/teacher",
  Student: "/api/student",
  Parent: "/api/parent",
  Librarian: "/api/librarian",
  Admin: "/api/admin",
  User: "/api/user",
};

const profileService = {
  list: async (role, params = {}) => {
    const url = ENDPOINTS[role] ?? ENDPOINTS.User;
    const response = await api.get(url, { params });
    return response.data;
  },

  getById: async (role, id) => {
    const url = ENDPOINTS[role] ?? ENDPOINTS.User;
    const response = await api.get(`${url}/${id}`);
    return response.data;
  },

  update: async (role, id, data) => {
    const url = ENDPOINTS[role] ?? ENDPOINTS.User;
    const response = await api.patch(`${url}/${id}`, data);
    return response.data;
  },

  changeStatus: async (role, id, status) => {
    const url = ENDPOINTS[role] ?? ENDPOINTS.User;
    const response = await api.patch(`${url}/${id}/status`, { status });
    return response.data;
  },

  remove: async (role, id) => {
    const url = ENDPOINTS[role] ?? ENDPOINTS.User;
    const response = await api.delete(`${url}/${id}`);
    return response.data;
  },
};

export default profileService;