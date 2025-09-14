import { IBooking, ICreateBooking } from '@/interfaces/booking,interface';
import api from '@/app/api/axios';
import { toastError, toastSuccess } from '@/utils/toastify';
import { AxiosError } from 'axios';


export const saveBooking = async (dataBooking: ICreateBooking) => {
  try {
    const response = await api.post('/bookings', dataBooking)
    toastSuccess('Agendamento realizado.')
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err?.response?.data?.message) {
      toastError(err.response.data.message);
    } 
  }
  
}

export const getAllBookings = async (page: number, limit: number, name?: string): Promise<{logs: IBooking[] ,page: number, totalPages: number}> => {
  const response = await api.get(`/admin/bookings/${page}/${limit}/${name ?? ''}`)
  return response.data
}
export const getBookinsByUser = async (page: number, limit: number, currentPage?: number): Promise<{logs: IBooking[] ,page: number, totalPages: number}> => {
  const me = await api.get('auth/me');
  const response = await api.get(`/bookings/${me.data.user.id}/${currentPage ?? page}/${limit}`)
  return response.data
}
export const updateBooking = async (userId: string, bookingId: string, status: 'pendente' | 'confirmado' | 'recusado'): Promise<IBooking | undefined> => {
  try {
    const response = await api.patch(`/bookings/${userId}/${bookingId}`, {status})
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err?.response?.data?.message) {
      toastError(err.response.data.message);
    }
  }
}
