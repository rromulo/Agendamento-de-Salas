import { ICreateRoom, IRoomInterface } from '@/interfaces/room.interface';
import api from '@/app/api/axios';
import { toastError, toastSuccess } from '@/utils/toastify';

export const saveRoom = async (room: ICreateRoom): Promise<ICreateRoom[]> => {
  const response = await api.post(`/admin/rooms}`, room)
  console.log('', response.data)
  return response.data.logs
}
export const updateRoom = async (id: string, room: ICreateRoom): Promise<void> => {
  try {
    
    await api.patch(`/admin/rooms/${id}`, {name: room.name, openTime: room.openTime, closeTime: room.closeTime, scheduleBlock: room.scheduleBlock})
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