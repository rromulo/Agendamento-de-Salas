import { ICreateRoom, IRoomProps } from '../../core/entities/room.entity';
import { IRoomRepository } from '../../core/repositories/interfaces/room.repository.interface';
import resp from '../../utils/resp';

export class RoomUseCase {
  constructor (private readonly roomRepository: IRoomRepository) {}

  async saveRoom(room: ICreateRoom): Promise<{ status: number; message: unknown; }> {
    const response = await this.roomRepository.save(room)
    return resp(201, response)
  }

  async updateRoom(id: string, room: Partial<IRoomProps>): Promise<{ status: number; message: unknown; }>  {
    const response = await this.roomRepository.update(id, room);
    return resp(200, response)
  }
}