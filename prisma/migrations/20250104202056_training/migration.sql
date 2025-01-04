/*
  Warnings:

  - You are about to drop the column `programToExerciseId` on the `Sets` table. All the data in the column will be lost.
  - You are about to drop the column `goalSets` on the `Training` table. All the data in the column will be lost.
  - Added the required column `trainingId` to the `Sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_programToExerciseId_fkey";

-- AlterTable
ALTER TABLE "Sets" DROP COLUMN "programToExerciseId",
ADD COLUMN     "trainingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "goalSets",
ADD COLUMN     "goalSet" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
