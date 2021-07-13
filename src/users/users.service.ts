import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ReturnUserDto } from './dto/return-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepo.create({
      ...createUserDto,
      password: hashPassword,
    });
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
    let updatedUser: User;
    if (updateUserDto) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      updatedUser = await this.userRepo.save({
        ...user,
        ...updateUserDto,
        password: hashPassword,
      });
    } else {
      updatedUser = await this.userRepo.save({
        ...user,
        ...updateUserDto,
      });
    }

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
