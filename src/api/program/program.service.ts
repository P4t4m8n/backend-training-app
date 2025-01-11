import { DaysOfWeek, Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import {
  TProgram,
  TProgramDto,
  TProgramFilter,
} from "../../types/program.type";

async function get(filter: TProgramFilter): Promise<TProgram[]> {
  const programs = prisma.program.findMany({
    where: filter,
    relationLoadStrategy: "join",
    include: {
      trainings: {
        include: {
          sets: true,
          videos: true,
        },
      },
    },
  });
  return programs;
}

async function getById(id: string): Promise<TProgram> {
  const program = await prisma.program.findUnique({
    where: {
      id,
    },
    include: {
      trainings: {
        include: {
          sets: true,
          videos: true,
        },
      },
    },
  });

  if (!program || program === null) {
    throw AppError.create("Program not found", 404);
  }

  return program;
}

async function create(data: TProgram): Promise<TProgram> {
  const { programDto, trainings } = processProgramDto(data);
  const program = await prisma.program.create({
    data: {
      ...programDto,
      trainings: {
        create: trainings.map((training) => ({
          ...training,
          set: +training.set,
          goalSet: +training.goalSet,
          sets: { create: training.sets },
          videos: { create: training.videos },
        })),
      },
    },
    include: {
      trainings: {
        include: {
          sets: true,
          videos: true,
        },
      },
    },
  });
  return program;
}

async function update(data: TProgramDto) {
  const program = await prisma.program.update({
    where: {
      id: data.id,
    },
    data,
    include: {
      trainings: {
        include: {
          sets: true,
        },
      },
    },
  });
  return program;
}

async function remove(id: string): Promise<void> {
  await prisma.program.delete({
    where: {
      id,
    },
  });
}

function processProgramDto(data: TProgram) {
  const programDto: TProgramDto = {
    name: data.name,
    days: data.days.map((day) => day.toUpperCase() as DaysOfWeek),
    startDate: data.startDate,
    endDate: data.endDate,
    userId: data.userId,
  };

  const trainings = data.trainings || [];
  return { programDto, trainings };
}

export const programService = {
  get,
  getById,
  create,
  update,
  remove,
};
