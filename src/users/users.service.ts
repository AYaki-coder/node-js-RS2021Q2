import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ReturnUserDto } from './dto/return-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepo.create(createUserDto);
    return User.toResponse(await this.userRepo.save(user));
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userRepo.find();
    return users.map((user) => User.toResponse(user));
  }

  async findOne(id: string): Promise<ReturnUserDto> {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new HttpException(`The User with id ${id} was not found.`, 404);
    }
    return User.toResponse(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new HttpException(`The User with id ${id} was not found.`, 404);
    }
    const updatedUser = await this.userRepo.save({
      ...user,
      ...updateUserDto,
    });
    return User.toResponse(updatedUser);
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new HttpException(`The User with id ${id} was not found.`, 404);
    }
    await this.userRepo.delete(id);

    return user;
  }
}
