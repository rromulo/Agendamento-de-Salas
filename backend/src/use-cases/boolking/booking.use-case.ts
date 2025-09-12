import { ICreateBooking, IBookingProps } from '@core/entities/booking.entity';
import { IBookingRepository } from '../../core/repositories/interfaces/booking.repository.interface';
import BookingModel from '../../infra/database/models/booking.model';
import resp from '../../utils/resp';
import { InferAttributes } from 'sequelize';

export class BookingUseCase {
  constructor(private readonly bookingRepository: IBookingRepository) {}

  async createBooking(booking: InferAttributes<BookingModel>): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.save(booking)
    return resp(201, response)
  }

  async listAllBookings(page: number, limit: number): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.findAll(page, limit)
    return resp(201, response)
  }

  async findAllByUserId(userId: string): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.findAllByUserId(userId)
    return resp(201, response)
  }

  async updateBookingStatus(userId: string, bookingId: string, status: 'pendente' | 'confirmado' | 'recusado'): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.updateBookingStatus(userId, bookingId, status)
    return resp(200, response)
  }

}