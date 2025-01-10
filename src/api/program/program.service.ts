import { Prisma } from "@prisma/client";
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
        },
      },
    },
  });

  if (!program || program === null) {
    throw AppError.create("Program not found", 404);
  }

  return program;
}

async function create(data: TProgramDto): Promise<TProgram> {
  const program = await prisma.program.create({
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

export const programService = {
  get,
  getById,
  create,
  update,
  remove,
};
