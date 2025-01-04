import { TEntity } from "./app.type";

export type TUser = TEntity & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  imgUrl?: string | null;
  isTrainer?: boolean;
};

export type TUserFull = TUser & {
  programs: unknown[]; //TODO: add program type
  trainer: unknown; //TODO: add trainer type
};

export type TUserFilter = {
  email?: string;
  phone?: string;
  isTrainer?: boolean;
};
