/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `userVideosURL` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `videosURL` on the `Training` table. All the data in the column will be lost.
  - Added the required column `name` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VideoOwner" AS ENUM ('USER', 'TRAINER');

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "exerciseId",
DROP COLUMN "userVideosURL",
DROP COLUMN "videosURL",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "playbackUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "videoOwner" "VideoOwner" NOT NULL DEFAULT 'TRAINER',

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
