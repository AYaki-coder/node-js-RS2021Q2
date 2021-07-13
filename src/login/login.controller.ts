import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() createUserDto: CreateUserDto) {
    return this.loginService.login(createUserDto);
  }
}
