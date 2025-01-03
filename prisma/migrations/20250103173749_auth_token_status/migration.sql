/*
  Warnings:

  - Added the required column `status` to the `AuthToken` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthStatus" AS ENUM ('SENT', 'CONFIRMED');

-- AlterTable
ALTER TABLE "AuthToken" ADD COLUMN     "status" "AuthStatus" NOT NULL;
