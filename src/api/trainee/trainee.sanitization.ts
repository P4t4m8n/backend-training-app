import {
  TTraineeMetrics,
  TTraineeMetricsDto,
  TUser,
  TUserDto,
} from "../../types/user.type";
import sanitizeHtml from "sanitize-html";

export const sanitizeTraineeMetricsDto = (
  data: TTraineeMetricsDto
): TTraineeMetricsDto => {
  return {
    weight: +sanitizeHtml(data.weight?.toString() || ""),
    height: +sanitizeHtml(data.height?.toString() || ""),
    age: +sanitizeHtml(data.age?.toString() || ""),
    heartRate: +sanitizeHtml(data.heartRate?.toString() || ""),
    bloodPressureSystole: +sanitizeHtml(
      data.bloodPressureSystole?.toString() || ""
    ),
    bloodPressureDiastole: +sanitizeHtml(
      data.bloodPressureDiastole?.toString() || ""
    ),
  };
};
