import { NextFunction, Request, Response } from 'express';
import { AuthUseCase } from '@cases/auth/auth.use-case';

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async login(req: Request, res: Response, next: NextFunction) {
      const { email, password } = req.body
      const { status, message } = await this.authUseCase.login(email, password);
      res.status(status).json(message)
  }
}