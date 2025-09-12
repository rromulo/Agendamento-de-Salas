import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthUseCase } from '../../use-cases/auth/auth.use-case';
import { IUserProps } from '../../core/entities/user.entity';

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async login(req: Request, res: Response, next: NextFunction) {
      const { email, password } = req.body
      const { status, message } = await this.authUseCase.login(email, password);
      res.status(status).json(message)
  }
  async getProfile(req: Request, res: Response, next: NextFunction) {
    const user= res.locals.user;
    const { status, message } = await this.authUseCase.getProfile(user.data.role);
    res.status(status).json({user: user.data, message});
  };
}