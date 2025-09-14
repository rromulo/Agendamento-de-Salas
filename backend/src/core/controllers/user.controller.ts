import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '../../use-cases/user/user.use-case';
// import { User } from '@entities/user.entity';


export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async saveUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {address, ...userData} = req.body
      const { status, message } = await this.userUseCase.saveUser(userData, address);
      res.status(status).json(message)
    } catch (error) {
      next(error) 
    }
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = req.params;
    const { status, message } = await this.userUseCase.getUserById(userId)
    res.status(status).json(message)
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const { page, limit } = req.params
      const { status, message } = await this.userUseCase.getUsers(+page, +limit);
      res.status(status).json(message)
    } catch (error: any) {
      res.status(400).json({error: error.message})      
    }
  }

  async getUsersByName(req: Request, res: Response) {
    const {name, page, limit} = req.params;
    const { status, message } = await this.userUseCase.getUsersByName(+page, +limit, name);
      res.status(status).json(message)
  }

  async updateUser(req: Request, res: Response) {
      const data = req.body
      const {userId} = req.params
      const {status, message} = await this.userUseCase.updateUser(userId, data)
      res.status(status).json(message)
  }
  async updateWithAddress(req: Request, res: Response) {
    const {address, ...userData} = req.body;
      const {userId} = req.params
      const {status, message} = await this.userUseCase.updateWithAddress(userId, userData, address)
      res.status(status).json(message)
  }
}