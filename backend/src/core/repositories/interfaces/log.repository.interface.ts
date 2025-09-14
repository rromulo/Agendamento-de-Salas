import { ICreateLog, ILogProps } from '../../../core/entities/log.entity';

export interface ILogRepository {
  saveLog(log: ICreateLog): Promise<ILogProps>;
  findAll(page: number, limit: number, term?: string): Promise<{ logs: ILogProps[], totalItems: number, totalPages: number, currentPage: number }>;
  findAllByUser(userId: string, page: number, limit: number): Promise<{ logs: ILogProps[], totalItems: number, totalPages: number, currentPage: number }>;
}