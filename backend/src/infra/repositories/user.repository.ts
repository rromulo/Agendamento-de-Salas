import { ICreateUser, IUserProps, User } from "@core/entities/user.entity";
import { IUserRepository } from '@core/repositories/interfaces/user.repository.interface'
import UserModel from '@infra/database/models/user.model';
import ApiError from '@utils/apiError';
import schemas from 'src/validations/schemas';

export class UserRepository implements IUserRepository {

  async save(user: ICreateUser): Promise<Partial<IUserProps>> {
    const { error } = schemas.user.validate(user)
    if (error) throw new ApiError(422, error.message)
      
    const response = await UserModel.create({...user})
    return new User(response.toJSON()).getPublicProfile();
  }

  async findAll(): Promise<Partial<IUserProps>[]> {
    console.log('CHAMOU FIND ALL')
    const data = await UserModel.findAll({
      attributes: {exclude: ['password']}
    });
    console.log(data)
    return data
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, dataUser: Partial<IUserProps>): Promise<Partial<IUserProps>> {
    const existing = await UserModel.findByPk(id);
    if (!existing) throw new Error('User not found');

    await existing.update(dataUser);
    return new User(existing.toJSON()).getPublicProfile();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await UserModel.destroy({ where: { id } });
    if (!deleted) throw new Error('User not found');

    return true
  }

  async findById(id: string): Promise<User | null> {
    const data = await UserModel.findByPk(id);
    if (!data) return null;

    return new User(data.toJSON());
  }

  async getAll(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users.map((u: any) => new User(u.toJSON()));
  }
}