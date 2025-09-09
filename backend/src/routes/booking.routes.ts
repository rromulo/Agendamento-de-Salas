import { Router, Request, Response, NextFunction } from 'express';
import { BookingRepository } from '@infra/repositories/booking.repository';
import { BookingUseCase } from '@cases/boolking/booking.use-case';
import { BookingController } from '@core/controllers/booking.controller';
import { UserRepository } from '@infra/repositories/user.repository';
import { RoomRepository } from '@infra/repositories/room.repository';
import { verifyToken } from 'src/middlewares/verifyToken';
import { authorizeAdmin } from 'src/middlewares/authorizeAdmin';

const bookingRouter = Router();

const userRepository = new UserRepository();
const roomRepository = new RoomRepository();
const bookingRepository = new BookingRepository(userRepository, roomRepository);
const bookingUseCase = new BookingUseCase(bookingRepository);
const bookingController = new BookingController(bookingUseCase);

bookingRouter.get('/admin/bookings', verifyToken, authorizeAdmin, bookingController.listAllBookings.bind(bookingController))
bookingRouter.get('/bookings', verifyToken, bookingController.findAllByUserId.bind(bookingController))
bookingRouter.post('/bookings', verifyToken, bookingController.createBooking.bind(bookingController))

export default bookingRouter;