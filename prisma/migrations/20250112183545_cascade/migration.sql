-- DropForeignKey
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_userId_fkey";

-- DropForeignKey
ALTER TABLE "TraineeMetrics" DROP CONSTRAINT "TraineeMetrics_traineeId_fkey";

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeMetrics" ADD CONSTRAINT "TraineeMetrics_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
