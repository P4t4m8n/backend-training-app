import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TTraining, TTrainingFilter } from "../../types/training.type";
import { TVideo } from "../../types/video.type";

async function get(filter: TTrainingFilter): Promise<TTraining[]> {
  const trainings = prisma.training.findMany({
    where: filter,
    relationLoadStrategy: "join",
    include: {
      sets: true,
      videos: true,
    },
  });

  return trainings;
}

async function getById(id: string): Promise<TTraining> {
  const training = await prisma.training.findUnique({
    where: {
      id,
    },
    include: {
      sets: true,
      videos: true,
    },
  });

  if (!training || training === null) {
    throw AppError.create("Training not found", 404);
  }

  return training;
}

async function create(trainingDto: TTraining): Promise<TTraining> {
  const data: {
    set: number;
    name: string;
    goalSet: number;
    programId: string;
    sets?: {
      createMany: {
        data: Prisma.SetsCreateManyInput[];
      };
    };
  } = {
    name: trainingDto.name,
    set: trainingDto.set,
    goalSet: trainingDto.goalSet,
    programId: trainingDto?.programId!,
  };

  if (trainingDto.sets) {
    data.sets = {
      createMany: {
        data: trainingDto.sets,
      },
    };
  }

  const training = await prisma.training.create({
    data,
    include: {
      sets: true,
      videos: true,
    },
  });

  return training;
}

async function save(trainingDto: TTraining): Promise<TTraining> {
  const data: {
    set: number;
    name: string;
    goalSet: number;
    programId: string;
    sets?: {
      createMany: {
        data: Prisma.SetsCreateManyInput[];
      };
    };
  } = {
    name: trainingDto.name,
    set: trainingDto.set,
    goalSet: trainingDto.goalSet,
    programId: trainingDto?.programId!,
  };

  if (trainingDto?.sets) {
    data.sets = {
      createMany: {
        data: trainingDto.sets,
      },
    };
  }

  const updatedTraining = await prisma.training.upsert({
    where: {
      id: trainingDto.id,
    },
    create: data,
    update: data,
    include: {
      sets: true,
      videos: true,
    },
  });

  return updatedTraining;
}

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
  save,
  remove,
};
