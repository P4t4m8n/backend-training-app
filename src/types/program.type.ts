import { DaysOfWeek } from "@prisma/client";
import { TEntity } from "./app.type";
import { TTraining } from "./training.type";

export type TProgram = TEntity & {
  days: DaysOfWeek[];
  startDate: Date;
  endDate: Date;
  trainings?: TTraining[];
  userId: string;
  name: string;
};
export type TProgramDto = TEntity & {
  days: DaysOfWeek[];
  startDate: Date;
  endDate: Date;
  userId: string;
  name: string;
};
export type TProgramFilter = {};
