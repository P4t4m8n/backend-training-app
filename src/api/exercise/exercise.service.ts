import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TExercise, TExerciseFilter } from "../../types/exercise.type";

async function get(filter: TExerciseFilter): Promise<TExercise[]> {
  const exercises = await prisma.exercise.findMany({
    where: filter,
  });

  return exercises;
}

async function getById(id: string): Promise<TExercise> {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });

  if (!exercise) {
    throw AppError.create("Exercise not found", 404);
  }

  return exercise;
}

async function create(
  exerciseDto: Prisma.ExerciseCreateInput
): Promise<TExercise> {
  const exercise = await prisma.exercise.create({
    data: exerciseDto,
  });

  return exercise;
}

async function update(
  exerciseDto: Partial<Prisma.ExerciseCreateInput>
): Promise<TExercise> {
  const exercise = await prisma.exercise.update({
    where: { id: exerciseDto.id },
    data: exerciseDto,
  });

  return exercise;
}

async function remove(id: string): Promise<void> {
  await prisma.exercise.delete({
    where: { id },
  });
}

export const exerciseService = {
  get,
  getById,
  create,
  update,
  remove,
};
