import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  DeleteUserDto,
  ResponseUserDto,
  UpdateUserDto,
} from './user.dto';
import { User } from 'src/generated/prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() user: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.createUser(user);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:email/username')
  updateUsername(
    @Param('email') email: string,
    @Body() dto: UpdateUserDto,
    @Req() req,
  ): Promise<Partial<User>> {
    if (req.user.email !== email) throw new ForbiddenException();
    return this.userService.updateUserName(email, dto.username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  deleteUser(@Body() user: DeleteUserDto, @Req() req): Promise<Partial<User>> {
    if (req.user.email !== user.email) throw new ForbiddenException();
    return this.userService.deleteUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:email/password')
  updatePassword(
    @Param('email') email: string,
    @Body() dto: { password: string; newPassword: string },
    @Req() req,
  ): Promise<boolean> {
    if (req.user.email !== email) throw new ForbiddenException();
    return this.userService.updateUserPassword(email, dto);
  }
}
