import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { SaveTweetDto } from './dto/dto';
import { SavedTweetsService } from './saved-tweets.service';

@UseGuards(JwtGuard)
@Controller('saved-tweets')
export class SavedTweetsController {
  constructor(private savedTweetsService: SavedTweetsService) {}

  @Post('save-tweet')
  saveTweet(@GetUser('id') userId: number, @Body() dto: SaveTweetDto) {
    return this.savedTweetsService.saveTweet(userId, dto);
  }
}
