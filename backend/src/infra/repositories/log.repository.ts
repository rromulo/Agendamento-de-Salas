import LogModel from '@infra/database/models/log.model';
import { ICreateLog, ILogProps } from '@core/entities/log.entity';
import { ILogRepository } from '@core/repositories/interfaces/log.repository.interface';

export class LogRepository implements ILogRepository {
  async saveLog(log: ICreateLog): Promise<ILogProps> {
    const logResponse =  await LogModel.create(log)
    return logResponse.toJSON() as ILogProps;
  }
  findAll(page: number, limit: number): Promise<{ logs: ILogProps[]; totalItems: number; totalPages: number; currentPage: number; }> {
    throw new Error('Method not implemented.');
  }
  findByUser(userId: string, page: number, limit: number): Promise<{ logs: ILogProps[]; totalItems: number; totalPages: number; currentPage: number; }> {
    throw new Error('Method not implemented.');
  }

}

