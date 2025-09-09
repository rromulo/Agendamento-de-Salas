import { ICreateBooking, IBookingProps } from '@core/entities/booking.entity';
import { IBookingRepository } from '@core/repositories/interfaces/booking.repository.interface';
import resp from '@utils/resp';

export class BookingUseCase {
  constructor(private readonly bookingRepository: IBookingRepository) {}

  async createBooking(booking: ICreateBooking): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.save(booking)
    return resp(201, response)
  }

  async listAllBookings(): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.findAll()
    return resp(201, response)
  }

  async findAllByUserId(userId: string): Promise<{ status: number, message: unknown }> {
    const response = await this.bookingRepository.findAllByUserId(userId)
    return resp(201, response)
  }

}