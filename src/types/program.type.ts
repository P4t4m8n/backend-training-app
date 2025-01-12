import { DaysOfWeek } from "@prisma/client";
import { TEntity } from "./app.type";
import { TTraining, TTrainingToTrainee } from "./training.type";

export type TProgram = TEntity & {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  days?: DaysOfWeek[];
  trainings?: TTrainingToTrainee[];
  isActive?: boolean;
};

export type TProgramDto = TEntity &
  Omit<TProgram, "trainings"> & {
    traineeId?: string;
    trainerId?: string;
  };
export type TProgramFilter = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  traineeId?: string;
  trainerId?: string;
};
