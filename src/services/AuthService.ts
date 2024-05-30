import { AxiosResponse } from 'axios';
import { useApiService } from './ApiService';

export function useAuthService() {
  const apiService = useApiService();

  async function login(username: string, password: string): Promise<AxiosResponse<string>> {
    return await apiService.post('/login', {username, password});
  }

  return { login }

}