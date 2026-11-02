import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Todo } from 'src/generated/prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(todo: Prisma.TodoCreateInput): Promise<Todo> {
    return await this.prisma.todo.create({ data: todo });
  }

  async findAll(userCursor: string | null) {
    const data = await this.prisma.todo.findMany({
      take: 11,
      where: {
        public: true,
      },
      ...(userCursor
        ? {
            cursor: { id: Number(userCursor) },
            // skip: 1,
          }
        : {}),
      orderBy: {
        createdDt: 'desc',
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    let nextCursor: number | null = null;

    if (data.length > 10) {
      const nextItem = data.pop(); // 마지막 1개 제거
      nextCursor = nextItem!.id;
    }

    return {
      data: data,
      cursor: nextCursor,
    };
  }

  async findOne(id: number) {
    return await this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateTodoDto: Prisma.TodoUpdateInput,
    userId: number,
  ) {
    const todo = await this.findOne(id);
    if (!todo) throw new NotFoundException('게시물 없음');
    if (todo.authorId !== userId) throw new ForbiddenException();

    return await this.prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        ...updateTodoDto,
      },
    });
  }

  async delete(id: number, userId: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException();
    if (todo.authorId !== userId) throw new ForbiddenException();
    return await this.prisma.todo.delete({
      where: {
        id: id,
      },
    });
  }

  async getUserTodos(id: number) {
    return this.prisma.todo.findMany({
      where: {
        authorId: id,
      },
      orderBy: {
        createdDt: 'desc',
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}
