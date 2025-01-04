/*
  Warnings:

  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniquePhoneId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleId",
DROP COLUMN "passwordHash",
ADD COLUMN     "uniquePhoneId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_uniquePhoneId_key" ON "User"("uniquePhoneId");
