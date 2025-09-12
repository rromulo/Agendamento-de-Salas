import { IBooking, ICreateBooking } from '@/interfaces/booking,interface';
import api from '@/app/api/axios';

export const getAllBookings = async (page: number, limit: number, currentPage?: number): Promise<IBooking[]> => {
  const response = await api.get(`/admin/bookings/${currentPage ?? page}/${limit}`)
  console.log(response.data)
  return response.data.logs
}
export const updateBooking = async (userId: string, bookingId: string, status: 'pendente' | 'confirmado' | 'recusado'): Promise<IBooking> => {
  const response = await api.patch(`/bookings/${userId}/${bookingId}`, {status})
  console.log('RESPONSE UPDATEBOOKING ->', response)
  return response.data
}
