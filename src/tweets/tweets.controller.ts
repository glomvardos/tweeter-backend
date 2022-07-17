import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateTweetDto } from './dto/dto';
import { TweetsService } from './tweets.service';

@UseGuards(JwtGuard)
@Controller('api/tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Post('tweet')
  createTweet(@GetUser('id') userId: number, @Body() dto: CreateTweetDto) {
    return this.tweetsService.createTweet(userId, dto);
  }
}
