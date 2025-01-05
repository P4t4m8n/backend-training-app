import { Router } from "express";
import { getSets, saveSet } from "./set.controller";

export const setRoutes = Router();

setRoutes.get("/", getSets);
setRoutes.get("/:id", getSets);
setRoutes.post("/edit", saveSet);
setRoutes.put("/edit/:id", saveSet);
