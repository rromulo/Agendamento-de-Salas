import jwt from 'jsonwebtoken';
import ApiError from '@utils/apiError';

export interface IJWTPayload {
  id: string;
  email: string
  name: string;
  role: string;
}

export default class JsonWebToken {
  private _secret: jwt.Secret;
  private _payload: IJWTPayload | undefined;
  private _authorization: string | undefined;

  constructor(payload?: IJWTPayload) {
    this._payload = payload;
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public verifyToken(authorization: string): IJWTPayload {
    if(!authorization) throw new ApiError(401, 'Unauthorized.');
    try {
      this._authorization = authorization
      
      const decoded = jwt.verify(this._authorization, this._secret) as IJWTPayload;
      return decoded
    } catch (error) {
      throw new ApiError(401, 'Token invalid.');
    }
  }
}