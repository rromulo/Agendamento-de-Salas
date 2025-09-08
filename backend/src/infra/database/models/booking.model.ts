import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';


class BookingModel extends Model {
  declare id: string;
  declare roomId: string;
  declare userId: string;
  declare date: Date;
  declare startTime: string;
  declare endTime: string;
  declare status: string;
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
    type: sequelize.ENUM('PENDENTE', 'CONFIRMADO', 'RECUSADO'),
    allowNull: false,
    defaultValue: 'PENDENTE',
  },
  createdAt: {
    allowNull: false,
    type: sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: sequelize.DATE
  }
},{
  sequelize: db,
  tableName: 'Bookings',
  modelName: 'Booking',
  timestamps: false,
  underscored: true
})

export default BookingModel;