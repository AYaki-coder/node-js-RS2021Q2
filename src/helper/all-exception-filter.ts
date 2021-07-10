import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { logger } from './logger';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const isFastify = process.env.USE_FASTIFY === 'true';
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception?.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception?.message?.error ?? exception?.message ?? 'something went wrong';

    const { method, body, query, url } = request;

    logger.error({
      message: `Error!
       res.status: ${status}
       message: ${message}
       method: ${method}
       url: ${url}
       query params: ${JSON.stringify(query)}
       body: ${JSON.stringify(body)}`,
    });

    if (isFastify) {
      response.status(status).send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
