import { AuthStatus } from "@prisma/client";
import { TEntity } from "./app.type";

export type TToken = TEntity & {
  userId: string;
  status: AuthStatus;
  token: string;
};
export type TTokenFilter = {
    userId?: string;
    status?: AuthStatus;
};
