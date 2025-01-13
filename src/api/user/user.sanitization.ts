import sanitizeHtml from "sanitize-html";
import { TUserCreateDto, TUserUpdateDto } from "../../types/user.type";

export const sanitizeUserDto = (
  userDto: TUserCreateDto | TUserUpdateDto
): TUserCreateDto | TUserUpdateDto => {
  return {
    email: sanitizeHtml(userDto?.email!),
    firstName: sanitizeHtml(userDto?.firstName!),
    lastName: sanitizeHtml(userDto?.lastName!),
    phone: sanitizeHtml(userDto?.phone!),
  };
};
