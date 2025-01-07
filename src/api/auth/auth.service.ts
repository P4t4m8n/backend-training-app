import { Prisma, User } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { TUser } from "../../types/user.type";
import crypto, { createCipheriv, createDecipheriv } from "crypto";
import dotenv from "dotenv";
import { tokenService } from "./token.service";
import { userService } from "../user/user.service";

dotenv.config();

async function validateUserSession(token: string) {
  try {
    const [user] = await userService.get({ uniquePhoneId: token });
    const decodedToken = decryptToken(token);
    const decryptUserToken = decryptToken(user.uniquePhoneId!);
    if (decodedToken !== decryptUserToken) {
      throw new AppError("Invalid token", 401);
    }
    return user;
  } catch (error) {
    console.error(`Error validating token: ${error}`);
    return null;
  }
}
async function createJWT(
  userId: string,
  alg: string = "HS256",
  expiration: string = "24h"
) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setExpirationTime(expiration)
    .sign(secret);
}

async function createMagicLink(userId: string) {
  const token = await createJWT(userId, "HS256", "1h");
  await tokenService.create({ token, status: "SENT", userId });
  const url = `${process.env.FRONTEND_URL}/registry?token=${token}`;
  return url;
}

const generateUniqueId = () => {
  return crypto.randomBytes(32).toString("hex");
};
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
const IV_LENGTH = 16;

async function createUniqueId(userId: string) {
  const uniqueId = generateUniqueId();
  const uniquePhoneId = encryptToken(uniqueId);
  await userService.update(userId, { uniquePhoneId });
  return uniquePhoneId;
}

const encryptToken = (token: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

const decryptToken = (encryptedToken: string) => {
  const [iv, encrypted] = encryptedToken.split(":");
  const decipher = createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_KEY,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
export const authService = {
  createMagicLink,
  createUniqueId,
  validateUserSession,
};
