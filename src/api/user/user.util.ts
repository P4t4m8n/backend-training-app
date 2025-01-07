import { TUser } from "../../types/user.type";

function fromDataToUserDto(data: FormData): TUser {
  return {
    email: data.get("email") as string,
    firstName: data.get("firstName") as string,
    lastName: data.get("lastName") as string,
    phone: data.get("password") as string,
  };
}

export const userUtil = {
  fromDataToUserDto,
};
