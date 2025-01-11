import { Prisma, User } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { TUser, TUserFilter } from "../../types/user.type";
import { AppError } from "../../services/Error.service";

const USER_SMALL_SELECT = {
  select: {
    id: true,
    firstName: true,
    lastName: true,
    phone: true,
    imgUrl: true,
    isTrainer: true,
    email: true,
    uniquePhoneId: true,
  },
};

const USER_FULL_SELECT = {
  select: {
    ...USER_SMALL_SELECT.select,
    programs: {
      include: {
        training: {
          include: {
            sets: true,
            videos: true,
          },
        },
      },
    },
  },
};

async function create(userDto: Prisma.UserCreateInput): Promise<TUser> {
  try {
    const user = await prisma.user.create({
      data: userDto,
    });

    if (!user) {
      throw AppError.create("Error creating user in DB", 500);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

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
  const select = isSmall ? USER_SMALL_SELECT : USER_FULL_SELECT;
  try {
    const user = await prisma.user.findUnique({
      relationLoadStrategy: "join",
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        imgUrl: true,
        isTrainer: true,
        email: true,
        uniquePhoneId: true,
        programs: {
          include: {
            trainings: {
              include: {
                sets: true,
                videos: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw AppError.create("User not found", 404);
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function get(filter: TUserFilter): Promise<TUser[]> {
  const select = filter.isSmall ? USER_SMALL_SELECT : USER_FULL_SELECT;
  delete filter.isSmall;
  try {
    const users = await prisma.user.findMany({
      where: filter,
      ...select,
    });
    return users;
  } catch (error) {
    throw error;
  }
}

export const userService = {
  create,
  update,
  get,
  getById,
};
