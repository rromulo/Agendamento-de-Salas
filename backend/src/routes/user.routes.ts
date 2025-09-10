import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '@core/controllers/user.controller'
import { UserUseCase } from '@cases/user/user.use-case';
import { UserRepository } from '@infra/repositories/user.repository';
import { verifyToken } from '@middlewares/verifyToken';
import { authorizeAdmin } from '@middlewares/authorizeAdmin';

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

const userRouter = Router();

userRouter.post("/admin/users", verifyToken, authorizeAdmin, userController.saveUser.bind(userController) );
userRouter.get("/admin/users", userController.getAllUsers.bind(userController));
userRouter.post("/users", verifyToken, userController.saveUser.bind(userController) );
userRouter.get("/users", verifyToken, userController.getAllUsers.bind(userController));

export default userRouter