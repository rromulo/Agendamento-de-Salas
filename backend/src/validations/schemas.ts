import { password } from '@infra/database/config/database';
import joi from 'joi';

const user = joi.object({
  name: joi.string().email().required(),
  password: joi.string().min(8).required()
})

export = { user };