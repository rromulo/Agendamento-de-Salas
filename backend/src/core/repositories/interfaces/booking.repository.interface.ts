import { Booking, IBookingProps, ICreateBooking } from '@core/entities/booking.entity';

export interface IBookingRepository {
  save(booking: ICreateBooking): Promise<Partial<IBookingProps>>;
  findAll(): Promise<IBookingProps[]>;
  findByUserId(userId: string): Promise<Partial<IBookingProps>[]>;
  // findByRoomId(roomId: string): Promise<Booking[]>;
  update(booking: Partial<IBookingProps>): Promise<Partial<IBookingProps>>;
  delete(id: string): Promise<boolean>;
}