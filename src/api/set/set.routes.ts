import { Router } from "express";
import { getSets, saveSet } from "./set.controller";

export const setsRoutes = Router();

setsRoutes.get("/", getSets);
setsRoutes.get("/:id", getSets);
setsRoutes.post("/edit", saveSet);
setsRoutes.put("/edit/:id", saveSet);
