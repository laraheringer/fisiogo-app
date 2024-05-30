import { AxiosResponse } from 'axios';
import { useApiService } from './ApiService';

export interface User {
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  type?: string;
}

export function useUserService() {
  const apiService = useApiService();

  async function getUsers(): Promise<AxiosResponse<Array<User>>> {
    return await apiService.get('/users');
  }

  async function createUser(user: User): Promise<AxiosResponse<User>> {
    const { _id, ...userWithoutId } = user;
    return await apiService.post('/users', userWithoutId);
  }

  async function updateUser(user: User): Promise<AxiosResponse<User>> {
    return await apiService.put('/users', user);
  }

  async function deleteUser(userId: string): Promise<AxiosResponse<void>> {
    return await apiService.delete(`/users/${userId}`);
  }

  return { getUsers, createUser, updateUser, deleteUser }

}