import { NextFunction, Request, Response } from 'express';
import { BookingUseCase } from '@cases/boolking/booking.use-case';

export class BookingController {
  constructor(private readonly bookingUseCase: BookingUseCase) {}
  async createBooking(req: Request, res: Response, next: NextFunction) {
    const {status, message} = await this.bookingUseCase.createBooking(req.body)
    res.status(status).json(message)
  }

  async listAllBookings(_req: Request, res: Response, next: NextFunction) {
    const {status, message} = await this.bookingUseCase.listAllBookings()
    res.status(status).json(message)
  }
}