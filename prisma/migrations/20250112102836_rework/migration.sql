/*
  Warnings:

  - You are about to drop the column `userId` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `goalSet` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `isTrainer` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `trainingId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sets` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `format` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VideoFormat" AS ENUM ('MP4', 'MOV', 'AVI', 'FLV', 'WMV', 'MKV', 'WEBM');

-- CreateEnum
CREATE TYPE "SetType" AS ENUM ('DEFAULT', 'USER_HISTORY', 'TRAINER', 'TRAINER_HISTORY');

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_programId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_trainingId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "userId",
ADD COLUMN     "traineeId" TEXT,
ADD COLUMN     "trainerId" TEXT;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "goalSet",
DROP COLUMN "programId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isTrainer";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "trainingId",
ADD COLUMN     "traineeFeedbackVideoId" TEXT,
ADD COLUMN     "trainerInstructionVideoId" TEXT,
DROP COLUMN "format",
ADD COLUMN     "format" "VideoFormat" NOT NULL;

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "Sets";

-- CreateTable
CREATE TABLE "Trainee" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "trainerId" TEXT,

    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraineeMetrics" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "heartRate" INTEGER,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "age" DOUBLE PRECISION,
    "bloodPressureSystole" INTEGER,
    "bloodPressureDiastole" INTEGER,

    CONSTRAINT "TraineeMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,
    "setType" "SetType" NOT NULL,
    "trainingId" TEXT,
    "traineeSetsId" TEXT,
    "trainerSetsId" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingToTrainee" (
    "id" TEXT NOT NULL,
    "traineeSet" INTEGER NOT NULL,
    "trainerSet" INTEGER NOT NULL,
    "trainingId" TEXT NOT NULL,
    "programId" TEXT,
    "traineeId" TEXT NOT NULL,

    CONSTRAINT "TrainingToTrainee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trainee_userId_key" ON "Trainee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingToTrainee_trainingId_key" ON "TrainingToTrainee"("trainingId");

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeMetrics" ADD CONSTRAINT "TraineeMetrics_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_traineeSetsId_fkey" FOREIGN KEY ("traineeSetsId") REFERENCES "TrainingToTrainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_trainerSetsId_fkey" FOREIGN KEY ("trainerSetsId") REFERENCES "TrainingToTrainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_trainerInstructionVideoId_fkey" FOREIGN KEY ("trainerInstructionVideoId") REFERENCES "TrainingToTrainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_traineeFeedbackVideoId_fkey" FOREIGN KEY ("traineeFeedbackVideoId") REFERENCES "TrainingToTrainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingToTrainee" ADD CONSTRAINT "TrainingToTrainee_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingToTrainee" ADD CONSTRAINT "TrainingToTrainee_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingToTrainee" ADD CONSTRAINT "TrainingToTrainee_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
