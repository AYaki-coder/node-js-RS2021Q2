import { NestFactory } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoggerGuard } from './helper/logger.guard';
import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const isFastify = process.env.USE_FASTIFY === 'true';
  let app: INestApplication;
  if (isFastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.useGlobalGuards(new LoggerGuard());
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ login: 'admin' });
  if (!user) {
    const admin = userRepo.create({
      login: 'admin',
      name: 'Admin',
      password: await bcrypt.hashSync('admin', 10),
    });
    await userRepo.save(admin);
  }
  await app.listen(process.env.PORT);
  console.log(`Service is running on port ${process.env.PORT}`);
}
bootstrap();
