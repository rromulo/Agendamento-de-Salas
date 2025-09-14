import { ICreateAddress } from '../../core/entities/address.entity';
import { IAddress, ICreateUser, IUpdateAddress, IUserProps, User } from "../../core/entities/user.entity";
import { IUserRepository } from '../../core/repositories/interfaces/user.repository.interface'
import AddressModel from '../../infra/database/models/address.model';
import UserModel from '../../infra/database/models/user.model';
import ApiError from '../../utils/apiError';
import sequelize from '../../infra/database/models'
import { InferAttributes, Op } from 'sequelize';
import md5 from 'md5';

export class UserRepository implements IUserRepository {

  async save(userData: ICreateUser, addresData: ICreateAddress): Promise<UserModel & { address: AddressModel }> {

    const exists = await UserModel.findOne({
      where: { email: userData.email }
    })

    if(exists) throw new ApiError(409, 'E-nmail já existe no sistema.') 

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

  async findAll(page: number, limit: number = 20): Promise<{
    logs: IUserProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {

    const offset = (page - 1) * limit;
    
    const { count, rows } = await UserModel.findAndCountAll({
      where: {role: 'CLIENTE'},
      limit,
      offset,
      order: [['name', 'DESC']],
      include: [
        {
          model: AddressModel,
          as: 'address',
        },
      ],
      attributes: {
        exclude: ['password']
      },
    })
    console.log(count, rows)
    return {
      logs: rows.map(row => row.toJSON() as unknown as IUserProps),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  }

  async getUsersByName(page: number, limit: number = 20, name?: string): Promise<{
    logs: IUserProps[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    console.log('NAME NO BACKEND',name)
    const offset = (page - 1) * limit;

    const whereClause: any = {}

    if(name && name.trim() !== '') {
      whereClause.name = {
        [Op.like]: `%${name}%`
      }
      whereClause.role = 'CLIENTE'
    }

    const { count, rows } = await UserModel.findAndCountAll(
      {
        where: whereClause,
        include: [
          {
            model: AddressModel,
            as: 'address'
          }
        ],
        offset,
        order: [['name', 'ASC']]
      }      
    );
    return {
      logs: rows.map(row => row.toJSON() as unknown as IUserProps),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
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

  async updateWithAddress(id: string, dataUser: InferAttributes<UserModel>, dataAddress: IUpdateAddress): Promise<Partial<IUserProps>> {
    console.log('DATA USER DE NOVO ->', dataUser)
    return await sequelize.transaction(async (t) => {
      const hashPassword = md5(dataUser.password)
      const existing = await UserModel.findByPk(id);
      if (!existing) throw new Error('Usuário não encontrado');
      
      const user = await UserModel.update(
        {
          name: dataUser.name,
          email: dataUser.email,
          password: hashPassword,
        },
        {where: {id: existing.id}, transaction: t}
      );
      const address = await AddressModel.update(
        { ...dataAddress },
        {
          where: {userId: existing.id},
          transaction: t
        },
      );
      const newUser = await UserModel.findByPk(existing.id, { transaction: t });
      const [affectedRowsUSer] = user
      console.log('RETORNO AQUI BACK -->', affectedRowsUSer)
      return { ...newUser, address } as unknown as UserModel & { address: AddressModel };
    });
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await UserModel.destroy({ where: { id } });
    if (!deleted) throw new Error('User not found');

    return true
  }

  async findById(id: string): Promise<User | null> {
    const data = await UserModel.findByPk(id, {
      include: [
        {
          model: AddressModel,
          as: 'address'
        }
      ]
    });
    if (!data) return null;

    return new User(data.toJSON());
  }

  async getAll(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users.map((u: any) => new User(u.toJSON()));
  }
}