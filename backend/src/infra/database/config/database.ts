import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'db_scheduling',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);

export default sequelize;
