import { TEntity } from "./app.type";

export type TUser = TEntity & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  passwordHash?: string;
  googleId?: string;
  imgUrl?: string;
  isTrainer?: boolean;
};

