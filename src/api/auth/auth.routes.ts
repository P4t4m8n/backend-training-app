import express from "express";
import {
  registry,
  reissueLink,
  signUp,
  validateUserSession,
} from "./auth.controller";

export const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.get("/registry", registry);
authRoutes.get("/validate/:token", validateUserSession);
authRoutes.post("/reissueLink", reissueLink);
