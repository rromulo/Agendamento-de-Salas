import { Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';

class LogModel extends Model {
  declare id: string;
  declare action: string;
  declare description: string;
  declare uuserId: string;
  
  declare  readonly createdAt: Date;
}

LogModel.init({
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  action: {
    type: sequelize.TEXT,
  },
  description: {
    type: sequelize.TEXT
  },
  userId: {
    type: sequelize.STRING,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
},{
  sequelize: db,
  tableName: 'Logs',
  modelName: 'Log',
  timestamps: true,
  updatedAt: false,
  underscored: true
})

export default LogModel;