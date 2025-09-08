import { IAuthRepository } from '@core/repositories/interfaces/auth.repository.interface';
import resp from '@utils/resp';

export class AuthUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async login(email: string, password: string): Promise<{status: number, message: unknown}> {
    console.log('AUTH USE CASE')
    const data = await this.authRepository.login(email, password);
    return resp(200, data)
  }
}