import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { finished } from 'stream';
import { logger } from './logger';

@Injectable()
export class LoggerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('loggerguard1');
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    console.log('loggerguard');
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

    return true;
  }
}
