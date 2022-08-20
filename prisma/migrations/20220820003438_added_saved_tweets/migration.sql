-- CreateTable
CREATE TABLE "SavedTweet" (
    "id" SERIAL NOT NULL,
    "tweetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SavedTweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedTweet" ADD CONSTRAINT "SavedTweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTweet" ADD CONSTRAINT "SavedTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
