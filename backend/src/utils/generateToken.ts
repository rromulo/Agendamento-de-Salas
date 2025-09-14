import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string

const generateToken = (object: any) => {

  const config: jwt.SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256'
  }

  const token = jwt.sign({data: {...object }}, secret, config)
  return token
}

export default generateToken;
