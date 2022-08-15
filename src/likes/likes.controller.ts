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
import { LikeCommentDto } from './dto/dto';
import { LikesService } from './likes.service';

@UseGuards(JwtGuard)
@Controller('api/likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('like')
  likeComment(@GetUser('id') userId: number, @Body() dto: LikeCommentDto) {
    return this.likesService.likeComment(userId, dto);
  }

  @Delete('like/:likeId')
  unlikeComment(
    @GetUser('id') userId: number,
    @Param('likeId', ParseIntPipe) likeId: number,
  ) {
    return this.likesService.unlikeComment(userId, likeId);
  }
}
