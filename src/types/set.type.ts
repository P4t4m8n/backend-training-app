import { SetType } from "@prisma/client";
import { TEntity } from "./app.type";

export type TSet = TEntity & {
  reps: number;
  weight: number;
  rest: number;
  setType: SetType;
};

export type TSetDto = TSet & {
  trainingId?: string;
  traineeSetsId?: string;
  trainerSetsId?: string;
};

export type TSetFilter = {
  reps?: number;
  weight?: number;
  rest?: number;
  setType?: SetType;
  trainingId?: string;
  traineeSetsId?: string;
  trainerSetsId?: string;
};
