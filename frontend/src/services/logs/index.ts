import { ICreateLog, ILogProps } from '@/interfaces/log.interface';
import api from '@/app/api/axios';
import { AxiosError } from 'axios';
import { toastError } from '@/utils/toastify';

export const getAllLogs = async (page: number, limit: number = 20, currentPage?: number): Promise<{logs: ILogProps[], page: number, totalPages: number}> => {
  const response = await api.get(`/admin/log/${currentPage ?? page}/${limit}`)
  return response.data
}

export const getAllLogsByUser = async (page: number, limit: number = 20, currentPage?: number): Promise<{logs: ILogProps[], page: number, totalPages: number} | undefined> => {
  try {
    
    const me = await api.get(`/auth/me`);
  
    const response = await api.get(`/log/${me.data.user.id}/${currentPage ?? page}/${limit}`)
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err?.response?.data?.message) {
      toastError(err.response.data.message);
    } 
    
  }
}

export const saveLog = async(dataLog: ICreateLog) => {
  const response = await api.post('/log', dataLog);
  if(response.status === 200) {
    return response.status
  }
  
}

