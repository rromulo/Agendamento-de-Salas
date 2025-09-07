import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import BookingModel from './booking.model';

class RoomModel extends Model {
  declare id: string;
  declare name: string;
  declare openTime: string;
  declare closeTime: string;
  declare isActive: boolean;
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
  openTime:{
    type: sequelize.TIME,
    allowNull: false,
  },
  closeTime:{
    type: sequelize.TIME,
    allowNull: false,
  },
  isActive: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
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
  as: 'user'
})

export default RoomModel;