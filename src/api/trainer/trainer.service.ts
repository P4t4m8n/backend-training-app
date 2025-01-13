import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TUserCreateDto } from "../../types/user.type";
import { TTrainer, TTrainerDto } from "./trainer.type";

async function create(trainerDto: TTrainerDto): Promise<string> {
  const { userDto } = trainerDto;

  const { id } = await prisma.user.create({
    data: {
      ...(userDto as TUserCreateDto),
      trainer: {
        create: {},
      },
    },
    select: {
      id: true,
    },
  });

  if (!id) {
    throw AppError.create("Error creating user in DB", 500);
  }

  return id;
}

export const trainerService = {
  create,
};
