import { Booking, IBookingProps, ICreateBooking } from '../../../core/entities/booking.entity';
import BookingModel from '../../../infra/database/models/booking.model';
import { InferAttributes } from 'sequelize';

export interface IBookingRepository {
  save(booking: InferAttributes<BookingModel>): Promise<Partial<IBookingProps>>;
  findAll(page: number, limit: number): Promise<{
    logs: IBookingProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>
  findAllByUserId(userId: string, page: number, limit: number): Promise<{
    logs: IBookingProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>
  // findByRoomId(roomId: string): Promise<Booking[]>;
  updateBookingStatus(userId: string, bookingId: string, status: string): Promise<Partial<IBookingProps>>
  delete(id: string): Promise<boolean>;
}