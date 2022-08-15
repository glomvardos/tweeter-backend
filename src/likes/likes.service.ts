import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeCommentDto } from './dto/dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likeComment(userId: number, dto: LikeCommentDto) {
    const alreadyLiked = await this.prisma.likeComment.findFirst({
      where: {
        commentId: dto.commentId,
        userId,
      },
    });

    if (alreadyLiked) {
      throw new BadRequestException('You already liked this comment');
    }

    const like = await this.prisma.likeComment.create({
      data: {
        user: {
          connect: { id: userId },
        },
        comment: {
          connect: { id: dto.commentId },
        },
      },
    });

    return like;
  }

  async unlikeComment(userId: number, likeId: number) {
    const alreadyLiked = await this.prisma.likeComment.findFirst({
      where: {
        id: likeId,
        userId,
      },
    });

    if (!alreadyLiked) {
      throw new BadRequestException('You did not like this comment');
    }

    const like = await this.prisma.likeComment.delete({
      where: {
        id: likeId,
      },
    });

    return like;
  }
}
