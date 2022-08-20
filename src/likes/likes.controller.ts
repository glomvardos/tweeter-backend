import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { LikeCommentDto, LikeTweetDto } from './dto/dto';
import { LikesService } from './likes.service';

@UseGuards(JwtGuard)
@Controller('api/likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('like/comment')
  likeComment(@GetUser('id') userId: number, @Body() dto: LikeCommentDto) {
    return this.likesService.likeComment(userId, dto);
  }

  @Delete('like/:likeId/comment')
  unlikeComment(
    @GetUser('id') userId: number,
    @Param('likeId', ParseIntPipe) likeId: number,
  ) {
    return this.likesService.unlikeComment(userId, likeId);
  }

  @Post('like/tweet')
  likeTweet(@GetUser('id') userId: number, @Body() dto: LikeTweetDto) {
    return this.likesService.likeTweet(userId, dto);
  }

  @Delete('like/:likeId/tweet')
  unlikeTweet(
    @GetUser('id') userId: number,
    @Param('likeId', ParseIntPipe) likeId: number,
  ) {
    return this.likesService.unlikeTweet(userId, likeId);
  }
}
