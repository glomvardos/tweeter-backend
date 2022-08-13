import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateTweetCommentDto } from './dto/dto';

@UseGuards(JwtGuard)
@Controller('api/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('comment')
  createTweetComment(
    @GetUser('id') userId: number,
    @Body() dto: CreateTweetCommentDto,
  ) {
    return this.commentsService.createTweetComment(userId, dto);
  }
}
