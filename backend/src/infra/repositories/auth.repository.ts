import md5 from 'md5';
import UserModel from '@infra/database/models/user.model';
import ApiError from '@utils/apiError';
import generateToken from '@utils/generateToken';
import { IAuthRepository } from '@core/repositories/interfaces/auth.repository.interface';
import LogModel from '@infra/database/models/log.model';
import { ILogRepository } from '@core/repositories/interfaces/log.repository.interface';


export class AuthRepository implements IAuthRepository {
  constructor(private readonly logRepository: ILogRepository){}

  async login(email: string, password: string): Promise<{token: string}> {
    const hashPassword = md5(password)

    const user = await UserModel.findOne({
      where: {
        email,
        password: hashPassword
      }
    })

    if(!user) throw new ApiError(404, 'Usuário ou senha inválidos.');
    
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
    await this.logRepository.saveLog({userId: user.id, action: 'Login', description: 'Minha Conta'})
    return token
  }
  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}