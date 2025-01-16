import express from "express";
import { createTraining, getTrainingById, getTrainings } from "./training.controller";
import { getTraineeById } from "../trainee/trainee.controller";

export const trainingRoutes = express.Router();

trainingRoutes.get("/", getTrainings);
trainingRoutes.get("/:id", getTrainingById);
trainingRoutes.post("/edit", createTraining);
// trainingRoutes.put("/edit/:id", saveTraining);
