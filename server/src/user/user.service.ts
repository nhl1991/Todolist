import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DeleteUserDto, ResponseUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<ResponseUserDto> {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    data.password = hashedPassword;
    const user = await this.prisma.user.create({
      data,
    });

    const { password, id, uuid, ...rest } = user;

    return rest;
  }

  async deleteUser(data: DeleteUserDto): Promise<Partial<User>> {
    return await this.prisma.user.delete({
      omit: {
        password: true,
      },
      where: {
        email: data.email,
      },
    });
  }

  async updateUserName(
    email: string,
    username: string,
  ): Promise<Partial<User>> {
    return await this.prisma.user.update({
      omit: {
        password: true,
      },
      where: {
        email: email,
      },
      data: {
        username: username,
      },
    });
  }

  async updateUserPassword(
    email: string,
    dto: { password: string; newPassword: string },
  ): Promise<boolean> {
    const user = await this.prisma.user
      .findUniqueOrThrow({
        select: {
          password: true,
        },
        where: {
          email: email,
        },
      })
      .then((res) => {
        return bcrypt.compareSync(dto.password, res.password);
      });
    if (user) {
      const hashedPassword = bcrypt.hashSync(dto.newPassword, 10);
      await this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
        },
      });

      return true;
    }

    return false;
  }

  async getUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
