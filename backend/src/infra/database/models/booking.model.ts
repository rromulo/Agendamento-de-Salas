import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import { IBookingProps, ICreateBooking, TBookingStatus } from '@core/entities/booking.entity';


class BookingModel extends Model<IBookingProps, ICreateBooking> {
  declare id: string;
  declare roomId: string;
  declare userId: string;
  declare date: Date;
  declare startTime: string;
  declare endTime: string;
  declare status: TBookingStatus;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

BookingModel.init({
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  roomId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  userId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date: {
    type: sequelize.DATEONLY,
    allowNull: false,
  },
  startTime:{
    type: sequelize.TIME,
    allowNull: false,
  },
  endTime:{
    type: sequelize.TIME,
    allowNull: false,
  },
  status: {
    type: sequelize.ENUM('pendente', 'confirmado', 'recusado'),
    allowNull: false,
    defaultValue: 'pendente',
  },
},{
  sequelize: db,
  tableName: 'Bookings',
  modelName: 'Booking',
  timestamps: true,
  underscored: true
})

export default BookingModel;