import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { LoginDto, RegisterDto } from './dto/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });

    if (!user) throw new UnauthorizedException('Invalid Username or Password');

    const isValidPassword = await argon.verify(user.password, dto.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid Username or Password');

    return this.signToken(user.id, user.email);
  }

  async register(dto: RegisterDto) {
    const password = await argon.hash(dto.password);

    try {
      const user: User = await this.prisma.user.create({
        data: {
          email: dto.email.toLowerCase(),
          password,
          firstname: dto.firstname,
          lastname: dto.lastname,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<{ access: string }> {
    const payload = { sub: userId, email };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access: token,
    };
  }
}
