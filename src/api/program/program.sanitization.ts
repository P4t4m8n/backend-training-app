import sanitizeHtml from "sanitize-html";
import { TProgramDto } from "./program.type";
import { DaysOfWeek } from "@prisma/client";

export const sanitizeProgramCreateDto = (userDto: TProgramDto): TProgramDto => {
  return {
    name: sanitizeHtml(userDto?.name!),
    startDate: userDto?.startDate,
    endDate: userDto?.endDate,
    days: userDto?.days?.map((day) => sanitizeHtml(day).toUpperCase() as DaysOfWeek),
    isActive: userDto?.isActive,
    trainerId: sanitizeHtml(userDto?.trainerId!),
    traineeId: sanitizeHtml(userDto?.traineeId!),
  };
};
