import { Router } from "express";
import { uploadVideo } from "./video.controller";

export const videoRoutes = Router();

videoRoutes.post("/", uploadVideo);
