import { InferAttributes } from 'sequelize';
import { ICreateAddress } from '../../core/entities/address.entity';
import { ICreateUser, IUpdateAddress, IUserProps, User } from '../../core/entities/user.entity';
import { IUserRepository } from '../../core/repositories/interfaces/user.repository.interface';
import resp from '../../utils/resp';
import UserModel from '../../infra/models/user.model';


export class UserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,

  ){}

  async saveUser(userData: ICreateUser, addresData: ICreateAddress): Promise<{status: number, message: unknown}> {
    const savedUser = await this.userRepository.save(userData, addresData);
    return resp(201, savedUser);
  }

  async getUsers(page: number, limit: number) {
    const response = await this.userRepository.findAll(page, limit);
    return resp(200, response)
  }

  async getUsersByName(page: number, limit: number,name: string): Promise<{status: number, message: unknown}> {
    const response = await this.userRepository.getUsersByName(page, limit, name);
    return resp(200, response)
  }

  async getUserById(userId: string) {
    const response = await this.userRepository.findById(userId);
    return resp(200, response)
  }

  async updateUser(userId: string, updateData: Partial<ICreateUser>): Promise<{status: number, message: unknown}> {
    const updatedUser = await this.userRepository.update(userId, updateData);
    return resp(200, updatedUser);
  }

  async updateWithAddress(
    userId: string,
    dataUser: Partial<InferAttributes<UserModel>>,
    dataAddress: IUpdateAddress): Promise< {status: number, message: unknown}>
    {
      const updatedUser = await this.userRepository.updateWithAddress(userId, dataUser, dataAddress);
      return resp(200, updatedUser);
  }
}
