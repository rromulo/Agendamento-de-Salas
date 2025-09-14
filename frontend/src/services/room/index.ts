import { ICreateRoom, IRoomInterface, IRoomUpdate } from '@/interfaces/room.interface';
import api from '@/app/api/axios';
import { toastError, toastSuccess } from '@/utils/toastify';
import { AxiosError } from 'axios';

export const saveRoom = async (room: ICreateRoom): Promise<void> => {
  try {
    const response = await api.post(`/admin/rooms`, room)
    toastSuccess('Nova sala criada com sucesso')
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err?.response?.data?.message) {
      toastError(err.response.data.message);
    } 
  }
}
export const updateRoom = async (id: string, room: IRoomUpdate): Promise<void> => {
  try {
    
    await api.patch(`/admin/rooms/${id}`, {name: room.name, openTime: room.openTime, closeTime: room.closeTime})
    toastSuccess('Sala atualizada com sucesso!')
    await getAllRooms()
  } catch (error) {
    toastError('Ocorreu um erro ao tentar atualizar a sala')
  }
}
export const getAllRooms = async (): Promise<IRoomInterface[]> => {
  const response = await api.get('/rooms')
  return response.data
}