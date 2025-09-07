import 'dotenv/config'
import { Options } from 'sequelize';

const config: Options =
  {
    username: 'root',
    password: 'root',
    database: 'db_scheduling',
    host: 'db',
    dialect: 'mysql',
    port: 3306,
    logging: false,
    timezone: '-03:00',
  }

export = config;
