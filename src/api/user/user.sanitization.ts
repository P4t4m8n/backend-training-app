import { TUser, TUserDto } from "../../types/user.type";
import sanitizeHtml from "sanitize-html";

export const sanitizeUserDto = (data: TUser): TUserDto => {
  return {
    email: sanitizeHtml(data?.email!),
    firstName: sanitizeHtml(data?.firstName!),
    lastName: sanitizeHtml(data?.lastName!),
    phone: sanitizeHtml(data?.phone!),
  };
};
