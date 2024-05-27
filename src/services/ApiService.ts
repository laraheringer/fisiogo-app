import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '../providers/AuthProvider';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

function setupInterceptors(token: string) {
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export function useApiService() {
  const { token } = useAuth();
  setupInterceptors(token);
  return api;
}