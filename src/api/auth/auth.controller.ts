import { CookieOptions, Request, Response } from "express";

import { authService } from "./auth.service";
import { AppError } from "../../services/Error.service";
import { tokenService } from "./token.service";
import { validateTraineeMetrics } from "../trainee/trainee.validation";
import { sanitizeTraineeMetricsDto } from "../trainee/trainee.sanitization";
import { trainerService } from "../trainer/trainer.service";
import { traineeService } from "../trainee/trainee.service";
import { validateUserDto } from "../user/user.validation";
import { sanitizeUserDto } from "../user/user.sanitization";

import { TTrainerDto } from "../trainer/trainer.type";
import { TTraineeCreateDto } from "../trainee/trainee.type";
import { TUserCreateDto } from "../../types/user.type";

export async function createTrainee(req: Request, res: Response) {
  try {
    let data: TTraineeCreateDto = req.body;

    const requiredError = validateUserDto(data.userDto);
    if (requiredError.length > 0) {
      throw AppError.create(requiredError.join(", "), 400);
    }
    const metricsErrors = validateTraineeMetrics(data?.metricsDto);
    if (metricsErrors.length > 0) {
      throw AppError.create(metricsErrors.join(", "), 400);
    }

    const userDto = sanitizeUserDto(data.userDto) as TUserCreateDto;
    const metricsDto = sanitizeTraineeMetricsDto(data?.metricsDto!);
    const trainerId = data.trainerId;
    const id = await traineeService.create({
      userDto,
      metricsDto,
      trainerId,
    });
    if (!id) {
      throw AppError.create("User not created", 500);
    }

    const url = await authService.createMagicLink(id);

    res.status(201).json({ url });
  } catch (error) {
    const err = AppError.create(`Error signing up: ${error}`, 500, true);
    res.status(err.statusCode).json(err);
  }
}

export async function createTrainer(req: Request, res: Response) {
  try {
    const data: TTrainerDto = req.body;

    const requiredError = validateUserDto(data?.userDto);
    if (requiredError.length > 0) {
      throw AppError.create(requiredError.join(", "), 400);
    }

    const userDto = sanitizeUserDto(data?.userDto);
    const userId = await trainerService.create({ userDto });

    const url = await authService.createMagicLink(userId);

    res.status(201).json({ url });
  } catch (error) {
    const err = AppError.create(`Error signing up: ${error}`, 500, true);
    res.status(err.statusCode).json(err);
  }
}

export async function registry(req: Request, res: Response) {
  try {
    const { token } = req.query;

    const userId = await tokenService.verify(token as string);
    if (!userId) {
      throw AppError.create("Invalid token", 400);
    }
    const uniqueId = await authService.createUniqueId(userId);

    res.status(201).json({ uniqueId });
  } catch (error) {
    const err = AppError.create(`Error signing out${error}`, 500, true);
    res.status(err.statusCode).json(err);
  }
}

export async function validateUserSession(req: Request, res: Response) {
  try {
    const uniquePhoneId = req.params.token;

    const user = await authService.validateUserSession(uniquePhoneId);
    res.status(200).json(user);
  } catch (error) {
    const err = AppError.create(
      `Error validating user session: ${error}`,
      500,
      true
    );
    res.status(err.statusCode).json(err);
  }
}

export async function reissueLink(req: Request, res: Response) {
  try {
    const { id: userId } = req.body;

    await tokenService.invalidateToken(userId);

    const url = await authService.createMagicLink(userId);
    res.status(201).json({ url });
  } catch (error) {
    const err = AppError.create(`Error reissuing link: ${error}`, 500, true);
    res.status(err.statusCode).json(err);
  }
}

const COOKIE: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 24 * 60 * 60, // 24 hours
};
