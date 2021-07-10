import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { finished } from 'stream';
import { logger } from './logger';

@Injectable()
export class LoggerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const isFastify = process.env.USE_FASTIFY === 'true';
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { query, url, body, method } = req;
    if (isFastify) {
      res.then(() => {
        const { statusCode } = res;
        logger.info({
          message: `
         method: ${method}, res.status: ${statusCode},
         url: ${url}
         query params: ${JSON.stringify(query)}
         body: ${JSON.stringify(body)}`,
        });
      });
    } else {
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
    }

    return true;
  }
}
