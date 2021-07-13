import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.signToken(user);
  }

  private async validateUser(createUserDto: CreateUserDto) {
    const { login, password: passwordDto } = createUserDto;
    const user = await this.userRepo.findOne({ where: { login } });
    const isPasswordMatched = await bcrypt.compare(passwordDto, user?.password);

    if (user && isPasswordMatched) {
      return user;
    }
    throw new HttpException(
      'Wrong login/password combination',
      HttpStatus.FORBIDDEN,
    );
  }

  private async signToken(user: User) {
    const token = this.jwtService.sign({ userId: user.id, login: user.login });
    return { token };
  }
}
