import LogModel from '../../infra/database/models/log.model';
import { ICreateLog, ILogProps } from '../../core/entities/log.entity';
import { ILogRepository } from '../../core/repositories/interfaces/log.repository.interface';
import UserModel from '../../infra/database/models/user.model';
import ApiError from '../../utils/apiError';
import AddressModel from '../../infra/database/models/address.model';

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
      order: [['createdAt', 'DESC']],
      include:[
        {
          model: UserModel,
          as: 'user',
          attributes: {
            exclude: ['password']
          },
          include: [
            {
              model: AddressModel,
              as: 'address'
            }
          ]
        }
      ]
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
    const userResponse = await UserModel.findByPk(userId)
    const user = userResponse?.toJSON()
    if(!user?.canViewLogs) throw new ApiError(401, 'Você não ter permissão para ver logs.')

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

