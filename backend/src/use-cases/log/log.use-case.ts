import { LogRepository } from '@infra/repositories/log.repository';
import { ICreateLog } from '@core/entities/log.entity';
import { ILogRepository } from '@core/repositories/interfaces/log.repository.interface';
import resp from '@utils/resp';

export class LogUseCase {
  constructor(private readonly logRepository: ILogRepository) {}

  async saveLog(log: ICreateLog): Promise<{ status: number, message: unknown }> {
    const logs =  await this.logRepository.saveLog(log);
    return resp(200, logs)
  }

  async findAll(page: number, limit: number): Promise<{ status: number, message: unknown }> {
    const logs =  await this.logRepository.findAll(page, limit);
    return resp(200, logs)
  }
}