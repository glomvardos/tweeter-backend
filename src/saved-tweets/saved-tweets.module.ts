import { Module } from '@nestjs/common';
import { SavedTweetsController } from './saved-tweets.controller';
import { SavedTweetsService } from './saved-tweets.service';

@Module({
  controllers: [SavedTweetsController],
  providers: [SavedTweetsService],
})
export class SavedTweetsModule {}
