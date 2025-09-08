import { password } from '@infra/database/config/database';
import joi from 'joi';

const user = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  role: joi.string().valid('ADMIN', 'CLIENTE').required(),
  password: joi.string().min(8).required(),
  isActive: joi.boolean().required(),
  canScheduling: joi.boolean().required(),
  canViewLogs: joi.boolean().required(),
})

export = { user };