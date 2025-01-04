import { Router } from "express";
import {
  createExercise,
  getExerciseById,
  getExercises,
  removeExercise,
  updateExercise,
} from "./exercise.controller";

export const exerciseRoutes = Router();

exerciseRoutes.get("/", getExercises);
exerciseRoutes.get("/:id", getExerciseById);
exerciseRoutes.post("edit", createExercise);
exerciseRoutes.put("/edit/:id", updateExercise);
exerciseRoutes.delete("/delete/:id", removeExercise);
