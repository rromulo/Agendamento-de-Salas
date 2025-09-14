import { NextFunction, Request, Response } from 'express';
import { LogUseCase } from '../../use-cases/log/log.use-case';

export class LogController {
  constructor(private readonly logUseCase: LogUseCase) {}

  async saveLogControl(req: Request, res: Response, next: NextFunction) {
      const { status, message } = await this.logUseCase.saveLog(req.body);
      res.status(status).json(message)
  }

  async findAllControl(req: Request, res: Response, next: NextFunction) {
    const {page, limit} = req.params
    const term = req.params.term || (req.query.term as string);
    const { status, message } = await this.logUseCase.findAll(+page, +limit, term);
    res.status(status).json(message)
  }

  async findAllByUserControl(req: Request, res: Response, next: NextFunction) {
    const {userId, page, limit} = req.params
    const term = req.params.term || (req.query.term as string);
    const { status, message } = await this.logUseCase.findAllByUserControl(userId, +page, +limit, term);
    res.status(status).json(message)
  }
}