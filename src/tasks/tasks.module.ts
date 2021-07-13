import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), LoginModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
