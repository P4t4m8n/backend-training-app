import { DaysOfWeek, Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TProgram, TProgramDto, TProgramFilter } from "./program.type";

async function get(filter: TProgramFilter): Promise<TProgram[]> {
  const programs = prisma.program.findMany({
    where: filter,
    relationLoadStrategy: "join",
  });
  return programs;
}

async function getById(id: string): Promise<TProgram> {
  const program = await prisma.program.findUnique({
    where: {
      id,
    },
    include: {
      trainings: true,
      trainer: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      trainee: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!program || program === null) {
    throw AppError.create("Program not found", 404);
  }

  return program;
}

async function create(data: Omit<TProgramDto, "trainings">): Promise<string> {
  const startDate = new Date(data.startDate!);
  const endDate = new Date(data?.endDate!);
  const { id } = await prisma.program.create({
    data: {
      name: data.name,
      startDate,
      endDate,
      days: data.days,
      isActive: false,
      traineeId: data.traineeId,
      trainerId: data.trainerId,
    },
    select: {
      id: true,
    },
  });
  return id;
}

async function update(data: TProgramDto) {
  const program = await prisma.program.update({
    where: {
      id: data.id,
    },
    data,
    include: {
      trainings: {},
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

export const programService = {
  get,
  getById,
  create,
  update,
  remove,
};
