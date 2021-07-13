import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), LoginModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
