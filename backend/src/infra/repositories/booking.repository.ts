import { Booking, IBookingProps, ICreateBooking } from '@core/entities/booking.entity';
import { IBookingRepository } from '@core/repositories/interfaces/booking.repository.interface';
import BookingModel from '@infra/database/models/booking.model';
import ApiError from '@utils/apiError';
import schemas from 'src/validations/schemas';
import { UserRepository } from './user.repository';
import { RoomRepository } from './room.repository';
import UserModel from '@infra/database/models/user.model';
import RoomModel from '@infra/database/models/room.model';
import LogModel from '@infra/database/models/log.model';
import { LogRepository } from './log.repository';

export class BookingRepository implements IBookingRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly logRepository: LogRepository
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
    console.log('ANTES DO LOG NO SAVE BOOKING')
    await this.logRepository.saveLog({userId: booking.userId, action: 'Criação de agendamento', description: 'Agendamento'})
    return new Booking(response.toJSON()).getPublicBooking();

  }
  async findAll(): Promise<IBookingProps[]> {
    return await BookingModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ['name', 'role'],
          as: 'user'
        },
        {
          model: RoomModel,
          attributes: ['name'],
          as: 'room'
        }
      ],
      attributes: {
        exclude: ['roomId', 'userId']
      },
      order: [['createdAt', 'DESC']]
      
    })
  }
  async findAllByUserId(userId: string): Promise<Partial<IBookingProps[]>> {
    console.log('USER ID REPOSITORY', userId)
    return await BookingModel.findAll({
      where: { userId },
      include: [
        {
          model: UserModel,
          attributes: ['name', 'role'],
          as: 'user'
        },
        {
          model: RoomModel,
          attributes: ['name'],
          as: 'room'
        }
      ],
      attributes: {
        exclude: ['roomId', 'userId']
      }
      
    })
  }
  update(booking: Partial<IBookingProps>): Promise<Partial<IBookingProps>> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  
}