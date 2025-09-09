import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import roomRouter from './room.routes';
import bookingRouter from './booking.routes';
import addressRouter from './address.routes';
const route = Router();

route.use(authRouter)
route.use(userRouter)
route.use(roomRouter)
route.use(bookingRouter)
route.use(addressRouter)

export default route;