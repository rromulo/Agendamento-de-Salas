import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import BookingModel from './booking.model';
import LogModel from './log.model';

class UserModel extends Model {
  declare id: string;
  declare name:string;
  declare email: string;
  declare password: string;
  declare role: 'ADMIN' | 'CLIENTE'
  declare isActive: boolean;
  declare isSchedulingActive: boolean;
  declare isLogsActive: boolean;
}

UserModel.init({
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: sequelize.ENUM('ADMIN', 'CLIENTE'),
    allowNull: false,
    defaultValue: 'CLIENTE',
  },
  isActive: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  canScheduling: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  canViewLogs: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize: db,
  tableName: 'Users',
  modelName: 'User',
  timestamps: false,
  underscored: true
})

UserModel.hasMany(BookingModel, {
  foreignKey: 'userId',
  as: 'bookings'
})
BookingModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user'
})

UserModel.hasMany(LogModel, {
  foreignKey: 'userId',
  as: 'logs'
})

LogModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user'
})

export default UserModel;