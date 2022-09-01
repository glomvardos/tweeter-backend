-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikeTweet" DROP CONSTRAINT "LikeTweet_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedTweet" DROP CONSTRAINT "SavedTweet_userId_fkey";

-- AddForeignKey
ALTER TABLE "SavedTweet" ADD CONSTRAINT "SavedTweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeTweet" ADD CONSTRAINT "LikeTweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeComment" ADD CONSTRAINT "LikeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
