import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './config';

const { JWT_SECRET_KEY } = config;

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [prop, token] = authHeader.split(' ');
    if (prop !== 'Bearer' || !token || !JWT_SECRET_KEY) {
      res.status(401).send('Wrong auth schema!');
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        res.status(401).send('Unauthorized!');
      }
      return next();
    }
  }
  res.status(401).send('Unauthorized!');
};
