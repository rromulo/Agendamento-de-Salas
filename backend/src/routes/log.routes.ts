import { Router, Request, Response, NextFunction } from 'express';
import { LogRepository } from '../infra/repositories/log.repository';
import { LogUseCase } from '../use-cases/log/log.use-case';
import { LogController } from '../core/controllers/log.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const logRouter = Router();

const logRepository = new LogRepository();
const logUseCase = new LogUseCase(logRepository);
const logController = new LogController(logUseCase);

logRouter.post('/log', logController.saveLogControl.bind(logController))
logRouter.get('/admin/log/:page/:limit', verifyToken, authorizeAdmin,logController.findAllControl.bind(logController))
logRouter.get('/admin/log/:page/:limit/:term', verifyToken, authorizeAdmin,logController.findAllControl.bind(logController))
logRouter.get('/log/:userId/:page/:limit', logController.findAllByUserControl.bind(logController))

export default logRouter;