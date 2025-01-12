import { Request, Response } from "express";
import { programService } from "./program.service";
import { AppError } from "../../services/Error.service";

export async function getPrograms(req: Request, res: Response) {
  try {
    const filter = req.query;
    const programs = await programService.get(filter);
    res.json(programs);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}

export async function getProgramById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const program = await programService.getById(id);
    res.json(program);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}

export async function createProgram(req: Request, res: Response) {
  try {
    const programDto = req.body;
    console.dir(programDto, { depth: null });
    const program = await programService.create(programDto);
    res.json(programDto);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}
export async function updateProgram(req: Request, res: Response) {
  try {
    const programDto = req.body;
    const program = await programService.update(programDto);
    res.json(program);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}

export async function removeProgram(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await programService.remove(id);
    res.json({ message: "Program removed" });
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}
