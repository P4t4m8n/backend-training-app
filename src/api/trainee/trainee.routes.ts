import { Router } from "express";
import { getTraineeById, getTrainees } from "./trainee.controller";

export const traineeRoutes = Router();

traineeRoutes.get("/", getTrainees);
traineeRoutes.get("/:id", getTraineeById);