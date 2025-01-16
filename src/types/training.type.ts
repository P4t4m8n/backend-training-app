import { TEntity } from "./app.type";
import { TSet } from "./set.type";
import { TVideo } from "./video.type";

export type TTraining = TEntity & {
  name: string;
  defaultSets: TSet[];
};

export type TTrainingFilter = {
  set?: number;
  name?: string;
  skip?: number;
  take?: number;
};

export type TTrainingToTrainee = TEntity & {
  traineeSet?: number;
  traineeSets?: TSet[];
  trainerSet?: number;
  trainerSets?: TSet[];
  training?: Omit<TTraining, "defaultSets" | "set">;
  instructionVideos?: TVideo[];
  feedbackVideos?: TVideo[];
};

export type TTrainingToTraineeDto = TEntity &
  Omit<TTrainingToTrainee, "training"> & {
    trainingId: string;
    programId?: string;
    traineeId: string;
  };
