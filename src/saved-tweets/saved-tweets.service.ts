import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveTweetDto } from './dto/dto';

@Injectable()
export class SavedTweetsService {
  constructor(private prisma: PrismaService) {}

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
}
