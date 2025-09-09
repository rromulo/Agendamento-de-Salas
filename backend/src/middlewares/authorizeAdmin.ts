import { NextFunction, Request, Response } from 'express';
import { User } from '@core/entities/user.entity';
import ApiError from '@utils/apiError';

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const payload = res.locals.user;
    if(!payload) throw new ApiError(401, 'Token não autorizado.');
    
    const isAdmin = (payload.data.role === "ADMIN");
    console.log('PAYLOAD AUTHORIZE ADMIN -->', isAdmin)
    if(!isAdmin) throw new ApiError(403, 'Token não autorizado');
    
    next();
  } catch (error) {
    next(error)
  }
}