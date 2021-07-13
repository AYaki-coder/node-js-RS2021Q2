import { Module } from '@nestjs/common';
import { AllExceptionFilter } from './all-exception-filter';
import { LoggerGuard } from './logger.guard';

@Module({
  providers: [LoggerGuard, AllExceptionFilter],
  exports: [LoggerGuard, AllExceptionFilter],
})
export class HelperModule {}
