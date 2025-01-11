import { TEntity } from "./app.type";
import { TVideo } from "./video.type";

export type TTraining = TEntity & {
  videos: TVideo[];
  set: number;
  goalSet: number;
  sets: Sets[];
  programId?: string;
  name: string;
};

export type Sets = TEntity & {
  rest: number;
  reps: number;
  goalReps: number;
  weight: number;
  trainingId: string;
};
export type TTrainingFilter = {};
