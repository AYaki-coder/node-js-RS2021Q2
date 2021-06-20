import { createLogger, format, transports } from 'winston';
import { finished } from 'stream';
import { Request, Response, NextFunction } from 'express';

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: `logs/info.log`,
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info['timestamp']} ${info.level}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: `logs/error.log`,
      level: 'error',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info['timestamp']} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

export const logAllRequests = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { query, url, body, method } = req;
  finished(res, () => {
    const { statusCode } = res;
    logger.info({
      message: `
       method: ${method}, res.status: ${statusCode},
       url: ${url}
       query params: ${JSON.stringify(query)}
       body: ${JSON.stringify(body)}`,
    });
  });

  next();
};

export const logAllErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { query, url, body, method } = req;
  finished(res, () => {
    const { statusCode } = res;
    logger.error({
      message: `Error!
       res.status: ${statusCode}
       message: ${err.message}
       method: ${method}
       url: ${url}
       query params: ${JSON.stringify(query)}
       body: ${JSON.stringify(body)}`,
    });
  });

  next();
};

export const logUncaughtException = (err: Error, origin: string): void => {
  logger.error({
    message: `Caught exception: ${err}
    Exception origin: ${origin}\n`,
  });
  logger.exitOnError = true;
};

export const logUnhandledRejection = (message: string): void => {
  logger.error({
    message: `${message}`,
  });
};
