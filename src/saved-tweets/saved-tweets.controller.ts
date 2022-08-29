import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { SaveTweetDto } from './dto/dto';
import { SavedTweetsService } from './saved-tweets.service';

@UseGuards(JwtGuard)
@Controller('api/saved-tweets')
export class SavedTweetsController {
  constructor(private savedTweetsService: SavedTweetsService) {}

  @Get('save-tweet')
  getSavedTweets(@GetUser('id') userId: number) {
    return this.savedTweetsService.getSavedTweets(userId);
  }

  @Post('save-tweet')
  saveTweet(@GetUser('id') userId: number, @Body() dto: SaveTweetDto) {
    return this.savedTweetsService.saveTweet(userId, dto);
  }

  @Delete('save-tweet/:savedTweetId')
  unSaveTweet(
    @GetUser('id') userId: number,
    @Param('savedTweetId', ParseIntPipe) savedTweetId: number,
  ) {
    return this.savedTweetsService.unSaveTweet(userId, savedTweetId);
  }
}
