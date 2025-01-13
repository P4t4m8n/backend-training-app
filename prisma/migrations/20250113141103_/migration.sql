/*
  Warnings:

  - Made the column `trainerId` on table `Trainee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Trainer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_trainerId_fkey";

-- AlterTable
ALTER TABLE "Trainee" ALTER COLUMN "trainerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
