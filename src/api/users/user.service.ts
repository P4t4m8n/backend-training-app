import { Prisma, User } from "@prisma/client";
import prisma from "../../../prisma/prisma";

async function createUser(userDto: Prisma.UserCreateInput): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: userDto,
    });
    //TODO add error handling

    return user;
  } catch (error) {
    //TODO add error handling

    throw error;
  }
}

async function updateUser(
  id: string,
  userDto: Partial<Prisma.UserUpdateInput>
): Promise<User> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userDto,
    });
    //TODO add error handling

    return user;
  } catch (error) {
    //TODO add error handling

    throw error;
  }
}

async function getUser(id: string, isSmall: boolean): Promise<User> {
  try {
    const user = await prisma.user.findUnique({
      relationLoadStrategy: "join",
      where: { id },
    });
    //TODO add error handling

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    //TODO add error handling

    throw error;
  }
}

export const userService = {
  createUser,
  updateUser,
  getUser,
};
