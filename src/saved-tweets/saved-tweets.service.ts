import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveTweetDto } from './dto/dto';

@Injectable()
export class SavedTweetsService {
  constructor(private prisma: PrismaService) {}

  async getSavedTweets(userId: number) {
    const savedTweets = await this.prisma.savedTweet.findMany({
      where: {
        userId,
      },
      include: {
        tweet: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            description: true,
            isPublic: true,
            userId: true,
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
            savedTweets: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });
    const returnedTweets = savedTweets.map((tweet) => ({
      ...tweet.tweet,
    }));

    return returnedTweets;
  }

  async saveTweet(userId: number, dto: SaveTweetDto) {
    const alreadySaved = await this.prisma.savedTweet.findFirst({
      where: {
        tweetId: dto.tweetId,
        userId,
      },
    });

    if (alreadySaved) {
      throw new BadRequestException('You have already saved this tweet');
    }

    const savedTweet = await this.prisma.savedTweet.create({
      data: {
        user: {
          connect: { id: userId },
        },
        tweet: {
          connect: { id: dto.tweetId },
        },
      },
    });

    return savedTweet;
  }

  async unSaveTweet(userId: number, savedTweetId: number) {
    const alreadySaved = await this.prisma.savedTweet.findFirst({
      where: {
        id: savedTweetId,
        userId,
      },
    });

    if (!alreadySaved) {
      throw new BadRequestException('You did not saved this tweet');
    }

    const savedTweet = await this.prisma.savedTweet.delete({
      where: {
        id: savedTweetId,
      },
    });

    return savedTweet;
  }
}
