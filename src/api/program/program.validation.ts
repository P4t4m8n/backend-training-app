import { DaysOfWeek } from "@prisma/client";
import { validationService } from "../../services/validation.service";
import { TProgramDto } from "./program.type";

export const validateProgramCreateDto = (programDto: TProgramDto) => {
  const errors: string[] = [];

  const nameErr = validationService.validateExistence("Name", programDto.name);
  if (nameErr) errors.push(nameErr);

  //TODO redo date validation

  // const startDateErr = validationService.validateDate(
  //   "Start Date",
  //   programDto?.startDate
  // );

  // if (startDateErr) errors.push(startDateErr);

  // const endDateErr = validationService.validateDate(
  //   "End Date",
  //   programDto?.endDate
  // );
  // if (endDateErr) errors.push(endDateErr);

  const daysErr = _ValidateDaysOfWeek(programDto?.days);
  if (daysErr) errors.push(daysErr);

  const trainerIdErr = validationService.validateExistence(
    "Trainer Id",
    programDto.trainerId
  );

  if (trainerIdErr) errors.push(trainerIdErr);
  const traineeIdErr = validationService.validateExistence(
    "Trainee Id",
    programDto.traineeId
  );

  if (traineeIdErr) errors.push(traineeIdErr);

  return errors;
};

const _ValidateDaysOfWeek = (
  days?: Array<string | undefined | null | DaysOfWeek>
): string | null => {
  if (!days) {
    return "Days are required.";
  }
  days.forEach((day) => {
    if (!Object.values(DaysOfWeek).includes(day as DaysOfWeek)) {
      return `${day} Is not valid, Please provide a valid day of the week.`;
    }
  });

  return null;
};
