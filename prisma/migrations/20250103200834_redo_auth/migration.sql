/*
  Warnings:

  - You are about to drop the column `phoneDeviceToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `trustedDeviceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AuthToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_userId_fkey";

-- DropIndex
DROP INDEX "User_phoneDeviceToken_key";

-- DropIndex
DROP INDEX "User_trustedDeviceId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneDeviceToken",
DROP COLUMN "trustedDeviceId",
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "passwordHash" TEXT;

-- DropTable
DROP TABLE "AuthToken";
