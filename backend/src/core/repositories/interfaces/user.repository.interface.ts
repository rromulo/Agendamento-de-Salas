import { InferAttributes } from 'sequelize';
import { ICreateAddress } from '../../../core/entities/address.entity';
import { ICreateUser, IUpdateAddress, IUserProps, User } from '../../../core/entities/user.entity';
import AddressModel from '../../../infra/database/models/address.model';
import UserModel from '../../../infra/database/models/user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<Partial<IUserProps> | null>;
  save(userData: ICreateUser, addresData: ICreateAddress): Promise<UserModel & { address: AddressModel }>;
  update(id: string, dataUser: Partial<IUserProps>): Promise<Partial<IUserProps>>;
  updateWithAddress(userId: string, dataUser: Partial<InferAttributes<UserModel>>, dataAddress: IUpdateAddress): Promise<Partial<IUserProps>>
  delete(id: string): Promise<boolean>;
  findAll(page: number, limit: number): Promise<{
    logs: IUserProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>
  getUsersByName(page: number, limit: number, name: string): Promise<{
    logs: IUserProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>
}