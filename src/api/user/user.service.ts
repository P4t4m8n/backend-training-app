import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { TUser, TUserFilter } from "../../types/user.type";
import { AppError } from "../../services/Error.service";
const USER_SELECT = {
  select: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  },
};
async function update(
  id: string,
  userDto: Prisma.UserUpdateInput
): Promise<TUser> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userDto,
    });
    if (!user) {
      throw AppError.create("Error updating user in DB", 500);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getById(id: string, isSmall: boolean): Promise<TUser> {
  try {
    const userData = await prisma.user.findUnique({
      relationLoadStrategy: "join",
      where: { id },
      ...USER_SELECT,
    });

    if (!userData) {
      throw AppError.create("User not found", 404);
    }

    return userData;
  } catch (error) {
    throw error;
  }
}

async function get(filter: TUserFilter, isSmall: boolean): Promise<TUser[]> {
  try {
    const users = await prisma.user.findMany({
      where: filter,
      ...USER_SELECT,
    });
    return users;
  } catch (error) {
    throw error;
  }
}

export const userService = {
  update,
  get,
  getById,
};
