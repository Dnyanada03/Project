import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProfile = () => api.get('/auth/profile');

// Projects
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);

// Donations
export const postDonation = (data) => api.post('/donations', data);
export const getDonationHistory = (id) => api.get(`/donations/history/${id}`);

// Volunteers
export const applyActivity = (data) => api.post('/volunteers/apply', data);
export const getVolunteerActivities = (id) => api.get(`/volunteers/activities/${id}`);

export default api;
