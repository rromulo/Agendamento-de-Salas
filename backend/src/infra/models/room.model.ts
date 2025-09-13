import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import BookingModel from './booking.model';
import LogModel from './log.model';

class RoomModel extends Model {
  declare id: string;
  declare name: string;
  declare description?: string;
  declare openTime: string;
  declare closeTime: string;
  declare scheduleBlock: string[]
}

RoomModel.init({
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true  
  },
  name: {
    type: sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: sequelize.TEXT,
    allowNull: true,
  },
  openTime:{
    type: sequelize.TIME,
    allowNull: false,
    field: 'open_time'
  },
  closeTime:{
    type: sequelize.TIME,
    allowNull: false,
    field: 'close_time'
  },
  scheduleBlock:{
    type: sequelize.JSON,
    allowNull: false,
    field: 'schedule_block'
  }
},{
  sequelize: db,
  tableName: 'Rooms',
  modelName: 'Room',
  timestamps: false,
  underscored: true
})

RoomModel.hasMany(BookingModel, {
  foreignKey: 'roomId',
  as: 'bookings'
})
BookingModel.belongsTo(RoomModel, {
  foreignKey: 'roomId',
  as: 'room'
})

export default RoomModel;