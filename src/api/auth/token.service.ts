import { Prisma, Token } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { TToken, TTokenFilter } from "../../types/token.type";
import { TUser } from "../../types/user.type";
import { AppError } from "../../services/Error.service";
import { jwtVerify } from "jose";

async function get(filter: TTokenFilter): Promise<Token[]> {
  return await prisma.token.findMany({
    where: filter,
    include: { user: true },
  });
}

async function getById(id: string): Promise<Token | null> {
  return await prisma.token.findUniqueOrThrow({
    where: { id },
    include: { user: true },
  });
}

async function save(token: TToken): Promise<Token> {
  return await prisma.token.upsert({
    where: { id: token?.id },
    update: token,
    create: token,
  });
}

async function create(tokenData: TToken): Promise<Token> {
  const { status, userId, token } = tokenData;
  return await prisma.token.create({
    data: {
      status,
      token,
      user: { connect: { id: userId! } },
    },
  });
}

async function update(token: TToken): Promise<Token> {
  return await prisma.token.update({
    where: { id: token.id },
    data: token,
  });
}

async function invalidateToken(userId: string) {
  return await prisma.token.updateMany({
    where: {
      userId,
      AND: {
        OR: [
          {
            status: "PENDING",
          },
          {
            status: "SENT",
          },
        ],
      },
    },
    data: { status: "CANCELLED" },
  });
}

async function verify(token: string): Promise<string> {
  const tokenData = await prisma.token.findUnique({
    where: { token },
  });

  if (!tokenData) {
    throw AppError.create("Token not found", 404);
  }

  // if (tokenData.status === "CONFIRMED") {
  //   throw AppError.create("Token already confirmed", 400);
  // }

  const decodedToken = await decodeToken(token);

  // if (decodedToken?.exp && decodedToken?.exp < Date.now()) {
  //   throw AppError.create("Token expired", 400);
  // }

  await update({ ...tokenData, status: "CONFIRMED" });

  return decodedToken?.userId as string;
}

const decodeToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  return payload;
};

export const tokenService = {
  get,
  getById,
  save,
  create,
  verify,
  update,
  invalidateToken,
};
