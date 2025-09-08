import { Room } from '@entities/room.entity';

export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
  findByName(name: string): Promise<Room | null>;
  save(room: Room): Promise<Room>;
  update(room: Room): Promise<Room>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Room[]>;
  findAvailable(date: string, startTime: string, endTime: string): Promise<Room[]>;
}