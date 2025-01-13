-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_traineeId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Trainer" DROP CONSTRAINT "Trainer_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingToTrainee" DROP CONSTRAINT "TrainingToTrainee_programId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingToTrainee" DROP CONSTRAINT "TrainingToTrainee_traineeId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingToTrainee" DROP CONSTRAINT "TrainingToTrainee_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_traineeFeedbackVideoId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_trainerInstructionVideoId_fkey";

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_trainerInstructionVideoId_fkey" FOREIGN KEY ("trainerInstructionVideoId") REFERENCES "TrainingToTrainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_traineeFeedbackVideoId_fkey" FOREIGN KEY ("traineeFeedbackVideoId") REFERENCES "TrainingToTrainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingToTrainee" ADD CONSTRAINT "TrainingToTrainee_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingToTrainee" ADD CONSTRAINT "TrainingToTrainee_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingToTrainee" ADD CONSTRAINT "TrainingToTrainee_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
