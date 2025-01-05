import express from "express";
import { getTrainings, saveTraining } from "./training.controller";

export const trainingRoutes = express.Router();

trainingRoutes.get("/", getTrainings);
trainingRoutes.get("/:id", getTrainings);
trainingRoutes.post("/edit", saveTraining);
trainingRoutes.put("/edit/:id", saveTraining);
