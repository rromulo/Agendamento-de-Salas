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

const room = joi.object({
  name: joi.string().required(),
  description: joi.optional(),
  openTime: joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required(),
  closeTime: joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required(),
  scheduleBlock: joi.array().items(joi.string()).required(),
})

const booking = joi.object({
  roomId: joi.string().required(),
  userId: joi.string().required(),
  date: joi.date().required(),
  startTime: joi.string().required(),
  endTime: joi.string().required(),
  status: joi.string().valid('pendente').required(),
})

export = { user, room, booking };