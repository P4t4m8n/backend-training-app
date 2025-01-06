import { Request, Response } from "express";
import { videoService } from "./video.service";
import { AppError } from "../../services/Error.service";

export async function uploadVideo(req: Request, res: Response) {
  try {
    const uri = req.body;
    console.log("uri:", uri);

    const video = await videoService.create(uri);
    res.status(201).json(video);
  } catch (error) {
    const err = AppError.create(error as string, 500);
    res.status(err.statusCode).json(err);
  }
}
