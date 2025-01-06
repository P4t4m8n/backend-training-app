import { Prisma, User } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { TUser } from "../../types/user.type";
import crypto, { createCipheriv, createDecipheriv } from "crypto";
import dotenv from "dotenv";

dotenv.config();
const createJWT = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
};

const handleReturnStruct = async (user: TUser) => {
  const token = await createJWT(user.id!);

  return { user, token };
};

const generateUniqueId = () => {
  return crypto.randomBytes(32).toString("hex");
};
console.log("process.env.ENCRYPTION_KEY:", process.env.ENCRYPTION_KEY)
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
const IV_LENGTH = 16;

export const encryptToken = (token: string) => {
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
export const authService = {};
