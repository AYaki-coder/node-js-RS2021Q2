import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

// const router = Router();

// router.route('/').get(async (_, res, next) => {
//   try {
//     const users = await usersService.getAll();
//     // map user fields to exclude secret fields like "password"
//     res.json(users.map(User.toResponse));
//   } catch (error) {
//     next(error);
//   }
// });

// router.route('/:id').get(async (req, res, next) => {
//   try {
//     const user = await usersService.get(req.params.id);
//     res.json(User.toResponse(user));
//   } catch (e) {
//     next(e);
//   }
// });

// router.route('/').post(async (req, res, next) => {
//   try {
//     const user = await usersService.create(req.body);
//     res.status(201).json(User.toResponse(user));
//   } catch (error) {
//     next(error);
//   }
// });

// router.route('/:id').put(async (req, res, next) => {
//   try {
//     const user = await usersService.update(req.params.id, req.body);
//     res.json(User.toResponse(user));
//   } catch (e) {
//     next(e);
//   }
// });

// router.route('/:id').delete(async (req, res, next) => {
//   try {
//     await usersService.remove(req.params.id);
//     res.status(204).send('The user has been deleted');
//   } catch (e) {
//     next(e);
//   }
// });
