import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';

class LogModel extends Model<
  InferAttributes<LogModel>,
  InferCreationAttributes<LogModel>
> { 
  declare id: CreationOptional<string>;
  declare userId: string;
  declare action: string;
  declare description: string;
  declare createdAt: CreationOptional<Date>;
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
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'user_id'
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