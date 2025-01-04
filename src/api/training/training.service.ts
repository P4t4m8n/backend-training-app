import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TTraining, TTrainingFilter } from "../../types/training.type";

async function get(filter: TTrainingFilter): Promise<TTraining[]> {
  const trainings = prisma.training.findMany({
    where: filter,
    relationLoadStrategy: "join",
    include: {
      sets: true,
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
    },
  });

  if (!training || training === null) {
    throw AppError.create("Training not found", 404);
  }

  return training;
}

async function create(trainingDto: TTraining): Promise<TTraining> {
  const data: {
    videosURL: string[];
    userVideosURL: string[];
    exerciseId: string;
    set: number;
    goalSet: number;
    programId: string;
    sets?: {
      createMany: {
        data: Prisma.SetsCreateManyInput[];
      };
    };
  } = {
    videosURL: trainingDto.videosURL || [],
    userVideosURL: trainingDto.userVideosURL || [],
    exerciseId: trainingDto.exerciseId,
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
    },
  });

  return training;
}

async function save(training: TTraining): Promise<TTraining> {
  const data: {
    videosURL: string[];
    userVideosURL: string[];
    exerciseId: string;
    set: number;
    goalSet: number;
    programId: string;
    sets?: {
      createMany: {
        data: Prisma.SetsCreateManyInput[];
      };
    };
  } = {
    videosURL: training.videosURL || [],
    userVideosURL: training.userVideosURL || [],
    exerciseId: training.exerciseId,
    set: training.set,
    goalSet: training.goalSet,
    programId: training?.programId!,
  };

  if (training?.sets) {
    data.sets = {
      createMany: {
        data: training.sets,
      },
    };
  }

  const updatedTraining = await prisma.training.upsert({
    where: {
      id: training.id,
    },
    create: data,
    update: data,
    include: {
      sets: true,
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
