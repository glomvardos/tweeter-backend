import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetCommentDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  tweetId: number;
}
