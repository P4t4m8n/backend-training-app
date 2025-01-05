import { Router } from "express";
import { getPrograms, saveProgram } from "./program.controller";

export const programRouter = Router();

programRouter.get("/", getPrograms);
programRouter.get("/:id", getPrograms);
programRouter.post("/edit", saveProgram);
programRouter.put("/edit/:id", saveProgram);
