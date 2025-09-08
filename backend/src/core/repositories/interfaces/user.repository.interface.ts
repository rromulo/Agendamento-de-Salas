import { ICreateUser, IUserProps, User } from '@core/entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<Partial<IUserProps> | null>;
  save(user: ICreateUser): Promise<Partial<IUserProps>>;
  update(id: string, dataUser: Partial<IUserProps>): Promise<Partial<IUserProps>>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Partial<IUserProps>[]>;
}