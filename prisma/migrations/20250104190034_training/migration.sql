/*
  Warnings:

  - You are about to drop the `ProgramToExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgramToExercise" DROP CONSTRAINT "ProgramToExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramToExercise" DROP CONSTRAINT "ProgramToExercise_programId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_programToExerciseId_fkey";

-- DropTable
DROP TABLE "ProgramToExercise";

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "videosURL" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userVideosURL" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "exerciseId" TEXT NOT NULL,
    "set" INTEGER NOT NULL DEFAULT 1,
    "goalSets" INTEGER NOT NULL DEFAULT 1,
    "programId" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_programToExerciseId_fkey" FOREIGN KEY ("programToExerciseId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
