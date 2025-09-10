import { Booking, IBookingProps, ICreateBooking } from '../../../core/entities/booking.entity';
import BookingModel from '../../../infra/database/models/booking.model';
import { InferAttributes } from 'sequelize';

export interface IBookingRepository {
  save(booking: InferAttributes<BookingModel>): Promise<Partial<IBookingProps>>;
  findAll(): Promise<IBookingProps[]>;
  findAllByUserId(userId: string): Promise<Partial<IBookingProps[]>>;
  // findByRoomId(roomId: string): Promise<Booking[]>;
  updateBookingStatus(userId: string, bookingId: string, status: string): Promise<Partial<IBookingProps>>
  delete(id: string): Promise<boolean>;
}