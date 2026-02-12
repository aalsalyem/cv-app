import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface PersonalInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  photoUrl: string;
  objective: string;
}

export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  projects: string;
  sortOrder: number;
}

export interface Education {
  id: number;
  degree: string;
  field: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  sortOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  sortOrder: number;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  sortOrder: number;
}

export interface Language {
  id: number;
  name: string;
  proficiency: string;
  sortOrder: number;
}

export interface Strength {
  id: number;
  name: string;
  sortOrder: number;
}

export interface CvData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
  languages: Language[];
  strengths: Strength[];
}

export interface AuthUser {
  authenticated: boolean;
  email?: string;
  isAdmin?: boolean;
}

// Public API
export const fetchCv = () => api.get<CvData>('/api/cv');

// Auth API
export const getMe = () => api.get<AuthUser>('/api/auth/me');

// Admin API
export const updatePersonalInfo = (data: Partial<PersonalInfo>) =>
  api.put<PersonalInfo>('/api/admin/personal-info', data);

export const createWorkExperience = (data: Partial<WorkExperience>) =>
  api.post<WorkExperience>('/api/admin/work-experience', data);

export const updateWorkExperience = (id: number, data: Partial<WorkExperience>) =>
  api.put<WorkExperience>(`/api/admin/work-experience/${id}`, data);

export const deleteWorkExperience = (id: number) =>
  api.delete(`/api/admin/work-experience/${id}`);

export const createEducation = (data: Partial<Education>) =>
  api.post<Education>('/api/admin/education', data);

export const updateEducation = (id: number, data: Partial<Education>) =>
  api.put<Education>(`/api/admin/education/${id}`, data);

export const deleteEducation = (id: number) =>
  api.delete(`/api/admin/education/${id}`);

export const createSkill = (data: Partial<Skill>) =>
  api.post<Skill>('/api/admin/skills', data);

export const updateSkill = (id: number, data: Partial<Skill>) =>
  api.put<Skill>(`/api/admin/skills/${id}`, data);

export const deleteSkill = (id: number) =>
  api.delete(`/api/admin/skills/${id}`);

export const createCertificate = (data: Partial<Certificate>) =>
  api.post<Certificate>('/api/admin/certificates', data);

export const updateCertificate = (id: number, data: Partial<Certificate>) =>
  api.put<Certificate>(`/api/admin/certificates/${id}`, data);

export const deleteCertificate = (id: number) =>
  api.delete(`/api/admin/certificates/${id}`);

export const createLanguage = (data: Partial<Language>) =>
  api.post<Language>('/api/admin/languages', data);

export const updateLanguage = (id: number, data: Partial<Language>) =>
  api.put<Language>(`/api/admin/languages/${id}`, data);

export const deleteLanguage = (id: number) =>
  api.delete(`/api/admin/languages/${id}`);

export const createStrength = (data: Partial<Strength>) =>
  api.post<Strength>('/api/admin/strengths', data);

export const updateStrength = (id: number, data: Partial<Strength>) =>
  api.put<Strength>(`/api/admin/strengths/${id}`, data);

export const deleteStrength = (id: number) =>
  api.delete(`/api/admin/strengths/${id}`);

export default api;
