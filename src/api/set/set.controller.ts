import { Request, Response } from "express";
import { setService } from "./set.service";
import { AppError } from "../../services/Error.service";
export async function getSets(req: Request, res: Response) {
  try {
    const filter = req.query;
    const sets = await setService.get(filter);
    res.json(sets);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}

export async function getSetById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const set = await setService.getById(id);
    res.json(set);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}

export async function saveSet(req: Request, res: Response) {
  try {
    const setDto = req.body;
    const set = await setService.save(setDto);
    res.json(set);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}

export async function removeSet(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await setService.remove(id);
    res.json({ message: "Set removed" });
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}
