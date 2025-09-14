import { Route } from '@infra/repositories/auth.repository';

export interface IAuthRepository {
  login(email: string, password: string): Promise<{token: string, allowedRoutes: Route[]}>;
  logout(): Promise<void>;
  getRoutesForUserRole(role: string): Route[]
}
