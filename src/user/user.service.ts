import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
