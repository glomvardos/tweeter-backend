import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('authenticated-user')
  getLoggedInUser(@GetUser('id') id: number) {
    return this.userService.getLoggedInUser(id);
  }

  @Get('user/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
}
