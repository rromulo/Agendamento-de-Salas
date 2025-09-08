import { ICreateUser, IUserProps, User } from '@core/entities/user.entity';
import { IUserRepository } from '@core/repositories/interfaces/user.repository.interface';
import resp from '@utils/resp';


export class UserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,

  ){}

  async saveUser(userData: ICreateUser): Promise<{status: number, message: unknown}> {
    const savedUser = await this.userRepository.save(userData);
    return resp(201, savedUser);
  }

  async getUsers() {
    const response = await this.userRepository.findAll();
    return resp(200, response)
  }

  // async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
  //   const user = await this.userRepository.findById(userId);

  //   if(!user) throw new Error('User not found');

  //   user.validate();

  //   const updatedUser = await this.userRepository.update(updateData);


  //   return updatedUser;
  // }

  // async changeUserRole (userId: string, newRole: TuserRole, adminId: string): Promise<User> {
  //   if (!['admin', 'customer'].includes(newRole)) throw new Error('Invalid role');

  //   const user = await this.userRepository.findById(userId);
    
  //   if(!user) throw new Error('User not found');

  //   const updatedUser = User.fromEntity(newRole)
  // }
}
