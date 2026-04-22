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
export const updateProfile = (data) => api.put('/auth/profile', data);

// Projects
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);

// Donations
export const postDonation = (data) => api.post('/donations', data);
export const getDonationHistory = (id) => api.get(`/donations/history/${id}`);

// Volunteers & Members
export const applyActivity = (data) => api.post('/volunteers/apply', data);
export const getVolunteerActivities = (id) => api.get(`/volunteers/activities/${id}`);
export const updateActivity = (id, data) => api.put(`/volunteers/activities/${id}`, data);
export const getMembers = () => api.get('/volunteers/members');
export const getMember = (id) => api.get(`/volunteers/member/${id}`);

// Advocacy
export const getAdvocacyPosts = () => api.get('/advocacy');
export const getAdvocacy = () => api.get('/advocacy');

// Contact
export const sendContactEmail = (data) => api.post('/contact/send', data);

// Admin
export const createProject = (data) => api.post('/admin/projects', data);
export const updateProject = (id, data) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);

export const createMember = (data) => api.post('/admin/members', data);
export const updateMember = (id, data) => api.put(`/admin/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/admin/members/${id}`);

export const getApplications = () => api.get('/admin/applications');
export const getAllApplications = () => api.get('/admin/applications/all');
export const approveApplication = (id) => api.put(`/admin/applications/${id}/approve`);
export const rejectApplication = (id) => api.put(`/admin/applications/${id}/reject`);
export const issueCertificate = (id) => api.put(`/admin/applications/${id}/issue-certificate`);

export const getAllDonations = () => api.get('/admin/donations');
export const getDonationStats = () => api.get('/admin/donations/stats');

export default api;