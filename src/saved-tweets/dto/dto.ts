import { IsInt, IsNotEmpty } from 'class-validator';

export class SaveTweetDto {
  @IsNotEmpty()
  @IsInt()
  tweetId: number;
}
