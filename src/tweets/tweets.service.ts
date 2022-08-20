import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/dto';

@Injectable()
export class TweetsService {
  constructor(private prisma: PrismaService) {}

  async createTweet(userId: number, dto: CreateTweetDto) {
    const tweet = await this.prisma.tweet.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
      },
    });

    return tweet;
  }

  async getTweets(userId: number) {
    const tweets = await this.prisma.tweet.findMany({
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        likes: {
          where: {
            userId,
          },
        },
        savedTweets: {
          where: {
            userId,
          },
        },
        _count: {
          select: {
            savedTweets: true,
          },
        },
        comments: {
          select: {
            id: true,
            createdAt: true,
            description: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
            likes: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });

    return tweets;
  }
}
