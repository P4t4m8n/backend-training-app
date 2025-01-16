import { Router } from "express";
import {
  createProgram,
  getProgramById,
  getPrograms,
  updateProgram,
} from "./program.controller";

export const programRoutes = Router();

programRoutes.get("/", getPrograms);
programRoutes.get("/:id", getProgramById);
programRoutes.post("/edit", createProgram);
programRoutes.put("/edit/:id", updateProgram);
