import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';

const ErrorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => res.status(error._statusCode || 500)
    .json({ message: error.message || 'Internal server Error' });

export default ErrorMiddleware;
