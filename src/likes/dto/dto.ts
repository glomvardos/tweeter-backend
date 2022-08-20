import { IsInt, IsNotEmpty } from 'class-validator';

export class LikeCommentDto {
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}
export class LikeTweetDto {
  @IsNotEmpty()
  @IsInt()
  tweetId: number;
}
