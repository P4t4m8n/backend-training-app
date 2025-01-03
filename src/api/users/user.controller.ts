import { Request, Response } from "express";
import { userService } from "./user.service";

export async function createUser(req: Request, res: Response) {
  try {
    //TODO add sanitization, validation, user duplication check
    const userData = req.body;

    const user = await userService.createUser(userData);
    //TODO add error handling
    return res.status(201).json(user);
  } catch (error) {
    //TODO add error handling

    res.status(500).send({ message: "failed to create user", error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    //TODO add sanitization, validation
    const { id } = req.params;
    const userData = req.body;

    const user = await userService.updateUser(id, userData);
    //TODO add error handling

    return res.status(200).json(user);
  } catch (error) {
    //TODO add error handling

    res.status(500).send({ message: "failed to update user", error });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id, false);
    //TODO add error handling

    return res.status(200).json(user);
  } catch (error) {
    //TODO add error handling

    res.status(500).send({ message: "failed to get user", error });
  }
}
