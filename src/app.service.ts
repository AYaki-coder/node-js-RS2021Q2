import { Injectable } from '@nestjs/common';
import { ReturnUserDto } from './users/dto/return-user.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}
  createAdmin(): Promise<ReturnUserDto> {
    return this.userService.create({
      login: 'admin',
      password: 'admin',
      name: 'Admin',
    });
  }
}
