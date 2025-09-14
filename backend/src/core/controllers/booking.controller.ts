import { NextFunction, Request, Response } from 'express';
import { BookingUseCase } from '../../use-cases/boolking/booking.use-case';


export class BookingController {
  constructor(private readonly bookingUseCase: BookingUseCase) {}
  async createBooking(req: Request, res: Response, next: NextFunction) {
    const {status, message} = await this.bookingUseCase.createBooking(req.body)
    res.status(status).json(message)
  }

  async listAllBookings(req: Request, res: Response, next: NextFunction) {
    const {page, limit} = req.params
    const name = req.params.name || (req.query.name as string);
    const {status, message} = await this.bookingUseCase.listAllBookings(+page, +limit, name)
    res.status(status).json(message)
  }

  async findAllByUserId(req: Request, res: Response, next: NextFunction) {
    const {userId, page, limit} = req.params;
    const {status, message} = await this.bookingUseCase.findAllByUserId(userId,+page,+limit)
    res.status(status).json(message)
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    const {userId, bookingId} = req.params;
    const { status: statusBooking } = req.body;
    const {status, message} = await this.bookingUseCase.updateBookingStatus(userId, bookingId, statusBooking)
    res.status(status).json(message)
  }
}