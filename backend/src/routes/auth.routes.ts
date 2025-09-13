import { Router, Request, Response, NextFunction } from 'express';
import { AuthRepository } from '../infra/repositories/auth.repository';
import { AuthUseCase } from '../use-cases/auth/auth.use-case';
import { AuthController } from '../core/controllers/auth.controller';
import { LogRepository } from '../infra/repositories/log.repository';
import { verifyToken } from '../middlewares/verifyToken';

const authRouter = Router();

const logRepository = new LogRepository()
const authRepository = new AuthRepository(logRepository);
const authUseCase = new AuthUseCase(authRepository);
const authController = new AuthController(authUseCase);

authRouter.post('/login', authController.login.bind(authController))
authRouter.get('/auth/me', verifyToken, authController.getProfile.bind(authController))
// authRouter.get('/logout:/userId', verifyToken, authController.logout.bind(authController))

export default authRouter;