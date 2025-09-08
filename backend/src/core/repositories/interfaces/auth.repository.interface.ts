export interface IAuthRepository {
  login(email: string, password: string): Promise<{token: string}>;
  logout(): Promise<void>;
}
