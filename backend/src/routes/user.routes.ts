import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from 'core/controllers/user.controller';
import { UserUseCase } from 'use-cases/user/user.use-case';
import { UserRepository } from 'infra/repositories/user.repository';

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

const userRouter = Router();

userRouter.post("/users", (req: Request, res: Response, next: NextFunction) => userController.saveUser.bind(userController)(req, res, next) );
userRouter.get("/users", (req: Request, res: Response) => userController.getAllUsers.bind(userController)(req, res));

export default userRouter