import { Router } from "express";
import {
  createProgram,
  getPrograms,
  updateProgram,
} from "./program.controller";

export const programRoutes = Router();

programRoutes.get("/", getPrograms);
programRoutes.get("/:id", getPrograms);
programRoutes.post("/edit", createProgram);
programRoutes.put("/edit/:id", updateProgram);
