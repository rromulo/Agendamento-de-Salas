import { IUserProps, ICreateUser, IAddress } from '@/interfaces/cliente.interface';
import api from '@/app/api/axios';
import { toastError, toastSuccess } from '@/utils/toastify';

export const getAllUsers = async () => {
  try {
    const response = await api.get(`/admin/users`)
    console.log(response.data)
    return response.data
  } catch (error) {
    toastError('Erro ao pesquisar clientes')    
  }
}
// export const getAllUsers = async (page: number, limit: number, currentPage?: number): Promise<IBooking[]> => {
//   const response = await api.get(`/admin/bookings/${currentPage ?? page}/${limit}`)
//   console.log(response.data)
//   return response.data.logs
// }
// export const updateBooking = async (userId: string, bookingId: string, status: 'pendente' | 'confirmado' | 'recusado'): Promise<IBooking> => {
//   const response = await api.patch(`/bookings/${userId}/${bookingId}`, {status})
//   console.log('RESPONSE UPDATEBOOKING ->', response)
//   return response.data
// }
export const setSchedulingPermission = async (userId: string, data: Partial<ICreateUser>) => {
  try {
    await api.patch(`/user/canScheduling/${userId}`, data);
    toastSuccess('Permissão de agendamento de usuário alterada com sucesso.');
    return await getAllUsers();
  } catch (error) {
    toastError('Error ao mudar permissão de agendamento de usuário')
  }
}
export const setViewLogsPermission = async (userId: string, data: Partial<ICreateUser>) => {
  try {
    await api.patch(`/user/canViewLogs/${userId}`, data);
    toastSuccess('Permissão de logs de usuário alterada com sucesso.');
    return await getAllUsers();
  } catch (error) {
    toastError('Error ao mudar permissão de logs de usuário')
  }
}
export const setActivePermission = async (userId: string, data: Partial<ICreateUser>) => {
  try {
    await api.patch(`/user/isActive/${userId}`, data);
    toastSuccess('Conta de usuário desativado com sucesso.');
    return await getAllUsers();
  } catch (error) {
    toastError('Error ao desativar conta de usuário')
  }
}