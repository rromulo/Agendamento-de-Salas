import jwt from 'jsonwebtoken';
import ApiError from '@utils/apiError';
import { NextFunction, Request, Response } from 'express';

export interface IJWTPayload {
  id: string;
  email: string
  name: string;
  role: string;
}
const secret = process.env.JWT_SECRET || 'jwt_secret';

export const  verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization');
    console.log('TOKEN VERIFYTOKEN')
    if(!token) throw new ApiError(401, 'Token não autorizado.')
    
    const decoded = jwt.verify(token, secret) as IJWTPayload;
    console.log('DECODED VERIFYTOKEN')
    res.locals.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}