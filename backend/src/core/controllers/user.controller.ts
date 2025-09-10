import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '../../use-cases/user/user.use-case';
// import { User } from '@entities/user.entity';


export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async saveUser(req: Request, res: Response, next: NextFunction) {
    const {address, ...userData} = req.body
    const { status, message } = await this.userUseCase.saveUser(userData, address);
    res.status(status).json(message)
  }

  async getAllUsers(_req: Request, res: Response) {
    try {
      const { status, message } = await this.userUseCase.getUsers();
      res.status(status).json(message)
    } catch (error: any) {
      res.status(400).json({error: error.message})      
    }
  }
}