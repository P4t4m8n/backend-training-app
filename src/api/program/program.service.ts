import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TProgram, TProgramFilter } from "../../types/program.type";

async function get(filter: TProgramFilter): Promise<TProgram[]> {
  const programs = prisma.program.findMany({
    where: filter,
    relationLoadStrategy: "join",
    include: {
      trainings: true,
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
      trainings: true,
    },
  });

  if (!program || program === null) {
    throw AppError.create("Program not found", 404);
  }

  return program;
}

async function save(programDto: TProgram): Promise<TProgram> {
  const program = prisma.program.upsert({
    where: { id: programDto.id! },
    update: programDto,
    create: programDto as Prisma.ProgramCreateInput,
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
  save,
  remove,
};
