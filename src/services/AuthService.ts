import { useApiService } from './ApiService';

export function useAuthService() {
  const apiService = useApiService();

  async function login(username: string, password: string): Promise<string> {
    console.log(apiService)
    return await apiService.post('/login', {username, password});
  }

  return { login }

}