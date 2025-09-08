import { Booking, IBookingProps, ICreateBooking } from '@core/entities/booking.entity';
import { IBookingRepository } from '@core/repositories/interfaces/booking.repository.interface';
import BookingModel from '@infra/database/models/booking.model';
import ApiError from '@utils/apiError';
import schemas from 'src/validations/schemas';
import { UserRepository } from './user.repository';
import { RoomRepository } from './room.repository';
import UserModel from '@infra/database/models/user.model';
import RoomModel from '@infra/database/models/room.model';

export class BookingRepository implements IBookingRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository
  ) {}
  async save(booking: ICreateBooking): Promise<Partial<IBookingProps>> {
    const { error } = schemas.booking.validate(booking);
    if(error) throw new ApiError(500, error.message);

    const userResponse = await this.userRepository.findById(booking.userId)
    if(!userResponse) throw new ApiError(404, 'Usuário não encontrado.');

    const roomResponse = await this.roomRepository.findById(booking.roomId)
    if(!roomResponse) throw new ApiError(404, 'Sala não encontrada.');

    const verifyBooking = await BookingModel.findOne({
      where: {
        roomId: booking.roomId,
        startTime: booking.startTime,
        endTime: booking.endTime,
        date: booking.date
      }
    })

    if(verifyBooking) throw new ApiError(409, `Já existe um agendamento entre as horas ${booking.startTime} e ${booking.endTime}`);

    const response = await BookingModel.create(booking)
    return new Booking(response.toJSON()).getPublicBooking();

  }
  async findAll(): Promise<IBookingProps[]> {
    return await BookingModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name', 'role'],
          where: {
            role: 'cliente'
          },
          as: 'user'
        },
        {
          model: RoomModel,
          attributes: ['id', 'name'],
          as: 'room'
        }
      ],
      attributes: {
        exclude: ['roomId', 'userId']
      }
      
    })
  }
  findByUserId(userId: string): Promise<Partial<IBookingProps>[]> {
    throw new Error('Method not implemented.');
  }
  update(booking: Partial<IBookingProps>): Promise<Partial<IBookingProps>> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  
}