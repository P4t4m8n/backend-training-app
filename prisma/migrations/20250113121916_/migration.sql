/*
  Warnings:

  - Made the column `userId` on table `Trainee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trainee" ALTER COLUMN "userId" SET NOT NULL;
