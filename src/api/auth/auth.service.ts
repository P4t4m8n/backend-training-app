import { Prisma, User } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { TUser } from "../../types/user.type";

async function signIn(userDto: TUser): Promise<{ user: TUser; token: string }> {
  try {
    const user = (await prisma.user.findUnique({
      where: { email: userDto.email },
    })) as TUser;

    if (!user || !user?.email || !user?.id) {
      throw AppError.create("User not found", 404, true);
    }

    if (user.passwordHash && userDto.password) {
      const match = await bcrypt.compare(userDto.password, user.passwordHash);
      if (!match) {
        throw AppError.create("Invalid credentials", 401, true);
      }
    } else if (
      user?.googleId &&
      userDto?.googleId &&
      user.googleId !== userDto.googleId
    ) {
      throw AppError.create("Invalid credentials", 401, true);
    } else {
      throw AppError.create("Invalid credentials", 401, true);
    }

    return handleReturnStruct(user);
  } catch (error) {
    throw error;
  }
}

async function signUp(userDto: TUser): Promise<{ user: TUser; token: string }> {
  try {
    const saltRounds = 10;
    if (!userDto?.email) {
      throw AppError.create("Email is required", 400, true);
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (existingUser) {
      throw AppError.create("User already exists", 409, true);
    }

    let hash = null;
    let _googleId = null;
    if (userDto.password) {
      hash = await bcrypt.hash(userDto.password, saltRounds);
    } else if (userDto.googleId) {
      _googleId = userDto.googleId;
    }

    const userToSave: Prisma.UserCreateInput = {
      ...userDto,
      passwordHash: hash,
      googleId: _googleId,
      email: userDto.email,
    };
    const user = (await prisma.user.create({
      data: { ...userToSave },
    })) as TUser;

    return handleReturnStruct(user);
  } catch (error) {
    throw error;
  }
}

const createJWT = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
};

const handleReturnStruct = async (user: TUser) => {
  const token = await createJWT(user.id!);
  delete user?.passwordHash;
  delete user?.password;
  delete user?.googleId;

  return { user, token };
};
export const authService = {
  signIn,
  signUp,
};
