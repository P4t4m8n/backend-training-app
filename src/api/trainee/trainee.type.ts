import { TEntity } from "../../types/app.type";
import { TProgram } from "../../types/program.type";
import { TTrainingToTrainee } from "../../types/training.type";
import { TUser, TUserCreateDto } from "../../types/user.type";
import { TTrainer } from "../trainer/trainer.type";

export type TTrainee = TEntity & {
  programs?: TProgram[];
  trainings?: TTrainingToTrainee[];
  trainer?: Omit<TTrainer, "trainee" | "programs">;
  metrics?: TTraineeMetrics[];
  user: TUser;
};

export type TTraineeDto = TEntity & {
  userId: string;
  trainerId?: string;
};

export type TTraineeCreateDto = {
  userDto: TUserCreateDto;
  trainerId: string;
  metricsDto?: TTraineeMetricsDto;
};

export type TTraineeFilter = {
  firstName?: string;
  lastName?: string;
  email?: string;
  skip?: number;
  take?: number;
};

export type TTraineeMetrics = TEntity & {
  heartRate?: number | null;
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  bloodPressureSystole?: number | null;
  bloodPressureDiastole?: number | null;
  date?: Date;
};

export type TTraineeMetricsDto = Omit<TTraineeMetrics, "date"> & {
  traineeId?: string;
};
