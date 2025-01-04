import { TEntity } from "./app.type";

export type TTraining = TEntity & {
  videosURL: string[];
  userVideosURL: string[];
  exerciseId: string;
  set: number;
  goalSet: number;
  sets: Sets[];
  programId?: string;
};

export type Sets = TEntity & {
  reps: number;
  goalReps: number;
  weight: number;
  trainingId: string;
};
export type TTrainingFilter = {};
