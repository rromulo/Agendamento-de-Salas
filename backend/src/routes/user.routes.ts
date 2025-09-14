import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../core/controllers/user.controller'
import { UserUseCase } from '../use-cases/user/user.use-case';
import { UserRepository } from '../infra/repositories/user.repository';
import { verifyToken } from '../middlewares/verifyToken';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

const userRouter = Router();

userRouter.post("/admin/users", verifyToken, authorizeAdmin, userController.saveUser.bind(userController) );
userRouter.get("/admin/users/:page/:limit", userController.getAllUsers.bind(userController));
userRouter.post("/users", userController.saveUser.bind(userController) );
userRouter.get("/users", verifyToken, userController.getAllUsers.bind(userController));
userRouter.get("/users/:userId", verifyToken, userController.getUserById.bind(userController))
userRouter.patch("/user/:userId", verifyToken, userController.updateWithAddress.bind(userController));
userRouter.patch("/user/canScheduling/:userId", verifyToken, userController.updateUser.bind(userController));
userRouter.patch("/user/canViewLogs/:userId", verifyToken, userController.updateUser.bind(userController));
userRouter.patch("/user/isActive/:userId", verifyToken, userController.updateUser.bind(userController));

export default userRouter