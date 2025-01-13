import { Trainee } from "@prisma/client";
import { TEntity } from "../../types/app.type";
import { TProgram } from "../../types/program.type";
import { TUser, TUserCreateDto, TUserUpdateDto } from "../../types/user.type";

export type TTrainer = TEntity & {
  trainees?: Trainee[];
  programs?: TProgram[];
  user: TUser;
};
export type TTrainerDto = TEntity & {
  userDto: TUserUpdateDto | TUserCreateDto;
};
