import { Router, Request, Response, NextFunction } from 'express';
import { BookingRepository } from '@infra/repositories/booking.repository';
import { BookingUseCase } from '@cases/boolking/booking.use-case';
import { BookingController } from '@core/controllers/booking.controller';
import { UserRepository } from '@infra/repositories/user.repository';
import { RoomRepository } from '@infra/repositories/room.repository';

const bookingRouter = Router();

const userRepository = new UserRepository();
const roomRepository = new RoomRepository();
const bookingRepository = new BookingRepository(userRepository, roomRepository);
const bookingUseCase = new BookingUseCase(bookingRepository);
const bookingController = new BookingController(bookingUseCase);

bookingRouter.post('/bookings', (req: Request, res: Response, next: NextFunction) => bookingController.createBooking.bind(bookingController)(req, res, next))
bookingRouter.get('/bookings', (req: Request, res: Response, next: NextFunction) => bookingController.listAllBookings.bind(bookingController)(req, res, next))

export default bookingRouter;