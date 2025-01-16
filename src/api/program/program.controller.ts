import { Request, Response } from "express";
import { programService } from "./program.service";
import { AppError } from "../../services/Error.service";
import { validateProgramCreateDto } from "./program.validation";
import { sanitizeProgramCreateDto } from "./program.sanitization";

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
    const data = req.body;

    const errors = validateProgramCreateDto(data);
    if (errors.length > 0) {
      throw AppError.create(errors.join(", "), 400);
    }
    data.startDate = new Date(data.startDate!);
    data.endDate = new Date(data?.endDate!);

    const programDto = sanitizeProgramCreateDto(data);
    console.dir(programDto, { depth: null });
    const id = await programService.create(programDto);
    res.status(201).json(id);
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
