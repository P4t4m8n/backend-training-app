import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "./user.controller";

export const userRoutes = express.Router();
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.post("/edit", createUser);
userRoutes.put("/edit/:id", updateUser);
