import express from "express";
import {
  getUserById,
  getUsers,
  updateUser,
} from "./user.controller";

export const userRoutes = express.Router();
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/edit/:id", updateUser);
