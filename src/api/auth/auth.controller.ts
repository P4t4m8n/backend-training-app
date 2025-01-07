import { Prisma } from "@prisma/client";
import { CookieOptions, Request, Response } from "express";
import { TUser } from "../../types/user.type";
import { authService } from "./auth.service";
import { AppError } from "../../services/Error.service";
import path from "path";
import { validateUserRequiredFields } from "../user/user.validation";
import { sanitizeUserDto } from "../user/user.sanitization";
import { userService } from "../user/user.service";
import { tokenService } from "./token.service";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export async function signUp(req: Request, res: Response) {
  try {
    let data = req.body;

    const requiredError = validateUserRequiredFields(data);
    if (requiredError.length > 0) {
      throw AppError.create(requiredError.join(", "), 422);
    }

    const userData = sanitizeUserDto(data);
    const user = await userService.create(userData);
    if (!user || !user?.id) {
      throw AppError.create("User not created", 500);
    }

    const url = await authService.createMagicLink(user?.id);

    res.status(201).json({ url });
  } catch (error) {
    const err = AppError.create(`Error signing up: ${error}`, 500, true);
    res.status(err.statusCode).json(err);
  }
}
export async function signIn(req: Request, res: Response) {}

export async function registry(req: Request, res: Response) {
  try {
    const { token } = req.query;

    const userId = await tokenService.verify(token as string);
    if (!userId) {
      throw AppError.create("Invalid token", 400);
    }
    const uniqueId = await authService.createUniqueId(userId);
    console.log("uniqueId:", uniqueId);

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

const COOKIE: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 24 * 60 * 60, // 24 hours
};
