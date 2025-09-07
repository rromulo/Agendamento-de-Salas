// import { User, TuserRole, IAddress} from '@entities/user.entity';
// import { IUserRepository } from 'core/repositories/user.repository.interface';


// export class UserService {
//   constructor (
//     private readonly userRepository: IUserRepository,

//   ){}

//   async registerUser(userData: User): Promise<User> {
//     const user = User.fromEntity(userData)

//     user.validate();

//     const existingUser = await this.userRepository.findByEmail(user.email)
//     if(existingUser) {
//       throw new Error('User already exists')
//     }

//     const savedUser = await this.userRepository.save(user);
    
//     return savedUser;
//   }

//   async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
//     const user = await this.userRepository.findById(userId);

//     if(!user) throw new Error('User not found');

//     user.validate();

//     const updatedUser = await this.userRepository.update(updateData);


//     return updatedUser;
//   }

//   async changeUserRole (userId: string, newRole: TuserRole, adminId: string): Promise<User> {
//     if (!['admin', 'customer'].includes(newRole)) throw new Error('Invalid role');

//     const user = await this.userRepository.findById(userId);
    
//     if(!user) throw new Error('User not found');

//     const updatedUser = User.fromEntity(newRole)
//   }
// }
