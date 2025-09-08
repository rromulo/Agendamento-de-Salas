import { NextFunction, Request, Response } from 'express';
import { RoomUseCase } from '@cases/room/room.use-case';

export class RoomController {
  constructor(private readonly roomUseCase: RoomUseCase) {}

  async saveRoom(req: Request, res: Response, next: NextFunction) {
    console.log('ROOM CONTROLLER ->', req.body)
      const { status, message } = await this.roomUseCase.saveRoom(req.body);
      res.status(status).json(message)
  }

  async updateRoom(req: Request, res: Response, next: NextFunction) {
    console.log('UPDATE ROOM CONTROLLER ->', req.body, req.params)
      const { status, message } = await this.roomUseCase.updateRoom(req.params.id, req.body);
      res.status(status).json(message)
  }
}