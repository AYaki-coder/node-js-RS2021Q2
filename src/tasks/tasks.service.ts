import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepo.create({ ...createTaskDto, boardId });
    return this.taskRepo.save(task);
  }

  findAll(boardId): Promise<Task[]> {
    return this.taskRepo.find({ where: { boardId: boardId } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne(id);

    if (!task) {
      throw new HttpException(`The Task with id ${id} was not found.`, 404);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepo.findOne(id);
    if (!task) {
      throw new HttpException(`The Task with id ${id} was not found.`, 404);
    }
    const updatedTask = await this.taskRepo.save({
      ...task,
      ...updateTaskDto,
    });

    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne(id);

    if (!task) {
      throw new HttpException(`The Task with id ${id} was not found.`, 404);
    }
    await this.taskRepo.delete(id);

    return task;
  }
}
