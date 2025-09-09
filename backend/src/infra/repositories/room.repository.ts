import { IRoomRepository } from '@core/repositories/interfaces/room.repository.interface';
import { ICreateRoom, IRoomProps, Room } from '@core/entities/room.entity';
import RoomModel from '@infra/database/models/room.model';
import ApiError from '@utils/apiError';
import schemas from 'src/validations/schemas';

export class RoomRepository implements IRoomRepository {
  async save(room: Partial<IRoomProps>): Promise<Partial<IRoomProps>> {
    try {
      const { error } = schemas.room.validate(room);
      if (error) throw new ApiError(422, error.message);
      const response = await RoomModel.create({...room})

      return new Room(response.toJSON()).getPublicRoom();
    } catch (error: any) {
      throw new ApiError(500, error.message)
    }
  };

  async findAll(): Promise<IRoomProps[]> {
    const data = await RoomModel.findAll();
    return data
  };

  async findById(id: string): Promise<Partial<IRoomProps>> {
    const response = await RoomModel.findByPk(id)
    
    if(!response) throw new ApiError(404, 'Sala não encontrada.')

    return new Room(response.toJSON()).getPublicRoom();
  };

  findByName(name: string): Promise<IRoomProps | null> {
    throw new Error('Method not implemented.');
  };

  async update(id: string, room: Partial<IRoomProps>): Promise<Partial<IRoomProps>> {
    const response = await RoomModel.update(
      {...room},
      {
        where: { id }
      },
    )
    return await this.findById(id);
  };
  
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}