import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getLoggedInUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    delete user.password;
    return user;
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    delete user.password;
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const data = dto?.password
        ? {
            firstname: dto.firstname,
            lastname: dto.lastname,
            email: dto.email.toLowerCase(),
            password: await argon.hash(dto.password),
          }
        : {
            firstname: dto.firstname,
            lastname: dto.lastname,
            email: dto.email.toLowerCase(),
          };

      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: data,
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user.firstname === 'Gerasimos' && user.lastname === 'Lomvardos') {
      throw new ForbiddenException('Sorry, You cannot delete the test user');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
