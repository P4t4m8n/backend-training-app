import { TEntity } from "./app.type";


export type TUser = TEntity & {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string | null;
  uniquePhoneId?: string | null;
};

export type TUserUpdateDto = TEntity & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
};
export type TUserCreateDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

export type TUserFilter = {
  email?: string;
  phone?: string;
  uniquePhoneId?: string;
};


