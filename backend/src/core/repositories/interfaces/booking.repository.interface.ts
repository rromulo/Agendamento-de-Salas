import { Booking } from '@core/entities/booking.entity';

export interface IBookingRepository {
  indById(id: string): Promise<Booking | null>;
  findByUserId(userId: string): Promise<Booking[]>;
  findByRoomId(roomId: string): Promise<Booking[]>;
  save(booking: Booking): Promise<Booking>;
  update(booking: Booking): Promise<Booking>;
  delete(id: string): Promise<boolean>;
  findByDateRange(roomId: string, date: string, startTime: string, endTime: string): Promise<Booking[]>;
  findPending(): Promise<Booking[]>;
}