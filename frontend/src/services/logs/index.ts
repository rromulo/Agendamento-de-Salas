import { ILogProps } from '@/interfaces/log.interface';
import api from '@/app/api/axios';

export const getAllLogs = async (page: number, limit: number = 20, currentPage?: number): Promise<ILogProps[]> => {
  const response = await api.get(`/admin/log/${currentPage ?? page}/${limit}`)
  console.log(response.data)
  return response.data.logs
}

