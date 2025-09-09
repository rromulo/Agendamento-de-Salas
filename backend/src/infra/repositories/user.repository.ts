import { ICreateAddress } from '@core/entities/address.entity';
import { ICreateUser, IUserProps, User } from "@core/entities/user.entity";
import { IUserRepository } from '@core/repositories/interfaces/user.repository.interface'
import AddressModel from '@infra/database/models/address.model';
import UserModel from '@infra/database/models/user.model';
import ApiError from '@utils/apiError';
import sequelize from '@infra/database/models'
import { InferAttributes } from 'sequelize';
import md5 from 'md5';

export class UserRepository implements IUserRepository {

  async save(userData: ICreateUser, addresData: ICreateAddress): Promise<UserModel & { address: AddressModel }> {
    return await sequelize.transaction(async (t) => {
      const hashPassword = md5(userData.password)
      const user = await UserModel.create({...userData, password: hashPassword, role: 'CLIENTE'}, { transaction: t });
  
      const address = await AddressModel.create(
        { ...addresData, userId: user.id },
        { transaction: t }
      );
  
      return { ...user.toJSON(), address } as unknown as UserModel & { address: AddressModel };
    });
  }

  async findAll(): Promise<Partial<IUserProps>[]> {
    const data = await UserModel.findAll({
      attributes: {exclude: ['password']},
      include: [
        {
          model: AddressModel,
          as: 'address',
          attributes:{
            exclude: ['userId', 'id']
          }
        }
      ]
    });
    return data
  }

  async findByEmail(email: string): Promise<Partial<IUserProps> | null> {
    const user = await UserModel.findOne({
      where: { email }
    });
    if (!user) throw new ApiError(404, 'Usuário ou senha inválidos.');
    return user
  }

  async update(id: string, dataUser: Partial<InferAttributes<UserModel>>): Promise<Partial<IUserProps>> {
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