import { Router, Request, Response, NextFunction } from 'express';
import { RoomRepository } from '@infra/repositories/room.repository';
import { RoomUseCase } from '@cases/room/room.use-case';
import { RoomController } from '@core/controllers/room.controller';

const roomRouter = Router();

const roomRepository = new RoomRepository();
const roomUseCase = new RoomUseCase(roomRepository);
const roomController = new RoomController(roomUseCase);

roomRouter.post('/rooms', (req: Request, res: Response, next: NextFunction) => roomController.saveRoom.bind(roomController)(req, res, next))
roomRouter.patch('/rooms/:id', (req: Request, res: Response, next: NextFunction) => roomController.updateRoom.bind(roomController)(req, res, next))

export default roomRouter;