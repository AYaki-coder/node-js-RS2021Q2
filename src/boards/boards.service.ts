import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private readonly boardRepo: Repository<Board>,
  ) {}
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardRepo.create(createBoardDto);
    return this.boardRepo.save(board);
  }

  findAll(): Promise<Board[]> {
    return this.boardRepo.find();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepo.findOne(id);

    if (!board) {
      throw new HttpException(`The Board with id ${id} was not found.`, 404);
    }
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.boardRepo.findOne(id);
    if (!board) {
      throw new HttpException(`The Board with id ${id} was not found.`, 404);
    }
    const updatedBoard = await this.boardRepo.save({
      ...board,
      ...updateBoardDto,
    });
    return updatedBoard;
  }

  async remove(id: string): Promise<Board> {
    const board = await this.boardRepo.findOne(id);

    if (!board) {
      throw new HttpException(`The Board with id ${id} was not found.`, 404);
    }
    await this.boardRepo.delete(id);

    return board;
  }
}
