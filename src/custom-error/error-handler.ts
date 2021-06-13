import { CustomError } from './custom-error';
import { Request, Response, NextFunction } from 'express';
import {
  logAllErrors,
  logUncaughtException,
  logUnhandledRejection,
} from './../logger/logger';

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logAllErrors(err, req, res, next);
  if (err instanceof CustomError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send('Something broke!');
  }
  next();
};

export const handleUncaughtException = (err: Error, origin: string): void =>
  logUncaughtException(err, origin);

export const handleUnhandledRejection = (message: string): void =>
  logUnhandledRejection(message);
