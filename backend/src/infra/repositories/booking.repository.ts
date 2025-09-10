import { Booking, IBookingProps, ICreateBooking } from '@core/entities/booking.entity';
import { IBookingRepository } from '@core/repositories/interfaces/booking.repository.interface';
import BookingModel from '@infra/database/models/booking.model';
import ApiError from '@utils/apiError';
import schemas from '@validations/schemas';
import { UserRepository } from './user.repository';
import { RoomRepository } from './room.repository';
import UserModel from '@infra/database/models/user.model';
import RoomModel from '@infra/database/models/room.model';
import LogModel from '@infra/database/models/log.model';
import { LogRepository } from './log.repository';
import { InferAttributes, where } from 'sequelize';
import { getStatusUpdateBooking } from '@utils/getStatusUpdateBooking';

export class BookingRepository implements IBookingRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly logRepository: LogRepository
  ) {}
  async save(booking: InferAttributes<BookingModel>): Promise<Partial<IBookingProps>> {
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
  async updateBookingStatus(userId: string, bookingId: string, status: 'pendente' | 'confirmado' | 'recusado'): Promise<Partial<IBookingProps>> {
    try {
      
      const bookingExists = await BookingModel.findByPk(bookingId)
      if(!bookingExists) throw new ApiError(404, 'Agendamento não encontrado.');
      
      const bookingStatus = getStatusUpdateBooking(status);
      
      bookingExists.status = status;
      await bookingExists.save();
      
      await this.logRepository.saveLog({
        userId: userId,
        action: bookingStatus.action,
        description: bookingStatus.description
      });
      
      return new Booking(bookingExists.toJSON()).getPublicBooking();
    } catch (error: any) {
      throw new ApiError(500, error.message)
    }
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  
}