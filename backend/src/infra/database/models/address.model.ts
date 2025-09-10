import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import UserModel from './user.model';


class AddressModel extends Model<
  InferAttributes<AddressModel>,
  InferCreationAttributes<AddressModel>
> {
  declare id: CreationOptional<string>;
  declare cep: string;
  declare estado: string;
  declare cidade: string;
  declare bairro: string;
  declare rua: string;
  declare numero: string;
  declare complemento: string;
  declare userId: string;
}

AddressModel.init({
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  cep: {
    type: sequelize.STRING(8),
    allowNull: false,
  },
  estado: {
    type: sequelize.STRING(2),
    allowNull: false,
  },
  cidade: {
    type: sequelize.STRING(100),
    allowNull: false,
  },
  bairro: {
    type: sequelize.STRING(100),
    allowNull: false,
  },
  rua: {
    type: sequelize.STRING(100),
    allowNull: false,
  },
  numero: {
    type: sequelize.STRING(10),
    allowNull: false,
  },
  complemento: {
    type: sequelize.STRING(100),
    allowNull: true,
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
},{
  sequelize: db,
  tableName: 'Addresses',
  modelName: 'Address',
  underscored: true
})

UserModel.hasOne(AddressModel, {
  foreignKey: 'userId',
  as: 'address'
})
AddressModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user'
})


export default AddressModel;