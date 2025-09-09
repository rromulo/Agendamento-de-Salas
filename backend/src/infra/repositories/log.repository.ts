import LogModel from '@infra/database/models/log.model';
import { ICreateLog, ILogProps } from '@core/entities/log.entity';
import { ILogRepository } from '@core/repositories/interfaces/log.repository.interface';

export class LogRepository implements ILogRepository {
  async saveLog(log: ICreateLog): Promise<ILogProps> {
    const logResponse =  await LogModel.create(log)
    return logResponse.toJSON() as ILogProps;
  }
  async findAll(page: number, limit: number = 20): Promise<{
    logs: ILogProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await LogModel.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })
    
    return {
      logs: rows.map(row => row.toJSON() as ILogProps),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  }
  async findAllByUser(userId: string, page: number, limit: number): Promise<{
    logs: ILogProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await LogModel.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })

    return {
      logs: rows.map(row => row.toJSON() as ILogProps),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  }

}

