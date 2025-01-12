import express from "express";
import {
  createTrainee,
  createTrainer,
  registry,
  reissueLink,
  validateUserSession,
} from "./auth.controller";

export const authRoutes = express.Router();

authRoutes.post("/create/trainer", createTrainer);
authRoutes.post("/create/trainee", createTrainee);
authRoutes.get("/registry", registry);
authRoutes.get("/validate/:token", validateUserSession);
authRoutes.post("/reissueLink", reissueLink);
