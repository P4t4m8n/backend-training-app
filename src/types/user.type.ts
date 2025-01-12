import { TEntity } from "./app.type";
import { TProgram } from "./program.type";
import { TTrainingToTrainee } from "./training.type";

export type TUser = TEntity & {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string | null;
  uniquePhoneId?: string | null;
  imgUrl?: string | null;
  trainer?: TTrainer;
  trainee?: TTrainee;
};

export type TUserDto = Omit<TUser, "trainer" | "trainee">;

export type TUserFilter = {
  email?: string;
  phone?: string;
};

export type TTrainee = TEntity & {
  programs: TProgram[];
  trainings: TTrainingToTrainee;
  trainer?: Omit<TUser, "trainee" | "uniquePhoneId">;
  metrics?: TTraineeMetrics;
};

export type TraineeDto = TEntity & {
  userId: string;
  trainerId?: string;
};

export type TTraineeMetrics = TEntity & {
  heartRate?: number;
  weight?: number;
  height?: number;
  age?: number;
  bloodPressureSystole?: number;
  bloodPressureDiastole?: number;
  date?: Date;
};

export type TTraineeMetricsDto = Omit<TTraineeMetrics, "date"> & {
  traineeId: string;
};

export type TTrainer = TEntity & {
  trainees: Omit<TUser, "trainer" | "uniquePhoneId">[];
  programs: TProgram[];
};
export type TTrainerDto = TEntity & {
  userId: string;
};
