import { Router, Request, Response, NextFunction } from 'express';
import { RoomRepository } from '../infra/repositories/room.repository';
import { RoomUseCase } from '../use-cases/room/room.use-case';
import { RoomController } from '../core/controllers/room.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const roomRouter = Router();

const roomRepository = new RoomRepository();
const roomUseCase = new RoomUseCase(roomRepository);
const roomController = new RoomController(roomUseCase);

roomRouter.post('/rooms', verifyToken, authorizeAdmin, roomController.saveRoom.bind(roomController))
roomRouter.get('/rooms', verifyToken, roomController.getAllRooms.bind(roomController))
roomRouter.patch('/admin/rooms/:id', (req: Request, res: Response, next: NextFunction) => roomController.updateRoom.bind(roomController)(req, res, next))

export default roomRouter;