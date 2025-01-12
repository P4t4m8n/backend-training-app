import { Request, Response } from "express";

import { userService } from "./user.service";
import { AppError } from "../../services/Error.service";
import { TUser, TUserFilter } from "../../types/user.type";
import { userUtil } from "./user.util";
import { sanitizeUserDto } from "./user.sanitization";
import { validateUserDto } from "./user.validation";

export async function createUser(req: Request, res: Response) {
  try {
    let data = req.body;

    const requiredError = validateUserDto(data);
    if (requiredError.length > 0) {
      throw AppError.create(requiredError.join(", "), 422);
    }

    const userData = sanitizeUserDto(data);
    const user = await userService.create(userData);
    // TODO add error handling
    res.status(201);
  } catch (error) {
    //TODO add error handling
    const err = AppError.create(error as string);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    //TODO add sanitization, validation
    const { id } = req.params;
    const userData = req.body;

    const user = await userService.update(id, userData);
    //TODO add error handling

    res.status(200).json(user);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userService.getById(id, false);
    //TODO add error handling

    res.status(200).json(user);
  } catch (error) {
    //TODO add error handling
    const err = AppError.create(error as string);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const query = req.query;
    const users = await userService.get(
      {
        ...(query as unknown as TUserFilter),
      },
      false
    );

    res.status(200).json(users);
  } catch (error) {
    const err = AppError.create(error as string);
    res.status(err.statusCode).send({ message: err.message, err });
  }
}
