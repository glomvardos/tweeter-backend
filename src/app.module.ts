import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TweetsModule } from './tweets/tweets.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { SavedTweetsModule } from './saved-tweets/saved-tweets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    TweetsModule,
    CommentsModule,
    LikesModule,
    SavedTweetsModule,
  ],
})
export class AppModule {}
