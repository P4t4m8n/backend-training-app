import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TTraining, TTrainingFilter } from "../../types/training.type";
import { TVideo } from "../../types/video.type";

async function get(filter: TTrainingFilter) {
  const { set, name, skip, take } = filter;
  return prisma.training.findMany({
    where: filter,
    include: {
      defaultSets: true,
    },
    skip,
    take,
  });
}

async function getById(id: string): Promise<TTraining> {
  const training = await prisma.training.findUnique({
    where: {
      id,
    },
    include: {
      defaultSets: true,
    },
  });

  if (!training || training === null) {
    throw AppError.create("Training not found", 404);
  }

  return training;
}

async function create(trainingDto: TTraining): Promise<string> {
  const { id } = await prisma.training.create({
    data: {
      name: trainingDto.name,
      defaultSets: {
        createMany: {
          data: trainingDto.defaultSets,
        },
      },
    },
  });

  return id;
}

async function update(trainingDto: TTraining) {}

async function remove(id: string): Promise<void> {
  await prisma.training.delete({
    where: {
      id,
    },
  });
}

export const trainingService = {
  get,
  getById,
  create,
  update,
  remove,
};
