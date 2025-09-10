import { Sequelize } from 'sequelize';
import * as config from '@infra/database/config/database';

export default new Sequelize(config)