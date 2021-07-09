import { NestFactory } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
