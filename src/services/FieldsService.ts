import { AxiosResponse } from 'axios';
import { useApiService } from './ApiService';

export interface Field {
  _id?: string;
  label?: string;
  type?: string;
  options?: string[];
}

export function useFieldService() {
  const apiService = useApiService();

  async function getFields(): Promise<AxiosResponse<Array<Field>>> {
    return await apiService.get('/fields');
  }

  async function createField(field: Field): Promise<AxiosResponse<Field>> {
    const { _id, ...fieldWithoutId } = field;
    return await apiService.post('/fields', fieldWithoutId);
  }

  async function updateField(field: Field): Promise<AxiosResponse<Field>> {
    return await apiService.put('/fields', field);
  }

  async function deleteField(fieldId: string): Promise<AxiosResponse<void>> {
    return await apiService.delete(`/fields/${fieldId}`);
  }

  return { getFields, createField, updateField, deleteField }
}