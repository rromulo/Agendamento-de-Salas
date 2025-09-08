import { IRoomProps } from '@core/entities/room.entity';

export interface IRoomRepository {
  findById(id: string): Promise<Partial<IRoomProps>>;
  findByName(name: string): Promise<IRoomProps | null>;
  save(room: Partial<IRoomProps>): Promise<Partial<IRoomProps>>;
  update(id: string, room: Partial<IRoomProps>): Promise<Partial<IRoomProps>>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<IRoomProps[]>;
}