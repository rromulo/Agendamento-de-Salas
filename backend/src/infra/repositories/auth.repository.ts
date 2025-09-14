import md5 from 'md5';
import UserModel from '../../infra/database/models/user.model';
import ApiError from '../../utils/apiError';
import generateToken from '../../utils/generateToken';
import { IAuthRepository } from '../../core/repositories/interfaces/auth.repository.interface';
import LogModel from '../../infra/database/models/log.model';
import { ILogRepository } from '../../core/repositories/interfaces/log.repository.interface';

export type Route = { name: string; href: string; icon: string };
export class AuthRepository implements IAuthRepository {
  constructor(private readonly logRepository: ILogRepository){}

  public getRoutesForUserRole(role: string): Route[]{
    if (!role) return []
    const routes: Record<string, Route[]> = {
      admin: [
        { name: 'Agendamentos', href: '/admin/agendamentos', icon: 'FaCalendar' },
        { name: 'Clientes', href: '/admin/clientes', icon: 'FaPeopleGroup' },
        { name: 'Logs', href: '/admin/logs', icon: 'PiListChecksBold' },
      ],
      cliente: [
        { name: 'Agendamentos', href: '/agendamentos', icon: 'FaCalendar' },
        { name: 'Logs', href: '/logs', icon: 'FaPeopleGroup' },
        { name: 'Minha conta', href: '/perfil', icon: 'IoPersonOutline' }
      ],
    };
    return routes[role.toLowerCase()] || [];
  }

  async login(email: string, password: string): Promise<{token: string, allowedRoutes: Route[]}> {
    const hashPassword = md5(password)

    const user = await UserModel.findOne({
      where: {
        email,
        password: hashPassword
      }
    })

    if(!user) throw new ApiError(404, 'Usuário ou senha inválidos.');
    if(!user.isActive) throw new ApiError(401, 'Seu perfil está desativado!. Por favor, Entre em contado com os adiministradores.')
    
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
    await this.logRepository.saveLog({userId: user.id, action: 'Login', description: 'Minha Conta'})
    const allowedRoutes = this.getRoutesForUserRole(user.role)
    console.log(allowedRoutes)
    return {
      token,
      allowedRoutes
    }
  }
  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}