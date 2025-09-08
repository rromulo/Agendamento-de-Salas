import { Router, Request, Response, NextFunction } from 'express';
import { AuthRepository } from '@infra/repositories/auth.repository';
import { AuthUseCase } from '@cases/auth/auth.use-case';
import { AuthController } from '@core/controllers/auth.controller';

const authRouter = Router();

const authRepository = new AuthRepository();
const authUseCase = new AuthUseCase(authRepository);
const authController = new AuthController(authUseCase);

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => authController.login.bind(authController)(req, res, next))

export default authRouter;