/*
  Warnings:

  - Added the required column `rest` to the `Sets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AuthStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Program';

-- AlterTable
ALTER TABLE "Sets" ADD COLUMN     "rest" INTEGER NOT NULL;
