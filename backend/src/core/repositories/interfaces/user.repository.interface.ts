import { ICreateAddress } from '@core/entities/address.entity';
import { ICreateUser, IUserProps, User } from '@core/entities/user.entity';
import AddressModel from '@infra/database/models/address.model';
import UserModel from '@infra/database/models/user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<Partial<IUserProps> | null>;
  save(userData: ICreateUser, addresData: ICreateAddress): Promise<UserModel & { address: AddressModel }>;
  update(id: string, dataUser: Partial<IUserProps>): Promise<Partial<IUserProps>>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Partial<IUserProps>[]>;
}