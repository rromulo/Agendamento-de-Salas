import { IBooking, ICreateBooking } from '@/interfaces/booking,interface';
import api from '@/app/api/axios';
import { toastError, toastSuccess } from '@/utils/toastify';


export const saveBooking = async (dataBooking: ICreateBooking) => {
  try {
    const response = await api.post('/bookings', dataBooking)
    toastSuccess('Agendamento realizado.')
  } catch (error: any) {
    if(error && error?.response) {
      toastError(error?.response?.data?.message)
    }
  }
  
}

export const getAllBookings = async (page: number, limit: number, currentPage?: number): Promise<{logs: IBooking[] ,page: number, totalPages: number}> => {
  const response = await api.get(`/admin/bookings/${currentPage ?? page}/${limit}`)
  console.log(response.data)
  return response.data
}
export const getBookinsByUser = async (page: number, limit: number, currentPage?: number): Promise<{logs: IBooking[] ,page: number, totalPages: number}> => {
  const me = await api.get('auth/me');
  console.log('ME BY USER', me, me.data)
  const response = await api.get(`/bookings/${me.data.user.id}/${currentPage ?? page}/${limit}`)
  console.log('RESPONSE GET BOOKIS BY USER',response.data)
  return response.data
}
export const updateBooking = async (userId: string, bookingId: string, status: 'pendente' | 'confirmado' | 'recusado'): Promise<IBooking> => {
  const response = await api.patch(`/bookings/${userId}/${bookingId}`, {status})
  console.log('RESPONSE UPDATEBOOKING ->', response)
  return response.data
}
