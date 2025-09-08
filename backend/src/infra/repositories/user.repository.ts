import { ICreateUser, IUserProps, User } from "@core/entities/user.entity";
import { IUserRepository } from '@core/repositories/interfaces/user.repository.interface'
import UserModel from '@infra/database/models/user.model';
import ApiError from '@utils/apiError';
import md5 from 'md5';
import schemas from 'src/validations/schemas';

export class UserRepository implements IUserRepository {

  async save(user: ICreateUser): Promise<Partial<IUserProps>> {
    
    const { error } = schemas.user.validate(user)
    if (error) throw new ApiError(422, error.message)

    const hasshPassword = md5(user.password);
    const response = await UserModel.create({...user, password: hasshPassword})
    console.log('USER --> ', response)

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

  async findByEmail(email: string): Promise<Partial<IUserProps> | null> {
    const user = await UserModel.findOne({
      where: { email }
    });
    if (!user) throw new ApiError(404, 'Usuário ou senha inválidos.');
    return user
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
    console.log('ENTROU NO FINDBYPK')
    const data = await UserModel.findByPk(id);
    if (!data) return null;

    return new User(data.toJSON());
  }

  async getAll(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users.map((u: any) => new User(u.toJSON()));
  }
}