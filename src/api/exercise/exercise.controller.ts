import { Request, Response } from "express";
import { AppError } from "../../services/Error.service";
import { exerciseService } from "./exercise.service";

export async function getExercises(req: Request, res: Response) {
  try {
    const filter = req.query;

    const exercises = await exerciseService.get(filter);

    res.status(200).json(exercises);
  } catch (error) {
    //TODO add error handling
    const err = AppError.create("Error getting exercises", 500);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function getExerciseById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const exercise = await exerciseService.getById(id);

    res.status(200).json(exercise);
  } catch (error) {
    //TODO add error handling
    const err = AppError.create("Error getting exercise", 500);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function createExercise(req: Request, res: Response) {
  try {
    const exerciseData = req.body;

    const exercise = await exerciseService.create(exerciseData);

    res.status(201).json(exercise);
  } catch (error) {
    //TODO add error handling
    const err = AppError.create("Error creating exercise", 500);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function updateExercise(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const exerciseData = req.body;

    const exercise = await exerciseService.update({ id, ...exerciseData });

    res.status(200).json(exercise);
  } catch (error) {
    //TODO add error handling
    const err = AppError.create("Error updating exercise", 500);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function removeExercise(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await exerciseService.remove(id);

    res.status(204).send();
  } catch (error) {
    //TODO add error handling
    const err = AppError.create("Error deleting exercise", 500);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}
