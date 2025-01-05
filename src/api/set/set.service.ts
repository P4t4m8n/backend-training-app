import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TSet, TSetFilter } from "../../types/set.type";

async function get(filter: TSetFilter): Promise<TSet[]> {
  const sets = await prisma.sets.findMany({
    relationLoadStrategy: "join",
    where: filter,
  });

  return sets;
}

async function getById(id: string): Promise<TSet> {
  const set = await prisma.sets.findUnique({
    where: {
      id,
    },
  });

  if (!set) {
    throw AppError.create("Set not found", 404);
  }

  return set;
}

async function save(setDto: TSet): Promise<TSet> {
  const set = await prisma.sets.upsert({
    where: { id: setDto.id! },
    update: setDto,
    create: setDto as Prisma.SetsCreateInput,
  });

  return set;
}

async function remove(id: string): Promise<void> {
  await prisma.sets.delete({
    where: {
      id,
    },
  });
}

export const setService = {
    get,
    getById,
    save,
    remove,
};
