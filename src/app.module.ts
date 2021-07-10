import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';
import { LoginModule } from './login/login.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './helper/all-exception-filter';
import { dbMigration1624438681352 } from './migration/1624438681352-dbMigration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Task],
      synchronize: true,
      migrationsRun: false,
      logging: false,
      dropSchema: true,
      autoLoadEntities: true,
      migrations: [dbMigration1624438681352],
      cli: {
        migrationsDir: 'src/migration',
      },
    }),
    BoardsModule,
    TasksModule,
    LoginModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
