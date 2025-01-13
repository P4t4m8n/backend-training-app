import { Request, Response } from "express";
import { traineeService } from "./trainee.service";
import { AppError } from "../../services/Error.service";

export async function getTrainees(req: Request, res: Response) {
  try {
    const filter = req.query;
    const trainees = await traineeService.list(filter);
    res.status(200).json(trainees);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(500).json({ message: err });
  }
}

export async function getTraineeById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const trainee = await traineeService.get(id);
    res.status(200).json(trainee);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(500).json({ message: err });
  }
}
