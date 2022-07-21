import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/dto';

@Injectable()
export class TweetsService {
  constructor(private prisma: PrismaService) {}

  async createTweet(userId: number, dto: CreateTweetDto) {
    const tweet = this.prisma.tweet.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
      },
    });

    return tweet;
  }

  async getTweets() {
    const tweets = await this.prisma.tweet.findMany({
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return tweets;
  }
}
