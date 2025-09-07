import { Log } from '@entities/log.entity';

export interface ILogRepository {
  save(log: Log): Promise<Log>;
  findByUserId(userId: string, page: number, limit: number): Promise<{ logs: Log[], total: number }>;
  findAll(page: number, limit: number): Promise<{ logs: Log[], total: number }>;
}