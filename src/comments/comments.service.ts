import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetCommentDto } from './dto/dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createTweetComment(userId: number, dto: CreateTweetCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        description: dto.description,
        user: {
          connect: { id: userId },
        },
        tweet: {
          connect: { id: dto.tweetId },
        },
      },
    });
    return comment;
  }
}
