import { IsInt, IsNotEmpty } from 'class-validator';

export class LikeCommentDto {
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}
