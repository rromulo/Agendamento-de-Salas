import { Router, Request, Response, NextFunction } from 'express';
import { BookingRepository } from '../infra/repositories/booking.repository';
import { BookingUseCase } from '../use-cases/boolking/booking.use-case';
import { BookingController } from '../core/controllers/booking.controller';
import { UserRepository } from '../infra/repositories/user.repository';
import { RoomRepository } from '../infra/repositories/room.repository';
import { verifyToken } from '../middlewares/verifyToken';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';
import { LogRepository } from '../infra/repositories/log.repository';

const bookingRouter = Router();

const userRepository = new UserRepository();
const roomRepository = new RoomRepository();
const logRepository = new LogRepository()
const bookingRepository = new BookingRepository(userRepository, roomRepository, logRepository);
const bookingUseCase = new BookingUseCase(bookingRepository);
const bookingController = new BookingController(bookingUseCase);

bookingRouter.get('/admin/bookings/:page/:limit', verifyToken, authorizeAdmin, bookingController.listAllBookings.bind(bookingController))
bookingRouter.get('/bookings/:userId/:page/:limit', verifyToken, bookingController.findAllByUserId.bind(bookingController))
bookingRouter.post('/bookings', verifyToken, bookingController.createBooking.bind(bookingController))
bookingRouter.patch('/bookings/:userId/:bookingId', verifyToken, bookingController.updateStatus.bind(bookingController))

export default bookingRouter;