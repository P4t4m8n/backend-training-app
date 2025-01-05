import { Request, Response } from "express";
import { trainingService } from "./training.service";
import { AppError } from "../../services/Error.service";

export async function getTrainings(req: Request, res: Response) {
  try {
    const filter = req.query;
    const trainings = await trainingService.get(filter);
    res.status(200).json(trainings);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(500).json({ message: err });
  }
}

export async function getTrainingById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const training = await trainingService.getById(id);
    res.status(200).json(training);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(500).json({ message: err });
  }
}

export async function saveTraining(req: Request, res: Response) {
  try {
    const training = req.body;
    const newTraining = await trainingService.create(training);
    res.status(201).json(newTraining);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(500).json({ message: err });
  }
}
