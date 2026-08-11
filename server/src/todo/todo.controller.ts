import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Query,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 게시글 생성
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const { userId } = req.user;

    return await this.todoService.create({
      ...createTodoDto,
      User: {
        connect: { id: userId },
      },
    });
  }

  // 모든 게시글 (public true)
  @Get()
  async findAll(@Query('cursor') cursor: string | null) {
    if (cursor === 'null') cursor = null;
    return await this.todoService.findAll(cursor);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-todo/:id')
  getUserTodos(@Param('id') id: string, @Req() req) {
    const { userId } = req.user;
    if (+id !== +userId) throw new ForbiddenException();

    return this.todoService.getUserTodos(+id);
  }

  // 게시글 검색
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const todo = await this.todoService.findOne(+id);
    if (!todo) throw new NotFoundException();
    if (!todo.public && todo.authorId !== req.user?.userId) {
      throw new NotFoundException();
    }
    return todo;
  }

  // 게시글 수정
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
  ) {
    if (req.user) {
      const { userId } = req.user;

      return this.todoService.update(+id, updateTodoDto, +userId);
    }
  }

  // 게시글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    if (req.user) {
      const { userId } = req.user;
      return this.todoService.delete(+id, +userId);
    }
  }
}
